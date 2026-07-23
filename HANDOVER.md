# Handover

**Read this first.** Sections are ordered by how badly they will bite you, not chronologically.

## 1. Verified release state — 14 July 2026

| | |
| --- | --- |
| **HEAD** | `3de0211` |
| **Branch** | `main`, synchronised with `origin/main` (0 ahead, 0 behind) |
| **Working tree** | clean (`seo-data/` was a Search Console export; it was moved out of the repository in July 2026 and should not be reintroduced) |
| **Production** | deployed and **verified by content and behaviour**, not by a deploy marker |

Netlify builds `origin/main` and publishes to production; there is no `netlify.toml`, so build config
lives in the Netlify dashboard. **Do not trust a deploy marker — poll for actual content.**

> **Process note (superseded since July 2026).** This section describes a
> direct-push-to-`main` model. Changes now go via a branch and a pull request so
> a Deploy Preview can be reviewed before anything reaches production. See
> **"How changes reach production"** in [`README.md`](README.md), which is the
> current operating model.

---

## 1b. The claims, credentials and reviews release (14 July 2026)

Four commits, in order: `5402ab6` → `d9e12b8` → `f219db4` → `3de0211`.

### The site was making claims that were not true

**"35+ years in fire safety" was false, and it was everywhere** — the meta description of every
location page, the FAQ schema, the site-wide default description in `Layout.astro`, and the visible
homepage hero. The 35+ years are **on the tools, in carpentry and joinery, since 1989**. The fire
door specialism dates from the **FireQual inspection exams passed in December 2024**. `/about` had
been telling the truth about this the whole time while the rest of the site contradicted it.

> **The rule: years belong to joinery. FireQual belongs to fire doors. Never merge them.**
> "37 years on the tools, then properly certified in 2024" is a *stronger* story to a Responsible
> Person than an unevidenced "35 years in fire safety" — and it is the true one.

Also corrected: "our inspectors" / "FireQual-certified joiners" (plural) became first person —
Robert is a sole practitioner. `award` and `hasCredential` dropped "35+ Years Experience", "Fully
Insured" and "Certified Installer" — **none of these is a credential** — and gained the NVQ Level 7
and the Advanced City & Guilds Distinction, which are held.

**Insurance wording is deliberately unchanged.** The site says only "fully insured" — vague, but not
false. **Do not copy the joinery site's "£5m public liability" figure across.** Fire door
*inspection* carries professional-indemnity exposure that joinery labour does not; the policy must
be confirmed to cover inspection work before any figure is published here.

### A fabricated review rating was live for 11 months

`aggregateRating: 4.8 / 50 reviews` — hardcoded in four files, **live on 228 of 230 pages**. It had
**no data source anywhere in the repository.** It first appears on 7–8 August 2025 in commits about
hyphenated location slugs and an "AI Smart Search" feature: a placeholder that was typed in during
unrelated work and never questioned. The homepage shipped it *alongside* the real 5.0 figure,
contradicting itself in the same HTML. **The invented number was worse than the real record.**

### The reviews were genuine. The text on the site was not.

The 12 Google reviews (profile: *Coulsy Joinery & Small Build*, 5.0 from 12, all five stars) are
real and earned. But their **text had been rewritten**: sentences were added to named customers'
published words — including one **Sophie Vohra never wrote** — and Luisa D's three paragraphs were
flattened into one. The joinery repo carried the same defect.

`src/constants/reviews.ts` is now the **single source of truth**. Its rules are load-bearing:

