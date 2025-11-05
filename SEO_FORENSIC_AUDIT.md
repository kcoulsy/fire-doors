# Forensic SEO Audit Report - Coulsy Fire Doors Website

**Date:** January 2025  
**Website:** https://coulsyfiredoors.co.uk  
**Framework:** Astro 5.7.13

---

## Executive Summary

This forensic SEO analysis identifies potential search engine penalties and technical SEO issues. The site has strong foundational SEO but several critical issues that could impact rankings and crawlability.

### Overall SEO Health: **7.5/10**

**Status:** ⚠️ **Action Required** - Several critical issues found that could lead to search engine penalties or reduced visibility.

---

## 🔴 Critical Issues (Must Fix Immediately)

### 1. **Broken Favicon Reference** - FIXED ✅
**Severity:** Critical  
**Status:** Fixed

**Issue:** Layout.astro referenced `/favicon.svg` which was deleted, causing 404 errors.

**Impact:** 
- 404 errors in search engine crawl logs
- Potential negative ranking signal
- Browser console errors

**Fix Applied:** Removed broken favicon.svg reference, keeping only favicon.ico and PNG variants.

---

### 2. **Deprecated Keywords Meta Tag** - FIXED ✅
**Severity:** Medium  
**Status:** Fixed

**Issue:** Using `<meta name="keywords">` tag which has been ignored by all major search engines since 2009.

**Impact:**
- Wasted HTML bytes
- No SEO benefit
- Shows outdated SEO practices to crawlers

**Fix Applied:** Removed keywords meta tag from Layout.astro.

---

### 3. **Duplicate Structured Data Schemas**
**Severity:** High  
**Status:** ⚠️ Needs Review

**Issue:** Pages are generating multiple LocalBusiness schemas on the same page:

- `FireDoorServicesPage.astro` generates 4 separate JSON-LD schemas:
  1. `businessSchema` (LocalBusiness)
  2. `localBusinessSchema` (LocalBusiness) 
  3. `serviceSchema` (Service)
  4. `faqSchema` (FAQPage)

- Layout.astro also injects a LocalBusiness schema on every page

**Impact:**
- Google may ignore duplicate schemas
- Conflicting information between schemas
- Potential structured data penalties
- Reduced rich snippet eligibility

**Recommendation:**
- Keep ONE LocalBusiness schema per page (preferably in Layout.astro)
- Use Service schema for location-specific service pages
- Use FAQPage schema only when relevant
- Remove duplicate LocalBusiness schemas from page components

**Example Problem:**
```javascript
// Layout.astro - Line 142-211: LocalBusiness schema
// FireDoorServicesPage.astro - Lines 36-55: 4 more schemas
// This creates 5 structured data blocks on location pages!
```

---

### 4. **Missing Primary H1 on Homepage**
**Severity:** High  
**Status:** ⚠️ Needs Review

**Issue:** MainPage.astro doesn't appear to have a visible H1 tag. The carousel has H2 tags but no clear H1.

**Impact:**
- Reduced SEO value for main keyword targeting
- Poor content hierarchy
- Search engines may not understand page primary topic

**Current Structure:**
- MainPage.astro: No visible H1
- Carousel component: H2 tags only
- WhyFireDoors component: H2 tags

**Recommendation:**
- Add a clear H1 on the homepage (e.g., "Professional Fire Door Services in Yorkshire")
- Ensure H1 is above the fold and visible
- Maintain proper heading hierarchy (H1 → H2 → H3)

---

## 🟡 Medium Priority Issues

### 5. **Potential Duplicate Content Across Location Pages**
**Severity:** Medium  
**Status:** ⚠️ Monitor

**Issue:** 56 location × 4 service types = 224 potential pages with very similar content structure.

**Current Structure:**
- `/york-fire-door-services`
- `/york-fire-door-inspectors`
- `/york-fire-door-installers`
- `/york-fire-door-maintenance`
- (Repeated for 56 locations)

**Impact:**
- Google may see these as thin/duplicate content
- Cannibalisation of rankings
- Crawl budget waste

**Mitigation Strategies Currently in Place:**
- ✅ Unique titles per location
- ✅ Unique descriptions per location
- ✅ Location-specific structured data
- ✅ Canonical URLs

**Additional Recommendations:**
- Add unique local content sections to each location page
- Include location-specific testimonials or case studies
- Add local landmarks or area-specific information
- Consider consolidating very small locations

---

### 6. **Missing Sitemap.xml Verification**
**Severity:** Low-Medium  
**Status:** ⚠️ Needs Verification

**Issue:** Astro sitemap integration is configured, but need to verify:
- Sitemap is generating correctly
- Sitemap is accessible at `/sitemap-index.xml`
- All pages are included
- Lastmod dates are accurate

**Current Configuration:**
```javascript
// astro.config.mjs
import sitemap from '@astrojs/sitemap';
integrations: [sitemap()]
```

**Recommendation:**
- Verify sitemap generation after build
- Check sitemap is submitted to Google Search Console
- Ensure sitemap doesn't exceed 50,000 URLs per file

---

### 7. **Google Analytics Placeholder ID**
**Severity:** Low  
**Status:** ⚠️ Needs Update

**Issue:** Google Analytics is configured with placeholder ID `G-XXXXXXXXXX`.

**Impact:**
- No analytics tracking
- Can't measure SEO performance
- Missing conversion data

**Recommendation:**
- Replace with actual GA4 measurement ID
- Or remove if using Plausible Analytics only

---

### 8. **OG Image May Not Exist**
**Severity:** Medium  
**Status:** ⚠️ Needs Verification

