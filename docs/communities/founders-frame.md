# Founders Frame

> A curated networking and business community where the right people meet, exchange ideas, build meaningful relationships and create business opportunities.

**Status (2026-10-31):** built, pending a run against the live backend.
- **Website** (`apps/founders-frame/`): home, events, event pages, free RSVPs, application forms, application status and QR tickets, in the Founders Frame brand: white, navy and gold, the gold emblem logo (`docs/brand/founders-frame-logo-source.png`), Manrope and Inter, light theme only.
- **Admin:** an Applications tab with review, Founders Frame event fields (audience, industries, founder stages, speakers), approval seats and member profiles.
- **Backend:** its own event types, applications, member profiles and companies, and Founders Frame-styled emails.
- **Landing imagery:** AI-generated placeholder photography in the brand's editorial style (warm evening light; the hero uses daylight shots). Replace it with real photos from Founders Frame events as they happen.
- **Not built yet:** paid checkout on the Founders Frame site, memberships and cohorts, and a vector (SVG) version of the logo. The site uses raster cut-outs of the PNG.

## What it is

Founders Frame is a curated networking and business community platform for Pune's founders, entrepreneurs, investors, professionals and aspiring entrepreneurs.

It is not just an event management platform. Events are one of the core ways it builds the community, but the goal is bigger: a connected business ecosystem, not an event booking website.

## What it believes

- **Community first.** The relationships that form between events matter more than any single event.
- **Curated, not crowded.** The right people in the room beat a big room. That is why many events are application-based.
- **Value before price.** Start free, and introduce paid tickets and memberships only once the community has built enough value and demand.
- **Built to grow.** The underlying system supports every event format from the start, so new formats never need a rebuild.

## Who it's for

| Group | Who |
|---|---|
| Founders and entrepreneurs | Startup founders, co-founders, business owners, bootstrapped founders, early-stage entrepreneurs |
| Business leaders | CEOs, CXOs, CTOs, CFOs, COOs, CHROs and other decision-makers |
| Investors | Angel investors, venture capitalists, investment firms, family offices |
| Professionals | HR leaders, marketers, sales professionals, consultants, business strategists |
| Students and aspiring founders | College students, aspiring entrepreneurs, people exploring startup ideas |
| Ecosystem partners | Colleges, universities, incubators, accelerators, mentors, advisors, service providers |

Members come to find collaborators, mentors, potential clients, investors, co-founders and meaningful professional relationships.

## How its events work

Not every event has the same purpose, so Founders Frame supports several registration models. One event can mix them. For example, open RSVPs for the main room and application-only seats at a roundtable.

| Model | Flow | Suited to |
|---|---|---|
| Free community events | RSVP → registration → QR check-in → post-event follow-up | Networking meetups, founder mixers, community launches, open networking |
| Application-based events | Apply → review → approve or reject → confirm attendance → QR check-in | Founder roundtables, investor networking, CXO gatherings, curated discussions |
| Paid events | Register → pay → ticket and QR → check-in | Premium workshops, masterclasses, conferences, special events |
| Cohorts and memberships | Apply → get accepted → join → attend recurring sessions | Founder development programmes, mentorship circles, long-term initiatives |

**Rollout:** free RSVPs and application-based events first. Paid tickets come next, then memberships and cohorts. No event has been assigned a model yet, so the system must support all of them.

## What an event carries

Every event has the fields Echoverse events have: name, description, date and time, venue, capacity, registration deadline, registration status, price, QR check-in, organiser and cancellation policy.

Founders Frame events add:
- **Event details:** event format, target audience, founder stage and industry or sector.
- **Programme:** speakers and moderators, and an agenda or session schedule.
- **Registration:** application questions and approval status, company details and networking preferences.
- **Programmes:** cohort or membership details.

**The registration form adapts to the event.** An investor-founder networking event may ask for:
- company name
- founder name
- startup stage
- industry
- funding stage
- funding requirement
- investor profile
- meeting preferences

A general networking event may ask for none of these.

## Core entities

Events, registrations, members and companies are separate things:
- An event has several registration types.
- A member attends many events.
- A company has many members.

Keeping them apart is what lets Founders Frame add formats without rebuilding its core.

## Decisions so far

- **One kind of public account.** Everyone who signs up is a user. Being a founder, an investor or a student is profile information, not a permission.
- **The admin team reviews applications.** Super Admins and Event Managers approve or reject them; there is no separate curator role.
- **Shared platform.** Founders Frame uses the same admin panel, backend, team and Razorpay account as Echoverse Hub.
- **How it maps onto the platform:**
  - A free RSVP is a ₹0 registration type, confirmed instantly with a QR ticket.
  - An application is a registration type marked as needing approval. An approved applicant confirms through a normal booking.
  - Speakers and the agenda reuse the event's hosts and schedule.
  - Member profiles and companies are their own tables.

## What this means for the website

- **Its own identity.** Founders Frame has its own design, separate from Echoverse Hub's. It speaks to founders, investors and business leaders, so it should read as credible and considered.
- **Show who's in the room.** Speakers, audience, the format and the kinds of people attending sell an event more than the venue does.
- **Make applying feel worthwhile.** Explain who an event is for and why it is curated, and ask only the questions that event needs.
- **Keep members coming back.** Follow-ups after events and a profile that grows over time matter more than a single booking.
