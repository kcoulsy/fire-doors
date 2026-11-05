# Fire-door liability wording review — business position change

**Status:** local implementation drafted, not yet reviewed or published.
Written 5 Nov 2026; updated 5 Nov 2026 once Robert reviewed the findings (with
a ChatGPT second opinion) and took two further commercial decisions — see §3a.
Updated again 5 Nov 2026 once Robert issued a full remediation brief covering
every item in §4 plus insurance representations (first implementation pass).
**Updated a third time 5 Nov 2026**: Robert reviewed that pass and approved
further changes — the site-visit fee is now **£60 + VAT (£72 inc. VAT)**,
replacing the £50 figure everywhere it was published; `/fire-door-inspectors`
and its 54 location variants have been **removed from the Astro build
entirely** (not just reworded) and 301-redirected via `public/_redirects` to
the matching `-fire-door-services` page per location (55 rules total); every
"Fully insured" claim site-wide has been softened to "insured for the work
undertaken" (unqualified-scope wording removed, nothing invented in its
place). The site now builds 175 pages (was 230; −55 for the retired route).
`npm run build` (astro check + astro build) passes with 0 type errors, and a
custom link-check script confirms 0 broken internal links and that every
redirect destination in `_redirects` exists in `dist`. **Nothing has been
committed, merged, pushed or deployed** — `git status` shows all changes as
uncommitted working-tree edits only. **Robert reviews and approves the actual
wording before anything is committed or published** — see §5.

**Updated a fourth time 5 Nov 2026**: Robert supplied his original FireQual
certificates, resolving the qualification-title flag below. The site now
states the three genuine, separately-certificated courses by name sitewide:
Fire Door Inspection Course (cert CQ014192, programme QFD027), Fire Door
Installation Course (cert CQ014193, programme QFD020), Fire Door Maintenance
Course (cert CQ014198, programme QFD026) — all awarded 4 Dec 2024 by UK Fire
Door Training, 8 FireQual CPD hours each, expiring 4 Dec 2027.
`qualifications.astro`'s structured data now carries three separate
`EducationalOccupationalCredential` entries with certificate numbers and
validity dates instead of one generic entry; every sitewide `award`/
`hasCredential` array and every prose mention was updated to match. Every
remaining "Insured for the work I undertake" / "Fully insured" statement has
now been **removed outright** (not reworded) — Robert confirmed the precise
scope of renewed cover is still unverified, so nothing was put in its place.
No "Approved Maintainer" claim or logo has been added — Robert supplied the
UK Fire Door Training Approved Maintainer logo, but the commercial-display
permission for it hasn't been confirmed, so the site makes no such claim
(checked: none existed before either). Rebuilt and re-verified: 0 type
errors, 175 pages, 0 broken links, all 56 `_redirects` rules still resolve,
£60 + VAT pricing unchanged, no £50/"Fire Door Inspector"/"Fully
Insured"/"Professional Indemnity"/"Compliance Survey" strings remain anywhere
in the built output.

**Scope:** this file, only. Nothing in this repository has been changed yet. This
document does not touch, and must never cause an agent to touch, the separate
`saas` (TradeService) codebase — that is a different application on a different
repository and is out of scope here.

---

## 1. What changed, and why

Coulsy Ltd is, and remains, a general joinery, carpentry, small building works and
property maintenance contractor. Fire-door work — installation, repair and
maintenance — is one part of that business, not a separate specialism standing
on its own.

Following difficulties obtaining suitable professional indemnity insurance,
**Coulsy will no longer offer:**

- Independent fire-door inspections
- Professional fire-door compliance assessments
- Fire-door inspection reports
- Independent fire-door certification
- Professional fire-safety consultancy

**This is not a withdrawal from fire-door contracting.** Coulsy still installs,
repairs and maintains fire doors, including remedial work raised by a third-party
fire risk assessment (FRA).

⚠️ **Do not assume, invent or state any detail of the insurance policy itself**
(insurer, wording, exclusions, renewal date). The only established fact is that
suitable cover for the five activities above is not currently obtainable. If a
page needs to explain *why* the service changed, say that in general terms only,
or — better — don't explain the "why" on the public site at all.

## 2. How the business actually operates now

1. The customer provides a third-party FRA.
2. Coulsy visits to examine the doors and price the identified work.
3. Coulsy quotes for the specified remedial work.
4. Coulsy carries out the agreed physical work.
5. The customer receives an invoice describing the completed work.
6. Manufacturer documentation is provided for the components installed.

Coulsy does **not** independently certify that the completed door assembly is
compliant.

**What the site should accurately advertise:**

- Fire-door installation
- Fire-door repairs
- Fire-door maintenance
- Remedial works against third-party FRA findings
- Site visits for measuring and pricing work

**What to preserve — do not strip these out:**

- Legitimate references to technical standards (BS 476, BS 8214, Fire Safety
  Order 2005, Building Regulations, etc.)
- Manufacturer certification of installed components (CE/UKCA marks, Certifire/
  CF numbers — only where a genuine certificate exists for that exact component;
  never invent or imply one)
