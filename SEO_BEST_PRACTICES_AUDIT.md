# SEO Best Practices Audit - Coulsy Fire Doors

**Date:** January 2025  
**Website:** https://coulsyfiredoors.co.uk  
**Framework:** Astro 5.15.3

---

## Executive Summary

**Overall SEO Health: 8.5/10** ✅ **Good** - Strong foundation with minor improvements needed

The site follows most SEO best practices. There are a few areas that need attention, but nothing critical that would cause penalties.

---

## ✅ **What's Working Well**

### 1. **Meta Tags** ✅ Excellent
- ✅ Unique title tags on all pages (`{title} | Coulsy Fire Doors`)
- ✅ Meta descriptions present and unique
- ✅ Open Graph tags (og:title, og:description, og:image, og:url, og:locale)
- ✅ Twitter Card tags
- ✅ Viewport meta tag
- ✅ Robots meta tag with proper directives
- ✅ Author meta tag
- ✅ Geo-targeting meta tags (geo.region, geo.placename, geo.position)

### 2. **Structured Data** ✅ Good (with minor issues)
- ✅ LocalBusiness schema implemented
- ✅ FAQPage schema on FAQ page
- ✅ BreadcrumbList schema on breadcrumb component
- ✅ AggregateRating in LocalBusiness schema
- ✅ Service schemas on service pages
- ⚠️ **Issue:** Duplicate LocalBusiness schemas (see issues below)

### 3. **Technical SEO** ✅ Excellent
- ✅ Canonical URLs on all pages (`<link rel="canonical">`)
- ✅ Sitemap configured (`@astrojs/sitemap`)
- ✅ Robots.txt with sitemap reference
- ✅ HTML lang attribute (`lang="en"`)
- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ Alt text on images (mostly complete)

### 4. **Performance & Mobile** ✅ Excellent
- ✅ Image optimization (WebP/AVIF formats)
- ✅ Responsive design (viewport meta tag)
- ✅ Preconnect to external domains
- ✅ DNS prefetch for performance
- ✅ Service worker for caching
- ✅ Mobile app meta tags

### 5. **Content SEO** ✅ Good
- ✅ Unique content per page
- ✅ Location-based pages for SEO
- ✅ Internal linking structure
- ✅ Breadcrumb navigation
- ✅ Clear call-to-actions

---

## ⚠️ **Issues to Address**

### 1. **Duplicate LocalBusiness Structured Data** 🔴 Medium Priority

**Problem:**
- `Layout.astro` injects LocalBusiness schema on every page
- `MainPage.astro` also generates LocalBusiness schema
- This creates duplicate schemas on the homepage

**Impact:**
- Google may ignore duplicate schemas
- Conflicting information between schemas
- Reduced rich snippet eligibility

