# Deployment Checklist

How to take the platform from local development to production.

Four things go live:
- The **backend**: a Supabase cloud project.
- The **Echoverse website**, the **Founders Frame website** and the **admin panel**: three Vercel projects built from this one repo.

Until the communities have their own domains, each app lives on its free `vercel.app` address. Step 9 covers moving to a domain later.

## 1. Supabase project

1. Create a project in the Mumbai region (`ap-south-1`), close to Indian buyers. The Free plan pauses a project after a week without activity, and a paused project fails every website build and breaks the live sites, so use Pro once real people rely on it.
2. Link it and push everything:
   ```bash
   yarn supabase login
   yarn supabase link --project-ref <ref>
   yarn supabase db push          # migrations, without the seed
   yarn supabase config push      # auth URLs, email templates, function settings
   yarn supabase functions deploy
   ```
3. Under **Auth → URL configuration**, set the Site URL to the Echoverse website's address. Add each app's address followed by `/**` as a redirect URL: both websites and the admin (step 5 gives the addresses).
   - Staff invites and password resets land on the admin's `/set-password`. Without the admin's redirect URL, Supabase sends them to the Site URL instead.
   - `yarn supabase config push` replaces these settings with the localhost URLs in `supabase/config.toml`. Set them again after every config push.
4. Under **Auth → SMTP**, use Resend (see step 3) so login codes and staff invites come from the community's domain.
5. Create the first super admin:
   1. In **Auth → Users**, add the person. **Create new user** with a password and auto-confirm works without any email; **Invite** needs working email (step 3).
   2. Run `insert into public.staff (user_id, name, email, role) values ('<their user id>', '<name>', '<email>', 'super_admin');`.

   After that, add everyone else from the admin panel's **Team** page.

## 2. Payments: simulated for the client demo

The first live deployment keeps the simulated payment. Checkout shows the "Test checkout — no money moves" sheet, and paying confirms the booking straight away. That way the client can try the whole journey (book, get the email, open the ticket, scan at the gate) before Razorpay keys exist.

What that means while it's on:
- **No money is taken, and every booking gets real, scannable tickets.** Share the demo link only with the client, not publicly, and don't run a real event in this mode.
- Demo bookings show "Test payment" in the admin's order details.

Switch to real payments in step 8 once the client sends the keys.

## 3. Resend (email)

Verify `echoversehub.com` in Resend. Then send from `Echoverse Hub <tickets@echoversehub.com>`.

**Email needs a domain, even while the sites run on `vercel.app`.** Until one is verified:
- Resend sends only to the Resend account's own address, so buyers don't get ticket or refund emails. Their tickets still open on the confirmation page.
- Supabase's built-in mailer reaches only the project's own team and is heavily rate-limited, so buyers can't get My Tickets login codes and staff invites go nowhere.

The domain does not have to point at Vercel to fix this. Buying it and verifying it in Resend is enough; the sites can stay on `vercel.app`.

## 4. Function secrets and website addresses

```bash
yarn supabase secrets set \
  ADMIN_URL=https://<admin>.vercel.app \
  PAYMENT_PROVIDER=test \
  EMAIL_PROVIDER=resend RESEND_API_KEY=... \
  "EMAIL_FROM=Echoverse Hub <tickets@echoversehub.com>"
```

- `ADMIN_URL` is the admin's address from step 5. Staff invite emails link to it.
- `PAYMENT_PROVIDER=test` is the simulated payment from step 2. Leaving it unset means Razorpay, and checkout then fails until the keys are in.

There is no `SITE_URL` secret. Ticket emails link to each community's `communities.site_url`, and use the community's name as the sender name (the address comes from `EMAIL_FROM`). The admin builds its website links (live page, preview, ticket page) from it too.

The migration sets Echoverse's to `https://echoversehub.com`, and Founders Frame's starts empty, which makes its ticket emails fail. Point both at their Vercel addresses:

```sql
update public.communities set site_url = 'https://<echoverse>.vercel.app' where slug = 'echoverse';
update public.communities set site_url = 'https://<founders-frame>.vercel.app' where slug = 'founders-frame';
```

## 5. Vercel: the three apps

Each app is its own Vercel project, built from this repo. Each app folder has a `vercel.json` with the install, build and output settings and the SPA fallback, so the dashboard only needs the root directory and the environment variables.

| | Echoverse | Founders Frame | Admin |
|---|---|---|---|
| Root Directory | `apps/echoverse` | `apps/founders-frame` | `apps/admin` |
| Unknown paths serve | `/__spa-fallback.html` | `/__spa-fallback.html` | `/index.html` |
| Environment variables | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SITE_URL`; optionally `VITE_GA_MEASUREMENT_ID`, `VITE_META_PIXEL_ID` | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SITE_URL` | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` |

1. **Production deploys `main`.** Merge `dev` into `main` first. After that, every push to `dev` gets a preview deployment, and merging into `main` updates production.
2. **Use a Pro team.** Vercel's Hobby plan is for non-commercial use only, and these sites take payments.
3. Deploy the admin first. For each app, choose **Add New → Project**, import the repo, and set:
   - **Root Directory** from the table. Leave **Include files outside the root directory** on: the install needs the root `package.json`, `yarn.lock` and `.yarn/releases`.
   - Leave Framework, Build Command and Output Directory alone; `vercel.json` sets them. Yarn 4 runs from the committed release (`yarnPath`), so don't enable Corepack.
   - **Environment variables** from the table, for Production and Preview. The Supabase URL and publishable key are under **Project Settings → API Keys**.
   - **`VITE_SITE_URL`** is the website's production address without a trailing slash, for example `https://founders-frame.vercel.app`. Set it for Production only. Canonical links, the sitemap, robots and share images use it. Echoverse falls back to `https://echoversehub.com` without it.
   - After the first deploy, open **Settings → Build and Deployment → Node.js Version** and pick 22.x or 24.x.
