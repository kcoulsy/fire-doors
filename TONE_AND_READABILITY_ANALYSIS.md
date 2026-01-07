# Forensic Analysis: Tone & Readability Improvements for Small Business Personal Touch

**Date:** January 2025  
**Purpose:** Identify opportunities to make content more personal, readable, and human-focused for a small family-run business

---

## Executive Summary

After reviewing all content files, I've identified significant opportunities to inject more personal voice, improve readability, and create a stronger connection with visitors. The current content is professional but leans corporate—we can make it feel like you're talking directly to customers, not a faceless company.

---

## Key Findings

### 1. **Third-Person vs First-Person Voice**

**Current State:**
- Heavy use of "we", "our", "the company"
- Corporate language: "Coulsy Fire Door Services provides..."
- Impersonal: "Our qualified team..."

**Recommendation:**
- Shift to first-person where appropriate: "I", "my", "I've"
- Personal ownership: "I've fitted thousands of doors..."
- Direct address: "When you work with me..."

**Files Affected:**
- `src/components/MainServices.astro` - "We offer", "Our qualified team"
- `src/components/WhyFireDoors.astro` - "At Coulsy Fire Door Services, we're committed"
- `src/components/CommonFaults.astro` - "Our qualified fire door inspectors"
- `src/pages/about.astro` - Mix of "I" and "we" (inconsistent)
- `src/pages/contact.astro` - "We always look forward"

---

### 2. **Overly Formal Language**

**Current Examples:**

**From `MainServices.astro`:**
```
"Our qualified team is ready to help you maintain the highest standards of fire safety."
```

**Better:**
```
"I'm here to help you keep your fire doors safe and compliant. With 35 years' experience, I've seen what works and what doesn't."
```

**From `WhyFireDoors.astro`:**
```
"At Coulsy Fire Door Services, we're committed to ensuring your fire safety compliance—executed with care, precision, and attention to detail."
```

**Better:**
```
"I take fire safety seriously—it's why I became FireQual certified. When I inspect your doors, I'm checking everything properly because I've seen what happens when corners are cut."
```

---

### 3. **Missing Personal Story Elements**

**Current State:**
- About page has good timeline but could be more conversational
- Missing the "why" behind the business
- Doesn't explain the transition from general joinery to fire door specialisation

**Opportunities:**

**In `about.astro` timeline section:**
- Add more personal motivation: "After seeing appalling workmanship..." (already there but could be expanded)
- Explain the decision to specialise: "I decided to focus on fire doors because..."
- Add personal touches: "When I'm not on site, I'm..."

**In `WhyFireDoors.astro`:**
- Add personal experience: "In my 35 years, I've seen fires where properly fitted doors saved lives..."
- Real examples: "I once inspected a building where..."

---

### 4. **Contact Page Tone**

**Current (`contact.astro`):**
```
"We always look forward to hearing from you and being able to assist where we can."
```

**Better:**
```
"I'm always happy to chat about your fire door needs. Whether it's a quick question or a full inspection, give me a call—I'll answer honestly and help where I can."
```

---

### 5. **Service Descriptions - Too Generic**

**Current (`MainServices.astro`):**
```
"Proactive maintenance and timely repairs to keep your fire doors in optimal condition and compliant with regulations."
```

**Better:**
```
"I'll check your doors properly—measuring gaps, testing closers, checking seals. Most issues are small and easy to fix if caught early. I'll tell you exactly what needs doing and why."
```

---

### 6. **Code Readability Issues**

**Structural Issues:**

1. **Long Component Files**
   - `about.astro` - 1195 lines (should be broken into smaller components)
   - `Carousel.astro` - 450 lines (script could be external)

2. **Inconsistent Naming**
   - Mix of `service-card`, `fault-card`, `why-card` (should be consistent)
   - Some components use `group` class, others don't

3. **Repeated Patterns**
   - Service cards repeated with similar structure (could be componentised)
   - Timeline items repeated (could be data-driven)

---

## Specific File-by-File Recommendations

### `src/components/MainServices.astro`

**Current Tone:**
- Corporate, third-person
- Generic service descriptions
- "Our qualified team"

**Changes Needed:**
1. Change "We offer" → "I provide"
2. Add personal touches: "I've fitted thousands of doors over the years..."
3. Use "I" instead of "we" throughout
4. Add specific examples: "Last month I helped a landlord in York..."

**Example Rewrite:**
```astro
<h2 class="text-3xl font-bold sm:text-4xl md:text-5xl text-brand mb-6">
  Fire Door Services I Provide
</h2>
<p class="mx-auto max-w-3xl text-gray-600 text-lg leading-relaxed">
  After 35 years in joinery and becoming FireQual certified, I specialise in fire door work. Whether you need an inspection, installation, or maintenance, I'll do it properly—no shortcuts, no guesswork.
</p>
```

---

### `src/components/WhyFireDoors.astro`

**Current Issues:**
- Corporate quote box
- "At Coulsy Fire Door Services, we're committed..."
- Lacks personal connection

**Changes Needed:**
1. Replace corporate quote with personal statement
2. Add personal experience: "In my time, I've seen..."
3. Use "I" instead of "we"
4. Add real-world context

