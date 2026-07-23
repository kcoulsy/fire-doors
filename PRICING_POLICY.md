# Canonical pricing policy — Coulsy Fire Doors

**Status:** authoritative. Adopted 23 July 2026.
**Scope:** all public-facing copy, metadata and structured data in this repository.

This document is the single source of truth for what this website may say about
price. If page copy and this document disagree, **this document wins and the page
is wrong**. Do not restate pricing rules only in page copy, commit messages or
Claude memory.

---

## 1. The base survey fee

> **Standard domestic fire-door surveys start from £50 + VAT for one door.**

Always "**start from**". Never "costs", "is", "fixed at", or "per door".

The base fee covers:

- attendance and inspection of one door and frame;
- relevant measurements and observations;
- assessment of the likely repair-versus-replacement position;
- written findings;
- the information needed to price subsequent remedial work.

## 2. What the base fee does NOT cover

**Travel is not included.** The base fee does not include unrestricted travel
throughout Yorkshire. Any copy stating or implying that travel, mileage or
attendance anywhere in the region is included in the £50 is a defect — this was
the exact error corrected in `c4c4d32`.

Also not included, and chargeable where applicable:

- parking, tolls and access charges;
- other site-specific costs.

## 3. Additional doors

Additional doors are **not** automatically £50 each. They are priced according to
quantity, location and scope. Never publish a per-door multiplier.

## 4. Travel and mobilisation

Where a property is outside the normal local operating area, travel and
mobilisation is **added as a separate quoted line**. It reflects travelling time,
vehicle use and operating cost, lost productive time, scheduling impact, and the
cost of mobilising the business to a more distant location.

> ⚠️ **It must never be described, calculated or presented as HMRC mileage
> reimbursement.** See §4.2 and §8.

### 4.1 The two charging mechanisms are separate — never merge them

| | Customer-facing mechanism |
|---|---|
| **Domestic survey** | £50 + VAT starting price for one door, **plus a separately quoted travel/mobilisation line** where applicable. |
| **Remedial works** | May be subject to a **quoted minimum half-day or full-day attendance**. |

**A distant survey is never automatically converted into a half-day attendance.**
The survey keeps its own £50-plus-travel structure regardless of distance. The
minimum-attendance concept belongs to remedial works only.

Approved remedial-works wording:

> "Remedial works may be subject to a minimum half-day or full-day attendance,
> depending on the location, scope and resources required. Any minimum
> attendance and associated travel or site-specific charges will be clearly
> stated in the quotation before work is booked."

No half-day or full-day **rate** may be published (see §7).

### 4.2 Internal costing is not the customer-facing explanation

Mileage, fuel and vehicle-cost calculations **may inform pricing internally** —
that is what Laravel's `TravelCalculatorService` is for. They are **not** the
charging explanation given to the customer. The customer sees a quoted travel and
mobilisation line, not a distance sum they can recompute and dispute.

### 4.3 Prohibited wording

Do not use subjective, absolute or promissory phrasing for charges. It sets a
standard that has to be defended and does not tell the customer which mechanism
applies. State **which** charge applies and **when** it is confirmed.

Specifically banned, with the approved replacements:

| Banned | Why | Use instead |
|---|---|---|
| "whichever is fairer for the job" | Subjective; doesn't say which mechanism applies | Name the mechanism explicitly |
| "no surprises" / "no surprise invoices" | Absolute promise, defeated by any legitimate variation | "quoted separately and agreed before it's incurred, wherever reasonably possible" |
| "I don't spring extras at the end" | Reads as a guarantee of no additional charges | "if something surfaces that wasn't in the original scope, I identify it and agree it with you before the cost is incurred" |
| "hidden costs" | Invites the claim that a later charge was hidden | State that travel/mobilisation/parking/access are quoted separately where they apply |
| "fixed" price / pricing | Contradicts the "start from" model | **"clear"** price / pricing |

### 4.4 The three approved commercial statements

Any new copy about charges must reduce to one of these:

1. Charges not included in the original scope are identified and agreed **before
   they are incurred**, wherever reasonably possible.
2. Travel, mobilisation, parking, access and other site-specific charges are
   **quoted separately** where applicable.
3. Pricing is described as **clear**, never **fixed**.

## 5. Confirmation before attendance

All additional charges are confirmed in the customer's quotation **before
attendance**. This is the promise that makes the policy fair, and it is the
reassurance that replaced "visits are usually free". It must not be dropped.

## 6. Survey-fee credit

The only permitted wording:

> "Where expressly stated in the remedial quotation, the £50 survey fee may be
> credited against subsequent remedial work. Travel, parking and other
> site-specific charges are not credited."

Never promise the credit unconditionally.

## 7. What must NOT be published (yet)

Until the SaaS pricing and travel resolver defines them, this website must not
publish:

- mileage bands or rates;
- a radius threshold or zone boundary;
- a minimum mobilisation charge;
- a half-day or full-day **rate** (the minimum-attendance *principle* is
  publishable for remedial works — the number is not);
- any automatic fee calculation;
- a definition of "normal local operating area".

Neither system may create automatic minimum-attendance, radius or mileage rules
as a side effect of website wording work.

> **The "£180 for under 10 doors" band is not evidence of a half-day rate.**
> It is an existing published commercial *survey* band requiring separate
> review. Do not cite it as proof of a general minimum-attendance rate, and do
> not derive a day rate from it, unless Robert explicitly confirms that policy.