- Competent installation practice, workmanship quality, commissioning checks
- Nothing should suggest Coulsy's physical contracting work is exempt from the
  usual technical or safety obligations that apply to any fire-door installer —
  it isn't. The change is that Coulsy no longer offers the separate
  *independent assessment/certification* service alongside the contracting work.

## 3. ⚠️ Flagged first — a bigger conflict than page wording

Before doing a word-by-word pass, read these in full. They are not minor copy
issues — they describe and price an *independent inspection/assessment*
service as a standing product, which is the exact thing being withdrawn. Two
of the three now have an owner decision (§3a); the third does not yet.

- **`PRICING_POLICY.md` §1 "The base survey fee"** — states "Standard domestic
  fire-door surveys start from £50 + VAT for one door", and defines that fee as
  covering "attendance and **inspection**", "**assessment** of the likely
  repair-versus-replacement position", and "written findings". As written, this
  *is* the independent-inspection-and-assessment product.
  **→ Decision 1 (§3a) now settles the business principle: the charge stays,
  reframed as a site visit for pricing purposes, not an inspection/assessment
  product.** `PRICING_POLICY.md` itself is still unchanged and still describes
  the old product — editing it is implementation, not covered by this approval
  (see §3a and §5).
- **`src/pages/qualifications.astro`** — page title "Fire Door Qualifications &
  Certifications - Robert Coulson | **FireQual Certified Inspector**"; its
  schema.org `Person.jobTitle` is `"Fire Door Inspector and Joiner"`. This is
  the clearest single page framing Robert as an independent inspector by
  occupation, not as a contractor.
  **→ Decision 2 (§3a) now settles the business principle and gives approved
  target wording.** The page itself is still unchanged — editing it is
  implementation, not covered by this approval (see §3a and §5).
- **`src/pages/compliance.astro`** — page title "Fire Safety Compliance &
  Standards - Coulsy Fire Doors | **Fully Insured & Certified**"; meta
  description and keywords include "fire door inspector qualified".
  **→ Not covered by either decision below.** Decision 2 names
  `qualifications.astro`'s job-title framing specifically; it does not mention
  this page. The same "Fire Door Inspector" problem is visibly present here
  too, but **do not assume Decision 2 extends to it** — flag it to Robert as
  its own open item and get explicit wording approval before drafting.

**Do not resolve the compliance.astro item by yourself.** Surface it to Robert,
propose wording, and wait for his go — exactly as the equivalent TradeService
catalogue audit on 5 Nov 2026 did (same business decision, different codebase;
see §6).

## 3a. Decisions taken 5 Nov 2026 — business principles approved, implementation not authorised

Robert reviewed this document's findings, together with a ChatGPT second
opinion, and took two decisions. **Both are approvals of business principle
only — neither authorises editing the website, `PRICING_POLICY.md`, or
published prices.**

**Decision 1 — the £50–£60 site visit.** Coulsy retains its existing charge of
approximately £50–£60, but the service is now a site visit for pricing
purposes — **not** an independent fire-door inspection or compliance
assessment. For existing fire-door remedial work:

- The customer must provide a third-party FRA.
- Coulsy attends to examine the proposed work.
- Measurements and pricing information are taken.
- Coulsy prepares a quotation for the required installation, repair or
  maintenance work.
- No independent inspection report, compliance assessment or certification is
  supplied.

The charge covers attendance, travel where applicable, measuring and preparing
the quotation. **Do not automatically change existing prices.** The final
charge remains dependent on the existing pricing policy and Robert's approval
— this decision settles what the £50–£60 visit *is*, not what figure
`PRICING_POLICY.md` should end up stating; that is still a drafting step
awaiting sign-off under §5.

**Decision 2 — professional qualifications.** Robert retains his genuine
FireQual qualification and MICWCI professional status — **these must not be
removed or misrepresented.** The website must distinguish between
qualifications *held* and services *currently offered*: Coulsy is not
advertising independent fire-door inspection or certification services.

- Approved professional description: **"Robert Coulson MICWCI — Professional
  Joiner, Builder and Fire Door Specialist"**.
- The existing FireQual qualification can remain listed in the qualifications
  section, using its accurate qualification title.
- **Avoid using "Fire Door Inspector" as the current advertised service or
  primary job title** — this is the specific framing problem on
  `qualifications.astro` (§3).

**Both decisions are approved business principles, not implementation
authority.** `PRICING_POLICY.md` is unchanged; `qualifications.astro` is
unchanged; no price has changed; nothing has been committed, merged or
deployed. See §5 for what proceeds next and what still needs Robert's sign-off
on actual wording before anything goes live.

## 4. Pages and components to review, in priority order

A full-text search for `inspect|certif|compliance|consultan|professional|assess|
accredit|qualif|survey` across `src/pages`, `src/components` and `src/constants`
currently returns **403 matches** — too many to hand-audit in this note. Work
through them with that search, prioritised by how directly each page sells the
withdrawn service:

1. `src/pages/fire-door-inspectors.astro` → `src/components/FireDoorInspectorsPage.astro`
   — page/route literally named "fire door inspectors". Decision 1 (§3a) gives
   the target framing — a site visit for pricing, not an independent
   inspection — but whether this route is reworded, retitled or
   retired/redirected is still Robert's call (a URL change has SEO
   consequences). Don't decide the route's fate unilaterally; do draft wording
   consistent with Decision 1 for review.
2. `src/pages/qualifications.astro` — Decision 2 (§3a) gives approved target
   wording for the job title/description and confirms the FireQual
   qualification stays listed. Draft the page update against that wording for
   Robert's sign-off; do not publish without it.
3. `src/pages/compliance.astro` (see §3 — **not** covered by either decision;
   flag separately and get its own wording approval before drafting)
4. `src/pages/fire-door-services.astro` → `src/components/FireDoorServicesPage.astro`
5. `src/components/FireDoorInstallersPage.astro`,
   `src/components/FireDoorMaintenancePage.astro` — these should be the surviving
   positive framing (install/repair/maintenance); check they don't themselves
   slip into inspection/certification language.
6. `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/faq.astro` —
   homepage and general pages often repeat service claims in summary form.
7. `src/components/QualificationCard.astro`, `src/icons/InspectorIcon.astro` —
   check where these are used; an icon/label named "Inspector" may need
   relabelling even if the underlying component is reused for something else.
8. `src/pages/contact.astro` → `src/components/ContactForm.astro` — enquiry
   categories/dropdowns must not offer "inspection report" or "compliance
   certificate" as a selectable service.
9. `src/constants/details.ts`, `src/constants/reviews.ts` — check for
   service-list copy and testimonial text that references inspection/
   certification work.
10. Every page's `seoData` block (`title`, `description`, `keywords`,
    `structuredData`) — these are duplicated in meta tags *and* in
    schema.org JSON-LD `Offer`/`Service` entries. A wording fix that only
    changes visible body copy and misses the JSON-LD will leave Google showing
    the old claim in search results. Check both.
11. `src/pages/[...slug].astro`, `public/` (sitemap, any static JSON-LD) —
    confirm no other generated or static page repeats the same claims.

**Examples of the kind of phrasing to flag**, drawn from the equivalent
TradeService wording audit, as a guide to the pattern (not an exhaustive list):

- *"inspection and compliance certification … including certificate issue"*
  → reframe as a check/photographic record of completed work, not a
  certification service.
- *"survey to assess remedial works to bring back to compliance"* → reframe as
  a site visit to examine a door flagged in a third-party report, and quote
  the remedial work — not Coulsy determining compliance status.
- Standalone "inspection" or "survey" used as a named professional service,
  rather than an ordinary site visit to look at the work and price it.
- Job titles / credential framing that present "inspector" as the occupation,
  rather than "joiner" / "fire-door installer".

## 5. Process — do not publish unreviewed

1. Read §3 and §3a in full before touching anything.
2. Work the priority list in §4, using the grep pattern above to find
   remaining instances as you go.
3. Draft proposed replacement wording — don't commit/deploy it. For
   `qualifications.astro` and the pricing framing on
   `fire-door-inspectors.astro`, draft against the approved target wording in
   §3a (Decisions 1 and 2) rather than inventing new framing.
4. Where a page's *underlying product or price* (not just its wording) is
   affected, **implementation still needs its own go even where the business
   principle is approved**:
   - `PRICING_POLICY.md` itself is not to be edited yet (Robert's explicit
     boundary) — draft the replacement §1 text for review, don't commit it.
   - No published price changes, automatically or otherwise — Decision 1
     settles what the £50–£60 visit *is*, not a new figure.
   - `compliance.astro` has no decision yet — stop and ask before drafting.
   - The `/fire-door-inspectors` route's fate (rework vs. retitle vs.
     retire/redirect) is still open — don't decide it unilaterally.
5. Get Robert's sign-off on the actual proposed wording before committing or
   deploying anything — including the two decided items, since Decision 1 and
   Decision 2 approve principles and target phrasing, not a finished page.
   This applies doubly to meta titles/descriptions and JSON-LD
   (`structuredData`), since those are indexed by Google and slower to correct
   after the fact than visible page text.
6. **Do not modify website pages, `PRICING_POLICY.md`, or published prices,
   and do not commit, merge or deploy any website change, until that
   sign-off happens.**
7. Leave this file in place (update its status line) once work starts, so the
   next session can see what's done and what's still open — don't delete it
   until Robert confirms the review is complete. Don't fork this into a second
   briefing document — this file is the one record.

## 6. Context — not the same codebase as TradeService

The TradeService SaaS application (a separate repository, `saas`, unrelated git
remote) ran an equivalent read-only wording audit of its own fire-door catalogue
and documents on 5 Nov 2026, against the same business-policy change, and found
8 similar findings there (platform catalogue item descriptions, a live job's
close-out item, a completed job's line description) — none actioned yet,
awaiting Robert's wording approval there too. The two reviews are run in
parallel because the two codebases are independent; nothing here depends on
that one, and nothing there depends on this one.
