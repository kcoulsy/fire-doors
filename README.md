# Coulsy Fire Doors

Marketing site for **Coulsy Fire Doors** — a trading activity of Coulsy Limited.
Live at [coulsyfiredoors.co.uk](https://coulsyfiredoors.co.uk).

Astro static site. Netlify builds `main` and publishes to production; pull
requests get a Deploy Preview.

---

## How changes reach production

Work on a branch and merge via pull request. Do not commit directly to `main` —
a push to `main` deploys straight to the live site with no preview and no review
step.

1. **Branch** from `main`.
2. **Keep housekeeping separate from functional change.** Asset removals, CI
   changes and tidy-ups belong in their own branch and their own PR, so a content
   diff stays reviewable.
3. **`npm run build`** before pushing. This runs `astro check` first; it must
   report 0 errors.
4. **Open a PR.** Netlify posts a Deploy Preview at
   `deploy-preview-<n>--coulsyfiredoors.netlify.app`.
5. **Review the preview**, not just the diff — particularly for copy, structured
   data and anything on the location matrix.
6. **Merge** once approved.
7. **Verify production by content**, not by a deploy notification. Fetch the
   affected pages and assert the new wording is present and the old wording is
   gone. A "deploy succeeded" email only tells you Netlify finished — and a
   Deploy Preview email is *not* a production deploy.

There are **no GitHub Actions workflows** in this repository. The only CI is
Netlify's build and its preview/redirect/header checks. A red check therefore
means something is genuinely wrong. (An obsolete Astro Studio workflow was
removed in July 2026: it required `@astrojs/db`, which this project has never
used, and reported false green for 54 runs.)

Deployment configuration lives in the Netlify dashboard — there is no
`netlify.toml` in the repository.

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

| Document | Status |
|---|---|
| `PRICING_POLICY.md` | **Current, binding policy.** Read before touching pricing copy. |
| This README | **Current.** The operating model above is how the repo is maintained. |
| `HANDOVER.md` | Dated snapshot of a past release. Useful history, not current process. |
| Other root `*.md` | Point-in-time working notes and audits. **Not authoritative.** |
| `docs/archive/` | Superseded. Do not use. |