The website establishes the **principle** that travel may be additional. The SaaS
owns the **mechanism**. The website must never invent pricing logic the SaaS
cannot reproduce.

### Do not repurpose the internal link radii

`src/utils/getNearbyLocations.ts` defines `SERVICE_RADIUS_LIMITS` (15–20 miles).
These exist **solely** to generate internal "nearby areas" links. They are **not**
a pricing boundary and must never be presented as one.

Note also that `src/pages/faq.astro` still says the service area is "within
approximately 20 miles of York". That predates this policy and is a coverage
statement, not a pricing boundary — see the open questions below.

## 8. Cross-system constraint (SaaS / Laravel)

The Laravel side already has `TravelCalculatorService::calculateTravelCosts()`,
reading `mileage_rate_per_mile`, `fuel_price_per_litre` and
`fuel_consumption_ltr_per_mile`. **That is a mileage-reimbursement model, which
§4 prohibits as a customer-facing description.**

Before either side ships a travel charge, decide whether the commercial
mobilisation charge is built on that service or needs a separate concept. If the
SaaS bills mileage while the website describes mobilisation, the two systems
describe different things to the same customer.

Related open SaaS work: `project_travel_resolver_pricing_architecture_requirement_todo`,
tracked under the "Catalogue / no-script delivery" workstream. A "Travel" anchor
item and a "Survey fee" item (Archetype A — Supply Only) already exist in the
catalogue.

## 9. Structured data

- **Do not** add `Offer` price properties or `priceSpecification` schema.
- `priceRange: "££"` is correct and non-specific — leave it.
- The site publishes **no machine-readable price**, deliberately. A price in
  JSON-LD that is then surcharged is the worst outcome available.
- `/faq` emits the fee text into **two** JSON-LD blocks (`FAQPage` and
  `WebPage → FAQPage`) via `FAQSchema.astro`. Both derive from the single
  `faqData` array in `faq.astro`, so one edit propagates — but always verify both.

## 10. "Across Yorkshire"

**Retained deliberately.** It describes *service availability*, not uniform
pricing, and it is load-bearing for geographic SEO across 216 location pages.

The risk is adjacency, not the phrase. Never place the fee and an unqualified
"across Yorkshire" in the same section, and always attach the travel
qualification at the point the fee is stated.

---

## Superseded documents — ARCHIVED

Both were moved to `docs/archive/` on 23 July 2026 with superseded banners, so
this file is the only canonical pricing document in the repository. `README.md`
points here.

- `docs/archive/PRICING_STRATEGY_ANALYSIS.md` — recommended *"include travel in
  base price within service radius"*, the direct opposite of §4. Also miscounted
  the site as 224 pages / 56 locations (actually 216 location pages / 54
  locations) and claimed no pricing was displayed, which stopped being true when
  the £50 shipped.
- `docs/archive/FAQ_PRICING_SUMMARY.md` — an external-review scratch file quoting
  wording no longer on the site and stating £50 flatly.

## Open commercial questions

1. Definition of "normal local operating area" — deliberately unpublished (§7).
   Should the existing "approximately 20 miles of York" line in the FAQ be
   softened so it is not mistaken for the pricing boundary?
2. Whether the commercial mobilisation charge is built on the Laravel mileage
   service or a new concept (§8).

## Remaining website alignment work

Audited and agreed, not yet implemented:

The bounded audit of 23 July 2026 is **complete**. All twelve checks pass; see
the Completed list below.

Deferred by decision, not oversight:

- **The commercial survey bands themselves** (`from £180 + VAT`, `£15–£25 per
  door`) remain published. Their scope and travel treatment are now stated, but
  whether the bands should be published at all is an open commercial question —
  Robert's position is that a rate should not generally be visible because jobs
  are priced individually. Revisit as a separate decision. See the §7 caution:
  no day rate may be derived from £180.
- **A definition of "normal local operating area"** — deliberately unpublished
  (§7). The FAQ still describes coverage as "within approximately 20 miles of
  York", which is a coverage statement, not a pricing boundary. Consider
  softening so it cannot be mistaken for one.

### Completed — 23 July 2026

Wording:

- ~~"I don't spring extras at the end"~~ — `FireDoorServicesPage.astro`
- ~~"No surprise invoices at year-end"~~ — `FireDoorMaintenancePage.astro`
- ~~"hidden costs"~~ — `faq.astro`
- ~~"Fixed small-job price/pricing"~~ — `FireDoorInspectorsPage.astro`,
  `FireDoorInstallersPage.astro`
- ~~"you'll know exactly what to expect before we begin"~~ — `faq.astro`;
  replaced with quoted-scope-and-prior-confirmation wording that does not
  guarantee unforeseen conditions can never alter scope or cost
- ~~"Free, no-obligation"~~ — `contact.astro`
- ~~commercial bands silent on travel~~ — `faq.astro`; scope and travel
  treatment now stated without inventing a rate structure

Structure:

- ~~duplicate FAQ question names~~ — the two duplicated cost questions were
  renamed to "What affects the cost of…" in their service categories, leaving
  the detailed "How much does…" answers unique to the Pricing category
- ~~inconsistent I/my voice~~ — all 32 FAQ answers plus the page markup
  converted from we/our to I/my

Documentation:

- ~~two competing canonical pricing documents~~ — archived (above)
- ~~`README.md` was the unmodified Astro starter~~ — rewritten, points here