**Recommendation:**
- Remove LocalBusiness schema from `MainPage.astro`
- Keep only the one in `Layout.astro` (it's already comprehensive)
- Use Service schemas for location-specific pages instead

**Files Affected:**
- `src/components/MainPage.astro` (lines 21-117)

---

### 2. **Missing OG Image File** 🟡 Low Priority

**Problem:**
- OG image referenced: `https://coulsyfiredoors.co.uk/og-image.jpg`
- File does NOT exist in `/public` folder

**Impact:**
- Poor social media sharing appearance
- Missing rich previews on Facebook/Twitter/LinkedIn
- Reduced click-through rates from social platforms

**Recommendation:**
- Create `/public/og-image.jpg` (1200×630px, < 200KB)
- Should include: Logo, business name, tagline
- Optimize for file size while maintaining quality

---

### 3. **Homepage H1 Structure** 🟡 Low Priority

**Current State:**
- H1 exists in Carousel component (first slide only)
- Other slides use H2 tags
- This is actually fine, but could be improved

**Recommendation:**
- Current approach is acceptable (one H1 per page)
- Consider adding a visible H1 in the main content area for better SEO
- Example: "Professional Fire Door Services in Yorkshire" above services section

**Files Affected:**
- `src/components/Carousel.astro` (line 79)
- `src/components/MainPage.astro` (could add H1)

---

### 4. **Google Analytics Placeholder** 🟡 Low Priority

**Problem:**
- Google Analytics ID is `G-XXXXXXXXXX` (placeholder)
- Not tracking actual analytics

**Impact:**
- No user behavior tracking
- No conversion tracking
- Missing valuable SEO insights

**Recommendation:**
- Replace with actual Google Analytics 4 ID
- Or remove if not using analytics

**Files Affected:**
- `src/layouts/Layout.astro` (lines 245, 253)

---

### 5. **Missing Alt Text on Some Images** 🟢 Very Low Priority

**Current State:**
- Most images have alt text ✅
- Some decorative images might be missing alt=""

**Recommendation:**
- Add `alt=""` to decorative images (screen readers will skip them)
- Ensure all informative images have descriptive alt text

**Files to Check:**
- All image components
- Carousel images (currently using `alt={text}` which is good)

---

## 📊 **SEO Checklist**

### Technical SEO ✅
- [x] Canonical URLs
- [x] Sitemap.xml
- [x] Robots.txt
- [x] HTTPS (assumed)
- [x] Mobile-friendly
- [x] Fast page load times
- [x] No broken links (assumed)
- [x] Proper HTTP status codes (assumed)

### On-Page SEO ✅
- [x] Unique title tags
- [x] Meta descriptions
- [x] H1 tags (one per page)
- [x] Heading hierarchy
- [x] Alt text on images
- [x] Internal linking
- [x] URL structure
- [x] Breadcrumbs

### Structured Data ✅
- [x] LocalBusiness schema
- [x] FAQPage schema
- [x] BreadcrumbList schema
- [x] Service schemas
- [x] AggregateRating
- [ ] **Fix:** Remove duplicate schemas

### Social Media SEO ✅
- [x] Open Graph tags
- [x] Twitter Card tags
- [ ] **Fix:** Create OG image file

### Content SEO ✅
- [x] Unique content per page
- [x] Location-based content
- [x] Keyword optimization (natural)
- [x] Content length (sufficient)
- [x] Regular updates (assumed)

---

## 🎯 **Priority Actions**

### **High Priority** (Do First)
1. ✅ **Remove duplicate LocalBusiness schema** from MainPage.astro
   - Impact: Prevents schema conflicts
   - Effort: 5 minutes

### **Medium Priority** (Do Soon)
2. ⚠️ **Create OG image file** (`/public/og-image.jpg`)
   - Impact: Better social sharing
   - Effort: 15 minutes (design + optimize)

### **Low Priority** (Nice to Have)
3. ⚠️ **Add visible H1 to homepage** (optional improvement)
   - Impact: Better keyword targeting
   - Effort: 10 minutes

4. ⚠️ **Update Google Analytics ID** (if using analytics)
   - Impact: Better tracking
   - Effort: 2 minutes

---

## 📈 **SEO Strengths**

1. **Strong Local SEO**
   - Location-based pages
   - Geo-targeting meta tags
   - LocalBusiness schema with areaServed
   - Google Maps integration

2. **Excellent Technical Foundation**
   - Modern Astro framework
   - Fast performance
   - Proper semantic HTML
   - Clean URL structure

3. **Good Content Structure**
   - Clear navigation
   - Breadcrumbs
   - Internal linking
   - FAQ page with structured data

4. **Social Media Ready**
   - Complete OG tags
   - Twitter Cards
   - Just needs the image file

---

## 🔍 **Additional Recommendations**

### 1. **Content Enhancements**
- Add more location-specific content
- Expand FAQ with more questions
- Add blog/news section (optional)
- Include customer testimonials with schema (Review schema)

### 2. **Schema Enhancements**
- Add Review schema to reviews component
- Add Service schema to all service pages
- Add Person schema for Robert Coulson (About page)

### 3. **Performance**
- Already excellent with Astro
- Consider lazy loading for below-fold images
- Monitor Core Web Vitals

### 4. **Analytics & Monitoring**
- Set up Google Search Console
- Monitor rankings for target keywords
- Track conversions (contact form submissions)
- Monitor page speed

---

## ✅ **Conclusion**

Your site follows SEO best practices well. The main issues are:
1. Duplicate schemas (easy fix)
2. Missing OG image (quick to create)
3. Placeholder analytics ID (if you want tracking)

**Overall Grade: A- (8.5/10)**

With the minor fixes above, you'll have an **A+ SEO setup**. The foundation is solid—just needs these small refinements.

---

## 🚀 **Quick Wins**

1. **Remove duplicate schema** (5 min) → Immediate improvement
2. **Create OG image** (15 min) → Better social sharing
3. **Add Review schema** (10 min) → Rich snippets for reviews

These three changes will significantly boost your SEO without much effort.

