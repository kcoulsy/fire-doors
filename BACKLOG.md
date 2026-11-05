# Backlog

The current to-do list for this site. Ordered by consequence, not by ease.

Two rules, both learned the hard way:

- **Do not start an item marked "needs evidence" from repository inspection alone.**
  Similar-looking pages are not proof of a search problem.
- **Trace every public claim to evidence in the repository.** Where the evidence is
  missing, stop and flag it — do not invent wording and do not pick the more
  flattering number.

Last reviewed: **12 September 2026** (`main` at `a9868e0`).

---

## Completed and live

| Work | Merge | Verified live |
|---|---|---|
| Google reviews reconciled 12 → **13** (Tom Waller, newest-first, verbatim) | `8d542dc` (#5) | `5.0 out of 5 (13 reviews on Google)` |
| **MICWCI** professional identity on 3 identity surfaces | `01c194e` (#4) | `Robert Coulson, MICWCI` |
| Skip link (WCAG 2.4.1) — plus the scoping, focusability and focus-move bugs behind it | `550d083` (#6) | all 230 pages |
| Contact-form `autocomplete` + honeypot AT exclusion | `550d083` (#6) | `/contact` |
| `/qualifications` first-person voice | `550d083` (#6) | `My Fire Door Qualifications` |
| Real HTTP security headers (`nosniff`, `DENY`, Referrer-Policy, Permissions-Policy) | `93c8d05` (#7) | response headers |
| Immutable caching for `/_astro/*` only | `93c8d05` (#7) | `max-age=31536000, immutable` |
| Netlify configuration documented | `a9868e0` (#8) | README |
| Fire-door inspection service withdrawn; £60 + VAT site-visit pricing; qualifications verified against original certificates (see `FIRE_DOOR_LIABILITY_WORDING_REVIEW.md`) | `25eb4cf` (#10) | `/qualifications`, `/compliance`, `/faq`, `/fire-door-inspectors` → 301 |
| Contact form kept customers on-site after submission (first attempt — superseded by #12 below) | `a00c6e8` (#11) | `/contact` |
| Contact-form post-submission 404 fixed — root cause was a shared Netlify Forms `name="contact"` registering only one `action` sitewide; fixed by submitting via `fetch()` instead | `5ea4b88` (#12) | `/contact` (real-browser test by Robert, 5 Nov 2026: submission, on-site confirmation and email notification all confirmed working) |
| Contact-form confirmation banner could disappear almost immediately and wasn't scrolled into view — defect pattern identified by the Coulsy Joinery agent (`contact-form-confirmation-fix-2026-11-05`, commit `3de3395`) and found to apply here too. Cause: `showBanner()` scheduled an unconditional 8-second `setTimeout` per call with nothing to cancel a still-pending one from an earlier call, so a second banner (e.g. after a retry) could be hidden almost immediately by a stale timer from the first. Fix: removed the auto-hide timer entirely (banners now stay until dismissed or the visitor leaves); moved both banners above the form; added `scrollIntoView()` + `.focus()` on show; added accessible dismiss buttons; added `role="status"`/`aria-live="polite"` (success) and `role="alert"`/`aria-live="assertive"` (error); added an explicit duplicate-submission guard. Netlify Forms, the honeypot and the fetch-based submission from #12 are unchanged. Verified by `npm run build` (0 errors, 175 pages), the link-check script (0 broken links), and by extracting and executing the actual compiled script against 4 scenarios (success, dismiss-then-retry, duplicate-submission guard) — not by a live browser test, since none was required to verify this. | `8e82dd5` (#13) | `/contact` (confirmed live: banners render above the form with the expected ARIA roles and dismiss buttons; ✗ a real browser/screen-reader pass has not been done) |

---

## Open — blocked on external access

### Plausible analytics is dead — **highest consequence, cannot be fixed here**

`analytics.coulsy.dev` returns HTTP 404 on every path, so the script never executes
and the site is almost certainly recording nothing. Pre-dates the header change
(proven by control). Nothing in this repository is wrong.

**Blocker: no Cloudflare credential for the `coulsy.dev` zone on this workstation.**
Full evidence, localisation and the verification procedure:
[`docs/ANALYTICS.md`](docs/ANALYTICS.md). Do not route around it by editing the site.

This blocks nothing else technically, but every day it stays broken is a day of
traffic data that cannot be recovered.

---

### Contact-form notification emails scored as spam — non-urgent, deferred

**Recorded 5 November 2026.** The contact form itself is fully working — Robert
personally verified on 5 Nov 2026 that submission, staying on-site, the green
confirmation and the Netlify notification email all function correctly (see the
`ContactForm.astro` fixes in PRs #11/#12). This entry is about what happens to
that notification *after* Netlify sends it: the receiving mail server flagged it
as spam.

**Findings:**

- Sender: `formresponses@netlify.com`, via Amazon SES, sending IP `54.240.9.98`.
- Receiving server: `mda.extendcp.co.uk` (the `@coulsy.co.uk` mailbox).
- SPF and DKIM both **passed** — this is not an authentication failure.
- SpamAssassin scored the message **3.5**, against a spam threshold of **3.5**
  (i.e. right on the boundary).
- Principal contributing factors: the sending IP's presence on two reputation
  lists, **Invaluement** and **0spam**.
- This is the same underlying class of issue as the earlier investigation
  (same sender/path, authenticated and SPF/DKIM-clean, scored 4.1 against the
  same 3.5 threshold on that occasion) — recurring, not new.

**This is an email-deliverability issue on the receiving mail infrastructure,
not a website or contact-form defect.** Nothing in this repository is wrong.

**Blocker / proposed future action:** investigate a narrowly scoped server-side
spam-filter exception for authenticated Netlify form notifications specifically
(matching sender + SPF/DKIM-pass), on `mda.extendcp.co.uk`. **Do not** disable
spam protection generally or whitelist Amazon SES's broader sending ranges —
that would accept spam from every other SES-sending customer too, not just
Netlify's form notifications.

Robert has explicitly deferred further action on this until another day.

---

## Open — evidence-backed technical work

### 1. Consolidate the structured-data graph

**220 of 230 pages emit a duplicate `@id`.** Three top-level `LocalBusiness` nodes
per generated page — `Layout.astro`'s (`@id=#business`, has `logo`),
`pageMeta.ts`'s `businessSchema` (**same `@id`**, has `hasCredential`, no `logo`)
and `pageMeta.ts`'s `localBusinessSchema` (no `@id`) — plus a fourth nested as
`serviceSchema.provider`. Two nodes claim one identity with different properties.
Sitewide: 670 `LocalBusiness` nodes. No `WebSite` entity exists anywhere.

Target: one `@graph` from one shared module. `Organization`, `WebSite`,
`LocalBusiness` and `Person` each declared **once** with stable `@id`s; per-page
`WebPage`/`Service`/`FAQPage`/`BreadcrumbList` referencing them.

Constraints that must survive the rewrite:

- **MICWCI** belongs on the canonical `Person` entity — `honorificSuffix`, with
  ICWCI in `memberOf`. **Never** `hasCredential`: it is a membership grade, not a
  qualification or a licence.
- **Address and geo stay unpublished.** The registered office is Robert's home;
  this is a service-area business, disclosed once on `/company-information`.
- **No radius.** `PRICING_POLICY.md` forbids publishing a radius threshold or zone
  boundary — that includes a `serviceArea` `GeoCircle`.
- **No review markup.** `AggregateRating`/`Review` remain excluded; Google does not
  support review rich results for a business reviewing itself.

⚠ **`MainPage.astro`'s ~90-line dormant `seoData.structuredData` must be deleted,
not activated.** It is assigned and never referenced. Switching it on would publish
the home address and geo, declare a 50 km `GeoCircle`, reinstate pre-MICWCI `Person`
data, and contradict the live `openingHours` and `brand.slogan`.

Files: `Layout.astro`, `pageMeta.ts`, `MainPage.astro`, the four service page
components, `SteelFireExitDoorsPage.astro`, `about.astro`, `qualifications.astro`,
plus a new shared module.

### 2. Four duplicate service hubs

`/fire-door-services` vs `/yorkshire-fire-door-services` — and the same for
inspectors, installers and maintenance. **99.3% identical, identical `<title>` and
`<h1>`, each self-canonical, both in the sitemap.** Genuinely self-competing.

Needs a redirect-or-canonical decision, so check Search Console for these eight
URLs first. Smaller and far more tractable than item 4.

### 3. Content-Security-Policy — deferred, not forgotten

Blocked on application work, not on writing a header. The Google Fonts `<link>`
carries an inline `onload=` handler, and **no nonce or hash can authorise an inline
event handler** — only `'unsafe-inline'`, which would make `script-src` pointless.
There are also five inline scripts.

Prerequisite: refactor the font-loading pattern to drop the inline handler, then
nonce or hash the remaining inline scripts. Adding `'unsafe-inline'` to claim a CSP
exists is worse than having none.

---

## Open — needs Search Console evidence before any change

### 4. The 216 generated location pages

Four service families × 54 locations. Within a family the pages are **99.0%
character-identical**: ~1,160 words of which 3–4 differ, being the town name
substituted 11 times. Across families they *are* differentiated (41% similarity) —
the four templates are real work; multiplying them by 54 is not.

Google classifies doorway abuse as a **spam policy**, and one documented example is
*"creating substantially similar pages that are closer to search results than a
clearly defined, browseable hierarchy"*.

**No penalty has been established, and none should be asserted.**

Required before touching a single URL:

1. 6–12 months of Search Console URL and query performance for these pages.
2. Which actually receive impressions, clicks and rankings.
3. Preserve the pages that perform; differentiate or prune only the rest.

**Do not delete, redirect, consolidate or rewrite them on similarity alone.**

### 5. Orphan location pages

27 location pages have **zero inbound internal links** and are discoverable only via
the sitemap. Fix is a browseable coverage index — but the right shape depends
entirely on item 4, so do them together.

---

## Lower priority

- **Long meta descriptions.** 224 of 227 exceed ~160 characters and are truncated in
  results. Worth revisiting opportunistically when a page is edited for another
  reason; **not** worth a bulk rewrite of 224 descriptions — Robert's explicit call.
- **Two placeholder hero photographs** — Installation
  (`src/assets/images/door-hanging-1.jpeg`) and Maintenance
  (`src/assets/images/door-closer-open.jpeg`). A one-line `import` swap each, once
  real photographs exist.
- **One heading-level skip** (h2 → h4) on the homepage. The only one sitewide.

## Deliberately not doing

These were assessed and judged not worth engineering time. They are recorded so they
are not "rediscovered" as new findings:

- Trailing-slash and mixed-case URLs return 200 rather than 301 — every variant
  emits the correct normalised canonical, which is the deliberate fix.
- Tap targets under 24 px — footer links are 20 px with 16 px gaps and **pass the
  WCAG 2.5.8 spacing exception**.
- Google Fonts served from a third-party origin — LCP is 516 ms; self-hosting buys
  nothing measurable.
- `lang="en"` rather than `en-GB`.
- FAQ emitted as both `FAQPage` and `WebPage → FAQPage` — deliberate.
