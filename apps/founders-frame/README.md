# Founders Frame

The Founders Frame website: a curated networking and business community for Pune's founders, investors, business leaders and builders. It is a static React Router SPA (`ssr: false`; the home, events and about pages and every published Founders Frame event are prerendered) on the same Supabase backend and admin panel as Echoverse.

```bash
cp .env.example .env                        # Supabase URL, publishable key, site URL
yarn dev:founders-frame                     # from the repo root → http://localhost:7302
yarn workspace founders-frame build         # needs Supabase: event pages are listed from it
```

- **Community:** every query filters on `COMMUNITY_SLUG` (`app/data/brand.ts`).
- **Registration:** free RSVPs go through `create-order`; application-based places go through `submit-application`, then `/applications/:token` lets an approved applicant confirm (`confirm-application`) and get a QR ticket at `/tickets/:token`. Paid checkout is not built here yet.
- **Brand:** tokens in `app/global.css` (white, navy and gold; light only), Manrope and Inter, the gold emblem and navy wordmark in `components/ui/brand-emblem.tsx` and `components/ui/logo.tsx` (`BRAND_LOGO` in `app/data/brand.ts`). Brief: `docs/communities/founders-frame.md`.

Rules: `docs/rulebooks/frontend.md`.