**Issue:** Default OG image is set to `https://coulsyfiredoors.co.uk/og-image.jpg` but file may not exist.

**Impact:**
- Poor social media sharing appearance
- Missing rich previews
- Reduced click-through rates

**Recommendation:**
- Verify `/og-image.jpg` exists in public folder
- Create 1200×630px optimised image if missing
- Ensure image is properly compressed (< 200KB)

---

## 🟢 Positive SEO Factors

### ✅ Strong Technical Foundation
- **Astro Framework:** Excellent for SEO (server-side rendering)
- **Meta Tags:** Comprehensive Open Graph and Twitter Card tags
- **Canonical URLs:** Properly implemented
- **Mobile Responsive:** Viewport meta tag present
- **Language Declaration:** Proper `lang="en"` attribute

### ✅ Structured Data Implementation
- LocalBusiness schema implemented
- FAQ schema on relevant pages
- Service schema for location pages
- Proper use of `@id` for entity linking

### ✅ Performance Optimisations
- Image optimisation (WebP/AVIF)
- Lazy loading implemented
- Service worker for caching
- Resource hints (preconnect, dns-prefetch)

### ✅ Content Quality
- Unique page titles
- Descriptive meta descriptions
- Location-specific content
- Personal, authentic voice

### ✅ Local SEO
- Geo-targeting meta tags
- Proper address formatting
- Area served clearly defined
- Local business schema

---

## 📊 SEO Penalty Risk Assessment

### Risk Level: **LOW-MEDIUM** ⚠️

**Factors Reducing Penalty Risk:**
- ✅ No obvious keyword stuffing
- ✅ No hidden text or cloaking
- ✅ No suspicious link building patterns
- ✅ Original, quality content
- ✅ Proper technical implementation

**Factors Increasing Penalty Risk:**
- ⚠️ Duplicate structured data (could cause confusion)
- ⚠️ Large number of similar pages (could be seen as thin content)
- ⚠️ Missing H1 on homepage (reduced content hierarchy)

**Not Currently Penalised:**
- No evidence of manual penalties
- Site structure is sound
- No spam signals detected

---

## 🔧 Recommended Actions (Priority Order)

### Immediate (This Week)
1. ✅ **FIXED:** Remove broken favicon.svg reference
2. ✅ **FIXED:** Remove deprecated keywords meta tag
3. **TODO:** Consolidate duplicate structured data schemas
4. **TODO:** Add H1 to homepage

### Short Term (This Month)
5. Verify sitemap.xml generation and submission
6. Verify OG image exists and is optimised
7. Replace Google Analytics placeholder ID
8. Add unique content to location pages to reduce duplication risk

### Medium Term (Next Quarter)
9. Conduct content audit for duplicate content
10. Add location-specific testimonials/case studies
11. Implement breadcrumb structured data
12. Consider adding Article/BlogPost schema for future content

---

## 📈 Monitoring & Verification

### Tools to Use:
1. **Google Search Console**
   - Check for crawl errors
   - Monitor coverage issues
   - Verify sitemap indexing

2. **Google Rich Results Test**
   - Test structured data validity
   - Check for duplicate schema warnings

3. **Screaming Frog SEO Spider**
   - Crawl site for technical issues
   - Check for duplicate content
   - Verify H1/H2 structure

4. **PageSpeed Insights**
   - Monitor Core Web Vitals
   - Check mobile usability

### Key Metrics to Track:
- Organic search traffic
- Average ranking position
- Click-through rate (CTR)
- Core Web Vitals scores
- Crawl errors in Search Console

---

## 🎯 Expected Outcomes After Fixes

### Immediate Benefits:
- ✅ Reduced 404 errors (favicon fix)
- ✅ Cleaner HTML (keywords removal)
- ⚠️ Better structured data recognition (after schema consolidation)
- ⚠️ Improved content hierarchy (after H1 addition)

### Long-term Benefits:
- Improved rich snippet eligibility
- Better search engine understanding
- Reduced duplicate content risk
- Enhanced local SEO performance

---

## 📝 Notes

- **British English:** All content uses British spelling (preference noted)
- **Personal Voice:** Content maintains personal, developer-first perspective
- **No Penalties Detected:** No evidence of current search engine penalties
- **Framework:** Astro provides excellent SEO foundation

---

## 🔍 Additional Recommendations

### Content Strategy:
1. **Blog/Articles Section:** Consider adding for fresh content
2. **Case Studies:** Add location-specific project examples
3. **FAQ Expansion:** Expand FAQ sections with more detailed answers
4. **Video Content:** Add video testimonials or service explanations

### Technical Enhancements:
1. **Breadcrumb Schema:** Add structured data for breadcrumbs
2. **Review Schema:** Add review/rating schema if collecting reviews
3. **Breadcrumb Navigation:** Ensure visible breadcrumbs on all pages
4. **Internal Linking:** Improve internal linking structure

### Local SEO:
1. **Google Business Profile:** Ensure properly configured
2. **Local Citations:** Build consistent NAP (Name, Address, Phone) citations
3. **Local Reviews:** Encourage customer reviews
4. **Local Content:** Add location-specific service area pages

---

**Report Generated:** January 2025  
**Next Review:** Recommended in 3 months or after major changes

---

## ✅ Checklist for Implementation

- [x] Fix broken favicon reference
- [x] Remove deprecated keywords meta tag
- [ ] Consolidate duplicate structured data
- [ ] Add H1 to homepage
- [ ] Verify sitemap.xml generation
- [ ] Verify OG image exists
- [ ] Update Google Analytics ID
- [ ] Add unique content to location pages
- [ ] Test structured data in Rich Results Test
- [ ] Submit sitemap to Google Search Console