**Example Rewrite:**
```astro
<div class="bg-gradient-to-r from-brand-50 to-brand-100 border-l-4 border-brand-500 p-6 rounded-r-xl shadow-lg">
  <p class="text-brand-800 font-semibold italic text-lg leading-relaxed">
    After seeing poor workmanship in the fire door industry, I decided to specialise and get properly qualified. When I inspect your doors, I'm checking everything because I know what's at stake—people's lives depend on these doors working properly.
  </p>
</div>
```

---

### `src/components/CommonFaults.astro`

**Current:**
```
"Don't wait until it's too late. Our qualified fire door inspectors can identify these issues..."
```

**Better:**
```
"Don't wait until it's too late. I can spot these issues quickly—I've seen them all before. Most are easy fixes if caught early, but they can become expensive problems if left."
```

---

### `src/pages/about.astro`

**Current State:**
- Good personal timeline
- Mix of "I" and "we" (inconsistent)
- Some sections still corporate

**Changes Needed:**
1. Standardise on "I" throughout (except team section)
2. Add more personal motivation in timeline
3. Expand the "why I specialise" story
4. Add conversational touches

**Example Timeline Enhancement:**
```astro
<div class="timeline-content">
  <h3 class="text-2xl font-bold text-brand-900 mb-2">
    December 2024 - FireQual Certification
  </h3>
  <p class="text-brand-600 leading-relaxed">
    After seeing appalling workmanship in the fire door industry—doors fitted wrong, seals missing, gaps too big—I decided to specialise properly. I passed all the FireQual exams because I wanted to be the person who does it right. Now when I inspect a door, I'm checking everything properly, not rushing through like some do.
  </p>
</div>
```

---

### `src/pages/contact.astro`

**Current:**
```
"We always look forward to hearing from you and being able to assist where we can."
```

**Better:**
```
"I'm always happy to chat about your fire door needs. Whether it's a quick question or you need a full inspection, give me a call on 07544 030486. I'll give you honest advice and help where I can—no hard sell, just straight talking."
```

---

### `src/components/Carousel.astro`

**Current Slides:**
- Generic: "Safety First - Professional Compliance"
- Corporate tone

**Better:**
- "Properly Inspected - I Check Everything"
- "Repairs Done Right - No Shortcuts"
- "Fitted Properly - 35 Years' Experience"

---

## Code Structure Improvements

### 1. **Componentise Repeated Patterns**

**Create:**
- `ServiceCard.astro` - Reusable service card component
- `TimelineItem.astro` - Timeline entry component
- `FaultCard.astro` - Common fault card component

**Benefits:**
- Easier to maintain
- Consistent styling
- Better readability

---

### 2. **Extract Long Scripts**

**Move from `Carousel.astro`:**
- Extract carousel script to `src/scripts/carousel.js`
- Import and use in component

**Benefits:**
- Cleaner component files
- Better code organisation
- Easier to test

---

### 3. **Data-Driven Content**

**Current:**
- Services hardcoded in components
- Timeline items hardcoded

**Better:**
- Create `src/data/services.ts`
- Create `src/data/timeline.ts`
- Import and map in components

**Benefits:**
- Easier content updates
- Better separation of concerns
- More maintainable

---

## Readability Score Improvements

### Current Readability Issues:

1. **Sentence Length**
   - Many sentences 20+ words
   - Complex clauses
   - Technical jargon without explanation

2. **Paragraph Structure**
   - Long paragraphs (5+ sentences)
   - Dense blocks of text
   - Missing white space

3. **Word Choice**
   - Corporate: "utilise", "facilitate", "ensure"
   - Better: "use", "help", "make sure"

---

## Implementation Priority

### **High Priority (Do First):**
1. ✅ Change "we/our" to "I/my" in key components
2. ✅ Rewrite contact page intro
3. ✅ Personalise service descriptions
4. ✅ Add personal touches to About timeline

### **Medium Priority:**
1. Componentise repeated patterns
2. Extract long scripts
3. Improve sentence structure

### **Low Priority:**
1. Data-driven content structure
2. Advanced code refactoring

---

## Example: Before & After

### **Before (Current):**
```astro
<h2>Our Fire Door Services</h2>
<p>We offer a comprehensive range of fire door services and solutions to ensure your fire doors are compliant and safe. From inspections to installation and maintenance, we've got you covered.</p>
```

### **After (Improved):**
```astro
<h2>Fire Door Services I Provide</h2>
<p>After 35 years in joinery and becoming FireQual certified, I specialise in fire door work. Whether you need an inspection, installation, or maintenance, I'll do it properly—no shortcuts, no guesswork. I've fitted thousands of doors over the years, so I know what works and what doesn't.</p>
```

---

## Next Steps

1. **Review this analysis** with focus on tone preferences
2. **Prioritise changes** based on business goals
3. **Implement gradually** - start with high-traffic pages
4. **Test with real users** - get feedback on readability
5. **Iterate** - refine based on what resonates

---

## Notes

- Keep SEO keywords but make them natural
- Maintain professionalism while being personal
- British English spelling throughout
- First-person works best for small businesses
- Personal stories build trust better than corporate speak

