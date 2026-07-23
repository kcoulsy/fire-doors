> # ⚠️ SUPERSEDED — DO NOT USE
>
> Archived 23 July 2026. **The authoritative pricing policy is [`PRICING_POLICY.md`](../../PRICING_POLICY.md).**
>
> This document contradicts current policy and contains factual errors:
>
> - it recommends *"include travel in base price within service radius"* — the
>   **direct opposite** of the adopted policy, under which travel and mobilisation
>   are quoted as a separate line;
> - it counts the site as 224 pages / 56 locations (actually 216 location pages
>   from 54 locations);
> - it states that no pricing is displayed anywhere, which ceased to be true once
>   the £50 survey fee was published.
>
> Retained for history only.

---

# Forensic Pricing Strategy Analysis - Fire Door Services

## Executive Summary

After conducting a comprehensive forensic analysis of all pricing-related content across base pages, location-based pages, FAQ sections, and service components, here's my assessment of whether to display survey/inspection pricing.

## Site Structure Analysis

### Navigation Structure (Services Dropdown)
The Services dropdown in the topbar contains:
1. **Fire Door Installation** → `/fire-door-installers` → `FireDoorInstallersPage.astro`
2. **Fire Door Maintenance** → `/fire-door-maintenance` → `FireDoorMaintenancePage.astro`
3. **Fire Door Inspections** → `/fire-door-inspectors` → `FireDoorInspectorsPage.astro`
4. **All Services** → `/fire-door-services` → `FireDoorServicesPage.astro`

### Base Pages (4 Service Types)
All base service pages follow the same component pattern:
1. `/fire-door-services` → `FireDoorServicesPage.astro` (Overview/All Services)
2. `/fire-door-inspectors` → `FireDoorInspectorsPage.astro` (Inspections)
3. `/fire-door-installers` → `FireDoorInstallersPage.astro` (Installation)
4. `/fire-door-maintenance` → `FireDoorMaintenancePage.astro` (Maintenance)

### Location-Based Pages (224 pages total)
- Generated via `[...slug].astro` dynamic routing
- Format: `/{location}-{service-type}` (e.g., `/york-fire-door-inspectors`)
- 56 locations × 4 service types = 224 location-specific pages
- All use the same base components with location props
- All share identical pricing messaging (no location-specific pricing)

### FAQ Page
- Standalone `/faq` page with comprehensive pricing section
- FAQ structured data also embedded in location-based pages via `pageMeta.ts`

## Current Pricing Messaging (Forensic Breakdown)

### 1. FAQ Page (`/faq.astro`)

**Pricing Category Questions:**
- **"Do you provide quotes?"** → "Yes, we provide detailed quotes for all our services. We'll assess your requirements and provide a comprehensive quote including all necessary work, materials, and compliance certification."
- **"Are your quotes free?"** → "We provide competitive quotes for all fire door services. Contact us to discuss your requirements and we'll provide a detailed quote tailored to your specific needs." ⚠️ **VAGUE - doesn't explicitly state if quotes are free or chargeable**
- **Installation costs** → "vary depending on the type of door, frame requirements, hardware needed, and project complexity. We provide detailed quotes after assessing your specific requirements."
- **Maintenance costs** → "depend on the number of doors and their condition. We offer competitive rates and can provide maintenance contracts for regular servicing."

**No explicit pricing for inspections/surveys mentioned.**

### 2. Inspectors Page (`FireDoorInspectorsPage.astro`)

**Service Types Listed:**
- Initial Inspections
- Regular Inspections (6-monthly)
- Compliance Inspections
- **Pre-Purchase Inspections** → Lists "Cost estimation" as a bullet point, but no actual pricing
- Emergency Inspections
- Certification Inspections

**CTA:** "Book Inspection" (no pricing mentioned)

### 3. Structured Data (FAQ Schema)

**Location-based FAQ Schema** (via `pageMeta.ts`):
- Question: "How much does [service] cost [in location]?"
- Answer: "Our [service] costs vary depending on the project scope and requirements. I provide detailed quotes for all work [in location] after assessing your specific fire door needs and compliance requirements."

**No specific survey/inspection pricing.**

