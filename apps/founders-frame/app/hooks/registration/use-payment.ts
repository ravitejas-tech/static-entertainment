import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ticketPath } from '~/data/navigation'
import { useCreateOrder, useRazorpayCheckout, useVerifyPayment } from '~/hooks/registration/mutations'
import type { CreateOrderResult, OrderRequest, PendingOrder, VerifyPaymentInput } from '~/types/registration'

const isHoldActive = ({ holdExpiresAt }: PendingOrder) =>
    holdExpiresAt === null || Date.parse(holdExpiresAt) > Date.now()

export function usePayment(eventTitle: string) {
    const navigate = useNavigate()
    const [testOpen, setTestOpen] = useState(false)
    const createOrder = useCreateOrder()
    const razorpay = useRazorpayCheckout()
    const verify = useVerifyPayment()

    const confirm = (input: VerifyPaymentInput) =>
        verify.mutate(input, { onSuccess: ({ accessToken }) => navigate(ticketPath(accessToken)) })

    const startPayment = ({ order, payment }: CreateOrderResult, { buyer }: OrderRequest) => {
        if (payment.provider === 'free') return navigate(ticketPath(order.accessToken))
        if (payment.provider === 'test') return setTestOpen(true)
        razorpay.mutate(
            {
                payment,
                description: eventTitle,
                prefill: { name: buyer.name, email: buyer.email, contact: buyer.phone },
            },
            {
                onSuccess: (response) =>
                    response &&
                    confirm({
                        orderId: order.id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                    }),
            },
        )
    }

    const pay = (request: OrderRequest, onOrderError: (error: Error) => void) => {
        razorpay.reset()
        verify.reset()
        const current = createOrder.data
        if (
            current &&
            isHoldActive(current.order) &&
            JSON.stringify(createOrder.variables) === JSON.stringify(request)
        ) {
            return startPayment(current, request)
        }
        createOrder.mutate(request, { onSuccess: (result) => startPayment(result, request), onError: onOrderError })
    }

    const order = createOrder.data?.order ?? null

    return {
        pay,
        order,
        release: createOrder.reset,
        busy: createOrder.isPending || razorpay.isPending || verify.isPending || verify.isSuccess,
        testPayment: {
            open: testOpen,
            paying: verify.isPending || verify.isSuccess,
            close: () => setTestOpen(false),
            confirm: () => order && confirm({ orderId: order.id }),
        },
    }
}
