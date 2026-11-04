# Founders Frame

The Founders Frame website: a curated networking and business community for Pune's founders, investors, business leaders and builders. It is a static React Router SPA (`ssr: false`; the home, events and about pages and every published Founders Frame event are prerendered) on the same Supabase backend and admin panel as Echoverse.

```bash
cp .env.example .env                        # Supabase URL, publishable key, site URL
yarn dev:founders-frame                     # from the repo root → http://localhost:7302
yarn workspace founders-frame build         # needs Supabase: event pages are listed from it
```

- **Community:** every query filters on `COMMUNITY_SLUG` (`app/data/brand.ts`).
- **Booking:** every event is paid. `/events/:slug/book` picks tickets, takes the buyer's details and member profile, applies promo codes and pays through `create-order` and `verify-payment` (Razorpay, or the in-page test checkout when `PAYMENT_PROVIDER=test`). The QR tickets are at `/tickets/:token`.
- **Brand:** tokens in `app/global.css` (white, navy and gold; light only), Manrope and Inter, the gold emblem and navy wordmark in `components/ui/brand-emblem.tsx` and `components/ui/logo.tsx` (`BRAND_LOGO` in `app/data/brand.ts`). Brief: `docs/communities/founders-frame.md`.

Rules: `docs/rulebooks/frontend.md`.