### 4. Service Pages (All Types)

**FireDoorServicesPage (All Services Overview):**
- CTA: "Get Services Quote"
- Section: "Get Your Fire Door Services Quote"
- No pricing mentioned
- Overview of all service types (inspections, installation, maintenance, compliance, emergency, consultancy)

**FireDoorInstallersPage (Installation):**
- CTA: "Get Installation Quote"
- Section: "Get Your Fire Door Installation Quote"
- Mentions: "Site Survey & Planning" (no pricing for survey)
- Mentions: "maintenance costs" (as benefit of proper installation)
- No explicit pricing displayed

**FireDoorMaintenancePage (Maintenance):**
- CTA: "Get Maintenance Quote"
- Section: "Get Your Fire Door Maintenance Quote"
- Mentions: "Cost Prevention" (as benefit)
- Mentions: "costly failures" (as risk of not maintaining)
- Mentions: "Cost-effective pricing" (as bullet point under maintenance contracts)
- No explicit pricing displayed

**FireDoorInspectorsPage (Inspections):**
- CTA: "Book Inspection"
- Section: "Book Your Fire Door Inspection"
- Mentions: "Pre-Purchase Inspections" with "Cost estimation" bullet point
- No explicit pricing displayed

**Common Pattern Across All Service Pages:**
- All use "Contact for Quote" / "Get Quote" CTAs
- No explicit pricing displayed on any page
- All mention "competitive rates" or "competitive quotes" in structured data
- Emphasis on custom assessment before pricing
- All use same component structure (inherited to 224 location pages)

## Current Pricing Strategy: **Quote-Based Model**

**Pattern Identified:**
- ✅ No upfront pricing displayed
- ✅ "Contact for quote" approach
- ✅ Emphasis on custom assessment
- ⚠️ Unclear if quotes/surveys are chargeable
- ⚠️ No pricing transparency for surveys/inspections specifically

## Industry Best Practices Analysis

### For Trade Services (Fire Safety):

**Arguments FOR showing survey pricing:**
1. **Transparency builds trust** - Especially in fire safety where compliance is critical
2. **Reduces friction** - Customers know what to expect before contacting
3. **Qualifies leads** - Filters out price shoppers vs. serious buyers
4. **Competitive advantage** - Many competitors hide pricing; showing it can differentiate
5. **SEO benefits** - Pricing pages often rank well for "fire door inspection cost [location]" queries
6. **Reduces "surprise" charges** - Prevents awkward conversations about survey fees

**Arguments AGAINST showing survey pricing:**
1. **Complexity varies** - Single door vs. multi-door commercial property is vastly different
2. **Location factors** - Travel distance/time affects cost
3. **Flexibility** - Can adjust pricing based on customer relationship, project size
4. **Competitive pressure** - Competitors may undercut if they see your rates
5. **Price anchoring** - May set expectations too high/low before seeing the job

### For Surveys/Inspections Specifically:

**Industry Norm:**
- Most fire door inspection services use "quote on request" model
- Some show "starting from £X" or "from £X per door"
- Pre-purchase surveys often have clearer pricing (e.g., "Pre-purchase inspection: £150-£300")
- Regular maintenance contracts often have clearer pricing

## Recommendation: **Hybrid Approach** ✅

### What to Display:

1. **Survey/Inspection Pricing Ranges** (Recommended)
   - Show starting prices or ranges for different inspection types
   - Example: "Pre-purchase inspections: from £150"
   - Example: "Standard inspection: from £X per door (minimum charge applies)"
   - Add disclaimer: "Final pricing depends on property size, location, and specific requirements"

2. **Clear Quote Process**
   - Make it clear if initial consultation/survey is chargeable
   - If surveys are free, state it explicitly
   - If surveys are chargeable, show the fee clearly

3. **Location-Specific Pricing** (Optional Enhancement)
   - Consider showing "Base price + travel" if travel costs vary significantly
   - Or include travel in base price within service radius

### Where to Display:

**Primary Locations:**
1. **Inspectors Page** (`FireDoorInspectorsPage.astro`) ⭐ **HIGHEST PRIORITY**
   - Add pricing section after "Our Fire Door Inspection Services"
   - Include pricing for each inspection type (Standard, Pre-Purchase, Compliance, Emergency, etc.)
   - This is the main page for survey/inspection services

2. **Services Overview Page** (`FireDoorServicesPage.astro`) ⭐ **MEDIUM PRIORITY**
   - Add pricing section or pricing callout in the services overview cards
   - Could add "Starting from £X" to each service type card
   - Users may check here first before going to specific service pages

3. **FAQ Page** (`/faq.astro`) ⭐ **HIGH PRIORITY**
   - Add specific question: "How much does a fire door inspection cost?"
   - Include pricing ranges
   - Clarify if quotes/surveys are chargeable
   - Add similar questions for installation and maintenance

4. **Installation & Maintenance Pages** (Optional)
   - Could add "Site Survey" pricing to Installers page
   - Could add maintenance contract pricing to Maintenance page
   - Lower priority than inspections

5. **Location-Based Pages** (via component updates)
   - Automatically inherit pricing from base component
   - All 224 location pages will show pricing once components are updated
   - Consider adding location-specific travel surcharges if applicable

6. **Structured Data** (SEO)
   - Update FAQ schema in `pageMeta.ts` to include specific pricing ranges
   - Consider adding `Offer` schema with pricing
   - Update all location-based FAQ schemas automatically

### Implementation Strategy:

**Phase 1: Clarity (High Priority)**
- Fix vague FAQ answer about "free quotes"
- Clearly state if surveys are chargeable
- Add pricing section to Inspectors page

**Phase 2: Transparency (Medium Priority)**
- Add pricing ranges for inspection types
- Update FAQ with specific pricing questions
- Update structured data

**Phase 3: Optimization (Future)**
- A/B test pricing display vs. quote-only
- Consider location-specific pricing display
- Monitor conversion rates

## SEO Considerations

### Current State:
- FAQ schema asks "How much does [service] cost?" but gives vague answer
- No pricing keywords in content (e.g., "fire door inspection cost Yorkshire")
- Missing opportunity for "cost per door" type queries

### SEO Benefits of Showing Pricing:
1. **Rank for cost queries** - "fire door inspection cost [location]"
2. **Featured snippets** - Pricing tables often appear in featured snippets
3. **Local SEO** - "fire door inspection cost York" queries
4. **FAQ schema** - More specific answers perform better

### Recommended Keywords to Target:
- "fire door inspection cost"
- "fire door survey price"
- "fire door inspection cost per door"
- "[location] fire door inspection price"
- "pre-purchase fire door inspection cost"

## Risk Assessment

### Risks of NOT Showing Pricing:
- ❌ Losing leads who want price transparency
- ❌ Wasting time on unqualified leads
- ❌ Appearing less transparent than competitors
- ❌ Missing SEO opportunities for cost queries
- ❌ Potential customer frustration with "surprise" fees

### Risks of Showing Pricing:
- ⚠️ Competitors may undercut (mitigate with value messaging)
- ⚠️ Price anchoring too high/low (mitigate with ranges)
- ⚠️ Complex jobs may need custom pricing anyway (mitigate with disclaimers)

## Final Recommendation

**YES, show survey/inspection pricing** with the following approach:

1. **Display pricing ranges** for different inspection types
2. **Be transparent** about what's included
3. **Use disclaimers** for complex jobs requiring custom quotes
4. **Clarify quote process** - explicitly state if surveys are chargeable
5. **Update all relevant pages** - base pages and location pages (via components)
6. **Optimise for SEO** - include pricing in FAQ schema and content

**Suggested Pricing Display Format:**

```
Fire Door Inspection Pricing

• Standard Inspection: From £X per door (minimum charge: £X)
• Pre-Purchase Inspection: From £150-£300 (single property)
• Compliance Inspection: From £X per door
• Emergency Inspection: From £X (callout fee included)
• Regular Maintenance Contracts: From £X per year (6-monthly inspections)

*Final pricing depends on property size, location, accessibility, and specific requirements. Contact us for a detailed quote tailored to your needs.
```

This approach provides transparency while maintaining flexibility for complex jobs.

