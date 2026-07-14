/**
 * Google reviews for Coulsy Joinery & Small Build — the profile that carries the
 * reviews for Robert's work, including the fire door jobs.
 *
 * SINGLE SOURCE OF TRUTH. `Reviews.astro` renders these and derives both the star
 * average and the review count from them, so the number shown on the page can never
 * disagree with the reviews actually on it. Add a review here and both update.
 *
 * RULES:
 *
 * 1. `text` is VERBATIM. These are named people's words. Do not paraphrase, tidy or
 *    "improve" them. The previous list carried invented sentences — including one
 *    Sophie Vohra never wrote — and a fabricated 4.8/50 rating that matched nothing.
 *    Copy and paste from the Google Business Profile. Keep their typos ("Cousy",
 *    "unforseen") and their spacing (edris mahmud's missing space after "us.").
 * 2. Paragraph breaks are part of the wording. `\n\n` separates paragraphs and the
 *    renderer prints one <p> per paragraph. Do not flatten them.
 * 3. Display names are EXACTLY as Google shows them — lower case ("graeme ian
 *    kynman", "edris mahmud", "Kim hosking"), run together ("MartinS"), or a company
 *    handle ("Sales UK"). Capitalising them is still an edit to a real person's name.
 * 4. NO DATES. The old joinery list stored "a month ago", which was true the day it
 *    was typed and rotted from then on. If dates return, store absolute ones.
 * 5. `rating` is the only place a rating lives. Never hardcode a rating or a count.
 * 6. No self-review JSON-LD. Google does not support review rich results for a
 *    business reviewing itself, so `aggregateRating`/`Review` markup on our own
 *    LocalBusiness earns nothing. These reviews are for humans. That is the point.
 *
 * Mirrors coulsy-joinery/src/constants/reviews.ts, reconciled against the profile
 * on 13 July 2026 — 12 reviews, all five stars.
 */

export interface Review {
  /** Display name exactly as Google shows it. See rule 3. */
  author: string;
  rating: number;
  /** Verbatim, `\n\n` between paragraphs. See rules 1 and 2. */
  text: string;
}

/** Newest first, matching the order Google presents them. */
export const REVIEWS: Review[] = [
  {
    author: "Barbara",
    rating: 5,
    text: "If I could give more than 5 stars I would! Robert was incredibly helpful and knowledgeable, and was able to replace my old terrible fire door and make it compliant quickly and efficiently (which was not easy thanks to the very non-compliant state it was in to start with). All work was done to the highest standard, fast, competitively priced and with great communication. Plus he helped with an unforseen follow-up due to new floors which was above and beyond. Thank you so much!",
  },
  {
    author: "Sally Gerrand-Jones",
    rating: 5,
    text: "I contacted Robert to survey the fire door of my York apartment. As a result of the survey, a new fire door was fitted. Both the survey and the subsequent door fitting were carried out to the highest standard and attention to detail. Thank you for all your help and advice Robert. I could not have found anyone better to carry out the work.",
  },
  {
    author: "Sales UK",
    rating: 5,
    text: "You read so many bad reviews about builders but I am delighted to say Cousy Joinery is not one of them. From the outset Robert was open, explained everything in detail, polite, extremely tidy, punctual - in fact everything you want a tradesperson should be. I would have absolutely no hesitation in recommending them for any work you need doing.",
  },
  {
    author: "MartinS",
    rating: 5,
    text: "Mr Coulson gave careful and precise work professionally and was personally very easy to deal with. I would certainly employ him again for any future joinery needs.",
  },
  {
    author: "Kim hosking",
    rating: 5,
    text: "Had a fire survey done on my apartment door by a previous company and no one could make head nor tail of it. I hired in Rob and he was friendly, knowledgeable and gave a full, clear breakdown of everything and the changes that needed to be made. Thank you so much!",
  },
  {
    author: "Donna Cresdee",
    rating: 5,
    text: "We have been extremely pleased with the professionalism shown by Robert, and the quality of our new fire door. A very quick response and delivery, would highly recommend.",
  },
  {
    author: "Luisa D",
    rating: 5,
    text: "We would strongly recommend Coulsy Ltd for anyone looking for good-quality joinery work. We used Robert and Debbie for the installation of an external fire door. Their pre-installation advice was excellent. We are delighted with the installation of the door. It was fitted with real skill and precision, they take real thought in not just getting it functionally spot-on but aesthetically too. They also left the place tidier than before they started the work.\n\nWe're sorry we didn't know of this company sooner as we would have used them for other aspects of our project.\n\nHowever, I will be certainly getting in touch with them for any future work.",
  },
  {
    author: "Sophie Vohra",
    rating: 5,
    // Sophie's apostrophes are typographic (’) on the profile; Luisa D's are
    // straight ('). Both are reproduced as published — see rule 1.
    text: "I contracted Debbie and Robert to carry out fire safety repairs on my apartment door, following a request by the management company/freeholders. From start to finish they were a dream.\n\nThey carried out their own survey, which flagged other key aspects that needed addressing, which the one the management company carried out clearly missed. They were punctual, well prepared with all the materials they’d need, and kept in contact every step of the way. For works that turned out to be a whole-day job, they worked efficiently and I can’t believe how much they got done in that time, all to an amazing standard.\n\nI felt I was in very safe hands throughout the whole process, and I’m very glad to have had such an excellent team tackle the job while keeping me content and informed throughout.",
  },
  {
    author: "Richard Hand",
    rating: 5,
    text: "Amazing quality and attention to detail. No challenge too great.",
  },
  {
    author: "graeme ian kynman",
    rating: 5,
    // Ends with his own signature, "graeme kynman". It is part of what he published,
    // so it stays. Redundancy is not a licence to edit a customer's words.
    text: "I can testify that the joinery work rob produced for me was of an extremely high quality and would highly recommend him. If you have the chance to use him for a project you have do not hesitate because his quality work does not come along very often graeme kynman",
  },
  {
    author: "edris mahmud",
    rating: 5,
    // "us.Very" — the missing space is his. Correcting it would be an edit to a
    // named customer's published words. Leave it.
    text: "Carried out a fire door installation for us.Very fast and great installation done. Strongly recommend.",
  },
  {
    author: "Jean Putwain",
    rating: 5,
    text: "Dementia Care Home - replacement of Joists and Floor. Highly recommend Coulsy Joinery, excellent workmanship and professional company, cleaned up all debris. Would definitely use again. Thank you.",
  },
];

/** Total reviews. Derived — never hardcode this number anywhere. */
export const REVIEW_COUNT = REVIEWS.length;

/** Mean rating to one decimal place, e.g. "5.0". Derived — never hardcode it. */
export const AVERAGE_RATING = (
  REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
).toFixed(1);
