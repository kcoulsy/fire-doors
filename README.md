# Coulsy Fire Doors

Marketing site for **Coulsy Fire Doors** — a trading activity of Coulsy Limited.
Live at [coulsyfiredoors.co.uk](https://coulsyfiredoors.co.uk).

Astro static site, built and deployed from `main`.

---

## ⚠️ Before changing anything about price

**[`PRICING_POLICY.md`](PRICING_POLICY.md) is the single source of truth for every
public statement about price, fees, travel and charges.**

If page copy and that document disagree, the document wins and the page is wrong.
Read it before editing any copy that mentions a fee, a quotation, travel, or what
is "included".

The short version:

| | |
|---|---|
| **Domestic survey** | Starts **from £50 + VAT for one door**. Never "costs £50", never "per door". |
| **Travel** | **Not** included in the £50. Quoted as a separate line outside the normal local operating area. Never described as HMRC mileage. |
| **Remedial works** | May be subject to a quoted minimum half-day or full-day attendance. No rate is published. |
| **Never publish** | Mileage rates, radius thresholds, zones, day rates, or `Offer`/`priceSpecification` schema. |
| **Never write** | "fixed" pricing, "no surprises", "no hidden costs", "exactly what to expect". |

Two older pricing documents contradict this and are archived under
[`docs/archive/`](docs/archive/) with superseded banners. Do not use them.

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | `astro check` + production build to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Structure

```text
src/
├── components/     page components + shared UI
├── constants/      locations, reviews, sister sites
├── layouts/        Layout.astro (schema, meta, head)
├── pages/          routes; [...slug].astro generates the location matrix
└── utils/          pageMeta.ts (meta descriptions + JSON-LD)
```

**Location matrix.** `[...slug].astro` generates `{location}-{service}` pages from
54 locations × 4 service types = 216 pages. Copy edited in the four service-page
components, or in `pageMeta.ts`, propagates across all of them — check the blast
radius before editing either.

**Structured data.** `pageMeta.ts` and `Layout.astro` emit LocalBusiness / Service
/ FAQPage JSON-LD. `FAQSchema.astro` emits the FAQ twice (`FAQPage` and
`WebPage → FAQPage`), both derived from the single `faqData` array in
`src/pages/faq.astro` — so one edit propagates, but verify both blocks.

## Other documentation

The remaining root-level markdown files are point-in-time working notes and
audits. They are **not** authoritative. `PRICING_POLICY.md` is the exception: it
is current, binding policy.
