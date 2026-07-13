# Handover

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
