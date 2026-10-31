# Static Entertainment

The websites, ticketing platform and admin panel for Static Entertainment's communities. Each community has its own website, and all of them share one admin panel and one Supabase backend.

| App | Folder | Local address |
|---|---|---|
| Echoverse Hub website: events, booking, QR tickets, My Tickets | `apps/echoverse/` | http://localhost:7300 |
| Founders Frame website (scaffold) | `apps/founders-frame/` | http://localhost:7302 |
| Admin panel: dashboard, events, orders, refunds, gate scanner | `apps/admin/` | http://localhost:7301 |
| Backend: Supabase in Docker | `supabase/` | Studio http://127.0.0.1:54323 |

## Run it locally

You need Node 22.22+, Yarn (bundled in the repo) and Docker Desktop (running).

```bash
yarn install
cp apps/echoverse/.env.example apps/echoverse/.env
cp apps/admin/.env.example apps/admin/.env
cp supabase/functions/.env.example supabase/functions/.env

yarn db:start              # first run downloads the Supabase images
yarn dev:echoverse         # Echoverse website
yarn dev:admin             # admin panel (second terminal)
yarn dev:founders-frame    # Founders Frame website (third terminal)
```

- **Emails:** every email (login codes, tickets, refunds, staff invites) is caught by the local inbox at http://127.0.0.1:54324. Nothing is really sent.
- **Payments:** in test mode. Checkout shows a "Test checkout" sheet instead of Razorpay.
- **Venue map:** the event form's map (OpenStreetMap) and place search (Photon) need no keys. Drop a pin, and Directions on the website open Google Maps to that exact spot.
- **Admin sign-in:** password `Echoverse@2026`, with one account per role:

| Email | Role |
|---|---|
| admin@echoversehub.com | Super Admin |
| events@echoversehub.com | Event Manager |
| finance@echoversehub.com | Finance |
| marketing@echoversehub.com | Marketing |
| gate@echoversehub.com | Gate Staff |
| viewer@echoversehub.com | Viewer |

- **Sample data:** run `yarn db:reset` any time to go back to it.
- **Promo codes:** `ECHO10` (10% off), `DANCE100` (₹100 off the dance night), `TEAMFREE` (free).

## Docs

- The communities: [Echoverse Hub](docs/communities/echoverse-hub.md) and [Founders Frame](docs/communities/founders-frame.md)
- Echoverse: [what we built and why](docs/build-plan.md), from [the PRD](docs/Echoverse_Hub_Website_Ticketing_Platform_PRD.md)
- [Going live](docs/deployment.md)
- Rules for changing the code: [docs/rulebooks/](docs/rulebooks/) and [CLAUDE.md](CLAUDE.md)
