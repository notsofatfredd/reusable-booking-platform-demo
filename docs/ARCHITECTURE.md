# Architecture direction

## Product invariant

The product is a shared scheduling engine with interchangeable industry packs, tenant configuration, themes and layouts. Core code must never depend on salon-specific terms.

```text
Shared booking engine
  -> Industry pack (terminology and sensible defaults)
  -> Tenant configuration (brand, policies, offerings, resources)
  -> Theme tokens (colour, type, radius and imagery)
  -> Layout composition (compact, editorial and future layouts)
```

## Production boundaries

- `platform`: tenant lifecycle, plans, limits and support access.
- `identity`: users, memberships, roles and secure customer links.
- `catalog`: configurable offerings, categories, questions and resources.
- `availability`: schedules, leave, blocked periods, buffers, holds and conflict prevention.
- `bookings`: appointments, offering lines, state transitions and history.
- `customers`: tenant-isolated profiles, notes, consent and files.
- `payments`: provider-neutral intents, webhooks, refunds and idempotency.
- `notifications`: templates, queues, retries and channel adapters.
- `presentation`: hosted pages, custom domains, widgets, themes and layouts.
- `audit`: append-only records for sensitive and operational actions.

## Non-negotiable implementation rules

1. Every tenant-owned database row carries `business_id` and is protected by database-enforced tenant policies.
2. Slot creation uses transactional conflict checks and expiring holds to prevent simultaneous double-booking.
3. Booking statuses use an explicit state machine; every transition records actor, prior state and timestamp.
4. Payments and notification providers sit behind adapters and process idempotent webhooks or jobs.
5. Public booking URLs contain opaque, expiring tokens and no private customer information.
6. Configuration is versioned and auditable; onboarding never requires a code fork.

The browser demo stores state in local storage. It includes unrelated beauty and consulting tenants to prove that language, catalog, colours, typography, layout and booking policies are configuration-driven. Local storage is not the production persistence layer.