4. **Vercel may add a suffix** to the address when the project name is taken. Check the address after the first deploy. If it differs, fix `VITE_SITE_URL`, the community's `site_url` (step 4) and the Auth URLs (step 1), then redeploy.
5. A website deploys fine before its community has a published event: its home and events pages show that nothing is scheduled yet. Once the deploy hook (step 6) is stored, publishing the first event rebuilds it.
6. Optional: each push builds all three projects. In each project's Root Directory settings, Vercel can skip a deployment when nothing in that app changed.

Preview deployments use the same Supabase project as production. A booking made on a preview address is a real order.

Check each deployment:
- Prerendered pages are served as built, not through the fallback: `curl -s https://<website>/about | grep -o '<title>[^<]*'` shows the About page's title.
- An unknown path such as `/events/nope` shows the website's not-found page, not Vercel's 404.
- The admin survives a refresh on a deep link such as `/events`.
- One test booking per website: the ticket page opens, the email arrives (step 3), and the ticket scans at the admin's gate.
- Lighthouse, mobile and desktop, against the targets in `CLAUDE.md`.

The admin pages are already marked `noindex`.

**The venue map needs no keys or accounts.** The admin's map shows [OpenStreetMap](https://www.openstreetmap.org/copyright) tiles, and its search box uses [Photon](https://photon.komoot.io/), a free OpenStreetMap search. Both are free for light use like an admin team's.
- The team drops a pin on each venue. The website's Directions button and the ticket email then open Google Maps navigation to those exact coordinates.
- If the search ever misses a venue, they search the area and tap the exact spot.
- If the admin is ever used heavily, both services can be swapped for a paid tile and search provider by changing `VENUE_MAP.tiles` and `PLACE_SEARCH` in `apps/admin/app/data/events/venue.ts`.

## 6. Rebuild the websites when events change

Event pages are prerendered, so a website shows its events as they were at build time. A newly published event still opens before the rebuild, through the fallback.

The `website_rebuild_hooks` migration calls a community's Vercel deploy hook when:
- an event is published, edited while published, unpublished or deleted
- a published event's ticket types or gallery photos change
- the community's event types change
- every night at 02:00 IST (`rebuild-websites-nightly`), so events that have ended move to past events

Changes made in one transaction send one request. When a hook is called again during a build, Vercel cancels the older build, so a burst of edits ends in one build. Vercel allows 60 hook calls an hour per project.

Set it up once per website:
1. In the Vercel project, open **Settings → Git → Deploy Hooks**. Create one named `events` for branch `main`, and copy its URL.
2. Store it in Supabase Vault from the SQL editor. The secret's name is `deploy_hook_` followed by the community slug:
   ```sql
   select vault.create_secret('<echoverse deploy hook url>', 'deploy_hook_echoverse');
   select vault.create_secret('<founders frame deploy hook url>', 'deploy_hook_founders-frame');
   ```
   To replace a hook later: `select vault.update_secret(id, '<new url>') from vault.secrets where name = 'deploy_hook_echoverse';`
3. Edit a published event and check that a deployment starts in Vercel. If none does, `select status_code, content from net._http_response order by created desc limit 5;` shows what Vercel answered.

Without a stored hook nothing is called, which is how local development runs.

## 7. Before real ticket sales

- Replace the placeholder events, prices and photos. Remove any local-only test events.
- Get the Terms, Privacy and Refund policy reviewed by a lawyer.
- Replace the placeholder contact email and Instagram handle in `apps/echoverse/app/data/contact.ts`.
- Add the analytics IDs.
- Switch to real payments (step 8) and clear the demo bookings.
- Do one real ₹1 test booking end to end: pay, receive the email, scan at the gate, then refund it.
- Optional: add Cloudflare Turnstile to checkout if bots start holding seats.

## 8. Switching to real payments

Do this when the client sends the Razorpay keys:

1. In Razorpay, complete KYC and switch to Live mode. Copy the Key ID and Key Secret.
2. Add a webhook pointing to `https://<ref>.supabase.co/functions/v1/razorpay-webhook`, with the events `payment.captured` and `order.paid`. Give it a strong secret.
3. Turn Razorpay on:
   ```bash
   yarn supabase secrets set PAYMENT_PROVIDER=razorpay \
     RAZORPAY_KEY_ID=... RAZORPAY_KEY_SECRET=... RAZORPAY_WEBHOOK_SECRET=...
   ```
   Checkout opens Razorpay (UPI, cards, net banking) from the next booking on. No code or website rebuild is needed.
4. Remove the demo bookings so the dashboard starts at zero. Every booking made before the switch is a demo booking, including free and complimentary ones. Run this once, in the SQL editor, before any real sale:
   ```sql
   delete from public.check_ins;
   delete from public.orders;
   ```
   Deleting the orders also deletes their tickets. Customers and visit counts can stay.

To try Razorpay before going live, use its Test mode keys first. Payments then go through Razorpay's test cards and UPI, and still no money moves.

## 9. When a community gets its own domain

For example `echoversehub.com` for the Echoverse website and `admin.echoversehub.com` for the admin.

1. In the Vercel project, open **Settings → Domains**, add the domain, and add the DNS records Vercel shows at the registrar. HTTPS is set up automatically.
2. Set the website's `VITE_SITE_URL` to the domain and redeploy. For Echoverse, removing the variable works too: it falls back to `https://echoversehub.com`.
3. Update the community's `site_url` (step 4), the Auth Site URL and redirect URLs (step 1), and `ADMIN_URL` if the admin moved.
4. Verify the domain in Resend and set `EMAIL_FROM` to an address on it (step 3).