1. **`text` is verbatim.** Keep their typos — "Cousy Joinery", "unforseen", and edris mahmud's
   missing space in "for us.Very fast". Keep their punctuation: Sophie Vohra's apostrophes are
   typographic (`’`), Luisa D's are straight (`'`). **Correcting a customer's spelling is still
   editing what a named person published.**
2. **Display names exactly as Google shows them** — "MartinS", "Kim hosking", "graeme ian kynman",
   "Sales UK". No title-casing.
3. **Paragraph breaks are part of the wording.** Stored as `\n\n`, rendered one `<p>` each.
4. **No dates.** The old joinery list stored "a month ago", which rotted. Absolute or nothing.
5. **Count and average are derived from the array.** Never hardcode either. This is what makes it
   impossible for the number we tell a visitor to disagree with the reviews on the page.
6. The invented per-review `location` ("Yorkshire") and `service` ("Fire Door Survey") labels are
   **gone from the interface**, so they cannot be reintroduced out of habit. Google publishes
   neither, and they were being attributed to the reviewers.

### Self-serving review schema was removed, and this is not a loss

**Google does not support review rich results for a business reviewing itself.** Its guidance is
explicit: *"If the entity that's being reviewed controls the reviews about itself, their pages that
use `LocalBusiness` or any other type of `Organization` structured data are ineligible for star
review feature."* So `aggregateRating` and `Review` JSON-LD on our own `LocalBusiness` **never
earned a star and never could.** It was inert markup asserting a rating we are not permitted to
claim. It is gone; the **visible** reviews stay, because that is where they actually persuade
anybody. Ordinary `LocalBusiness` schema is retained. Removing the `Reviews` node also resolved one
duplicate `@id` collision on the homepage.

Built and live: pages carrying `aggregateRating` / `ratingValue` / `reviewCount` / `Review`
JSON-LD = **0** (was 228). `LocalBusiness` retained on 228.

### `/qualifications` is now indexable, and the sitemap agrees with the robots tags

The page that **evidences every credential claim on the site** — FireQual, NVQ Level 7, City &
Guilds Distinction, CSCS Gold — was `noindex`, while the unevidenced claims were broadcast on every
other page. Exactly backwards. It is indexable now (`3de0211`) — but note the order: **the claims
were fixed first (`5402ab6`), because indexing a page that still said "35+ years of fire door
experience" would have amplified the false claim.**

The sitemap had **no filter**, so all three noindexed pages were still submitted — telling Google
"index this" while the page said the opposite. `/compliance` and `/sustainability` remain `noindex`
and are now excluded. Sitemap: **227 → 225 URLs**, exactly those two. Page count unchanged at 230.

### Deferred — bounded housekeeping, not started

**228 of 230 built pages ship HTML comments into production**, including commented-out markup such
as `<!-- <form id="contact-form" method="post" action="submit-form" ...`. **Astro renders `<!-- -->`
into the output** — this is a real trap and it caught this very release: the first version of the
`/qualifications` change shipped an internal note ("it was noindexed while the claims were wrong")
to every visitor. **Use `{/* … */}` or frontmatter `//` comments for anything internal.** A bounded
investigation of the existing comment leakage is outstanding.

### The standing rule this release exists to enforce

> **Trace every public claim to evidence in the repository. Where the evidence is missing, stop and
> flag it — do not invent wording, and do not pick the more flattering number.** Every defect above
> was a number or a sentence that nobody could source: 4.8, 50 reviews, 35 years in fire safety,
> sentences attributed to customers who never wrote them. None of them survived contact with the
> question "where did this come from?"

---

## 1a. P0 — mobile navigation was dead for ~3 months (`5f532b4`, fixed 13 July 2026)

**The mobile menu accepted no taps in production from 18 April to 13 July 2026.** It opened,
but the chevrons would not expand the service dropdowns, links would not navigate, and neither
the menu nor the page scrolled while it was open. The burger kept working, which made the menu
look alive. On mobile — the majority of this site's traffic — the primary navigation was
unusable for roughly three months.

**Cause.** One inverted boolean in `src/components/Navbar.astro`, in `toggleMenu()`:

```js
const isOpen = menu?.classList.contains("-translate-y-full");   // wrong
```

`-translate-y-full` is the class that slides the menu **off-screen**, so it is present while the
menu is **closed**. Reading it directly inverted the state, and all five consumers below it ran
backwards: `aria-expanded`, both `aria-hidden` attributes, focus management, and — decisively —
`inert`. Tapping the burger slid the menu into view *and marked it `inert`*. An inert subtree is
not hit-testable, so taps fell straight through to `#mobile-nav-overlay` behind it, whose handler
only closes the menu. The burger itself kept working because it sits outside the menu.

**Fix.** Negate the producer so `isOpen` means "was open when the toggle fired", which is what
every consumer already assumed. One line; nothing else changed.

**Provenance.** Introduced by `d30190e` ("SEO + perf + a11y cleanup mirroring joinery site work"),
the pass that added `inert`. The identical defect was introduced to the joinery site by its own
`dd3f73f` on the same day, and fixed there by `58ef9d6`. **Astro was not the cause** (5.15.3; the
shipped bundle matched source exactly). The Astro 5 → 7 upgrade is unrelated backlog and must not
be bundled into a fix like this.

**Verification that would have caught it.** Chromium at an iPhone 13 viewport, driven against the
built bundle. The decisive probe is a hit-test at the centre of a menu link
(`document.elementFromPoint`) while the menu is open: before the fix it resolved to
`#mobile-nav-overlay`, after it resolves into the menu. A 13-point checklist scored **5/12 on the
pre-fix bundle and 13/13 after**, and 13/13 again against the live domain.

**Standing rule.** Accessibility and navigation code is copy-pasted between this repo and
`coulsy-joinery`, so a defect in one is a defect in both — fix and check them together. Any
future a11y or nav change must be exercised in a real mobile browser before release. `inert`,
scroll locks and overlay stacking are invisible to a type-check, to a clean build, and to every
desktop viewport. `astro check` reported 0 errors and the build stayed green for the entire three
months this was broken. **The build was never going to catch this.**
