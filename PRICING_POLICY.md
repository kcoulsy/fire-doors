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

Where a property is outside the normal local operating area, a separate
**commercial travel and mobilisation charge** may apply. It reflects travelling
time, vehicle use and operating cost, lost productive time, scheduling impact,
and the cost of mobilising the business to a more distant location.

> ⚠️ **It must never be described, calculated or presented as HMRC mileage
> reimbursement.** See §8 — there is a live cross-system conflict here.

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
- any automatic fee calculation;
- a definition of "normal local operating area".

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

## Superseded documents

These predate this policy, contradict it, and must not be used as reference:

- `PRICING_STRATEGY_ANALYSIS.md` — recommends *"include travel in base price
  within service radius"*, the direct opposite of §4. Also miscounts the site as
  224 pages / 56 locations (actually 216 location pages / 54 locations) and
  claims no pricing is displayed, which stopped being true when the £50 shipped.
- `FAQ_PRICING_SUMMARY.md` — a ChatGPT-review scratch file quoting wording no
  longer on the site and stating £50 flatly.

Both are pending correction or archival.

## Open commercial questions

1. Definition of "normal local operating area" — deliberately unpublished (§7).
   Should the existing "approximately 20 miles of York" line in the FAQ be
   softened so it is not mistaken for the pricing boundary?
2. Whether the commercial mobilisation charge is built on the Laravel mileage
   service or a new concept (§8).

## Remaining website alignment work

Audited and agreed, not yet implemented:

- qualify the commercial survey bands (`from £180 + VAT`, `£15–£25 per door`) for
  travel and mobilisation — `faq.astro`;
- replace "Fixed small-job price/pricing" with "Clear small-job price/pricing" —
  `FireDoorInspectorsPage.astro`, `FireDoorInstallersPage.astro`;
- remove ambiguous "Free, no-obligation" from `contact.astro`;
- remove duplicate FAQ question names (installation cost, maintenance cost and
  emergency callout each appear twice in one `FAQPage` — degrades rich-result
  eligibility);
- align the FAQ to the site's I/my voice;
- correct or archive the superseded documents above.
