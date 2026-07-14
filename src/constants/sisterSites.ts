/**
 * Other Coulsy specialist websites we hand visitors off to.
 *
 * SINGLE SOURCE OF TRUTH. The name, URL and displayed domain live here once, so
 * a hand-off card can never disagree with itself about where it is sending
 * someone.
 *
 * THE BRAND ARCHITECTURE THIS SERVES
 *
 * Coulsy is a group of specialist websites, not a set of competing SEO projects.
 * Each site OWNS ONE SUBJECT COMPLETELY and hands off the rest:
 *
 *   - Coulsy Fire Doors (this site): inspection, survey, compliance, remedials,
 *     reports, installation arising from compliance, Responsible Person guidance.
 *   - Coulsy Joinery & Small Build: joinery, carpentry, kitchens, structural
 *     timber, refurbishment, wider building work.
 *
 * The parent brand, coulsy.co.uk, is NOT live. Do not link or reference it.
 * Future specialist businesses are NOT to be pre-announced here.
 *
 * The architectural question to ask of any content on this site is not "how do I
 * improve this page?" but "DOES THIS BELONG ON THE FIRE DOORS SITE AT ALL?" This
 * site used to say "I'm a fire door site, but I also do all your joinery", which
 * weakened the specialist claim it exists to make. It now says "I'm the fire door
 * specialist; here is our dedicated joinery site." Keep it that way.
 *
 * This is NOT an SEO cross-linking exercise, and it must never become a portal,
 * a directory, or a footer full of links to other Coulsy sites. It is ONE
 * deliberate hand-off at the point where a visitor's need genuinely exceeds this
 * site's remit.
 *
 * RULES:
 *
 * 1. ONE LIVE ENTRY. This is deliberately a named export, NOT an array. An array
 *    is an invitation to append "Coulsy Property Maintenance — coming soon", and
 *    a placeholder for a site that does not exist is worse than no link at all.
 *    Adding a second Coulsy website must be a deliberate act, not filling in a
 *    blank. There is no `SISTER_SITES` list. Do not create one.
 *
 * 2. NOT a "sister business". Coulsy Ltd is the registered company behind both
 *    the joinery and the fire door work (see /contact). There is no repository
 *    evidence of separate legal entities, so we say "another Coulsy website" and
 *    make no claim about company structure we cannot evidence.
 *
 * 3. NO CLAIMS. `scope` says what the other site covers. It carries no
 *    qualifications, insurance figures or years-of-experience claims. Those are
 *    evidenced per-site and must never be copied between the Coulsy repositories.
 *
 * 4. NOT a link exchange. This is used at the one point on the site where a
 *    visitor's need genuinely exceeds our remit — not in the footer, not
 *    sitewide. Fire Doors owns inspection, survey, compliance, remedials,
 *    reports, installation and Responsible Person guidance. Everything wider
 *    belongs to the joinery site.
 *
 * coulsycontractsolutions.co.uk is permanently retired. It must never reappear
 * here or anywhere else in this repository.
 */

export interface SisterSite {
  /** As the other site brands itself. */
  name: string;
  /** Where we send them. Homepage, deliberately — see below. */
  url: string;
  /** Shown in the UI so the domain change is never a surprise. */
  domain: string;
  /** What that site covers. Descriptive only — no claims. */
  scope: string;
}

/**
 * The joinery site. Linked at its HOMEPAGE rather than a deeper services route:
 * that repository is under active change, and a deep link into a site being
 * restructured is how you end up shipping a 404. The homepage is the durable
 * target and gives the visitor that site's own navigation.
 */
export const COULSY_JOINERY: SisterSite = {
  name: "Coulsy Joinery & Small Build",
  url: "https://coulsyjoinery.co.uk",
  domain: "coulsyjoinery.co.uk",
  scope:
    "General joinery, carpentry, kitchens, structural timber, refurbishment and small building works",
};
