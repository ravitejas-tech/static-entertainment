import { FunctionsFetchError, FunctionsHttpError } from '@supabase/supabase-js'
import type { z } from 'zod'
import { functionErrorSchema } from '~/schemas/functions'
import { supabase } from '~/services/supabase'

async function functionErrorCode(error: unknown) {
    if (error instanceof FunctionsFetchError) return 'network'
    if (!(error instanceof FunctionsHttpError)) return 'unknown'
    const body = functionErrorSchema.safeParse(await error.context.json().catch(() => null))
    return body.success ? body.data.error.code : 'unknown'
}

export async function invokeFunction<T extends z.ZodType>(name: string, body: object, schema: T): Promise<z.output<T>> {
    const { data, error } = await supabase.functions.invoke(name, { body })
    if (error) throw new Error(await functionErrorCode(error))
    return schema.parse(data)
}
