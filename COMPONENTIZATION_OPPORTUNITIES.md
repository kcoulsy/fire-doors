# Componentization Opportunities Analysis

## Executive Summary

After forensic analysis of the codebase, I've identified **6 major componentization opportunities** that would:
- Reduce code duplication by ~60%
- Improve maintainability across 224 location pages
- Ensure consistent styling
- Make updates easier (change once, update everywhere)

---

## 🔴 High Priority Components (Create These First)

### 1. **ServiceCard Component** ⭐⭐⭐
**Current State:** Duplicated 18+ times across service pages

**Where Used:**
- `FireDoorInstallersPage.astro` - 6 service cards
- `FireDoorMaintenancePage.astro` - 6 service cards  
- `FireDoorInspectorsPage.astro` - 6 service cards
- `FireDoorServicesPage.astro` - 6 service cards

**Pattern:**
```astro
<div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
  <div class="w-12 h-12 bg-{color}-100 rounded-lg flex items-center justify-center mb-4">
    <svg class="w-6 h-6 text-{color}-600">...</svg>
  </div>
  <h3 class="text-xl font-semibold text-brand-900 mb-3">{Title}</h3>
  <p class="text-gray-600 mb-4">{Description}</p>
  <ul class="text-sm text-gray-600 space-y-1">
    <li>• {Item}</li>
  </ul>
</div>
```

**Proposed Component:**
```astro
<ServiceCard
  icon={svgPath}
  iconColor="blue" // blue, green, purple, orange, red, indigo
  title="Supply & Installation"
  description="Complete supply and professional installation..."
  features={["Fire door supply", "Professional installation", ...]}
/>
```

**Impact:** 
- 18+ instances → 1 component
- Used on all 224 location pages
- Easy to update styling globally

---

### 2. **FeatureCard Component** ⭐⭐⭐
**Current State:** Duplicated 16+ times across "Why" sections

**Where Used:**
- `FireDoorInstallersPage.astro` - 4 feature cards
- `FireDoorMaintenancePage.astro` - 4 feature cards
- `FireDoorInspectorsPage.astro` - 4 feature cards
- `FireDoorServicesPage.astro` - 4 feature cards

**Pattern:**
```astro
<div class="bg-gray-50 p-6 rounded-lg">
  <h3 class="text-xl font-semibold text-brand-900 mb-4">{Title}</h3>
  <p class="text-gray-600">{Description}</p>
</div>
```

**Proposed Component:**
```astro
<FeatureCard
  title="Safety & Compliance"
  description="Incorrect installation can compromise..."
/>
```

**Impact:**
- 16+ instances → 1 component
- Consistent styling across all pages

---

### 3. **ProcessStep Component** ⭐⭐
**Current State:** Duplicated 16+ times across process sections

**Where Used:**
- `FireDoorInstallersPage.astro` - 4 steps
- `FireDoorMaintenancePage.astro` - 4 steps
- `FireDoorInspectorsPage.astro` - 4 steps
- `FireDoorServicesPage.astro` - 4 steps

**Pattern:**
```astro
<div class="flex items-start space-x-4">
  <div class="flex-shrink-0 w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-bold">
    {Number}
  </div>
  <div>
    <h3 class="text-xl font-semibold text-brand-900 mb-2">{Title}</h3>
    <p class="text-gray-600">{Description}</p>
  </div>
</div>
```

**Proposed Component:**
```astro
<ProcessStep
  number={1}
  title="Site Survey & Planning"
  description="Comprehensive site survey to assess..."
/>
```

**Impact:**
- 16+ instances → 1 component
- Easy to reorder or add steps

---

### 4. **QualificationCard Component** ⭐⭐
**Current State:** Duplicated 8+ times across qualification sections

**Where Used:**
- `FireDoorInstallersPage.astro` - 2 qualification cards
- `FireDoorMaintenancePage.astro` - 2 qualification cards
- `FireDoorInspectorsPage.astro` - 2 qualification cards
- `FireDoorServicesPage.astro` - 2 qualification cards

**Pattern:**
```astro
<div class="bg-white p-6 rounded-lg shadow-sm">
  <h3 class="text-xl font-semibold text-brand-900 mb-4">{Title}</h3>
  <ul class="space-y-2 text-gray-600">
    <li class="flex items-center">
      <svg class="w-5 h-5 text-green-500 mr-2">...</svg>
      {Item}
    </li>
  </ul>
</div>
```

**Proposed Component:**
```astro
<QualificationCard
  title="Professional Qualifications"
  items={["CSCS Gold Card Holder", "FireQual Fire Door Inspector", ...]}
/>
```

**Impact:**
- 8+ instances → 1 component
- Easy to update qualifications globally

---

## 🟡 Medium Priority Components

### 5. **TimelineItem Component** ⭐
**Current State:** Duplicated 6 times in `about.astro`

**Where Used:**
- `src/pages/about.astro` - 6 timeline entries

**Pattern:**
```astro
<div class="timeline-item">
  <div class="timeline-marker"></div>
  <div class="timeline-content">
    <h3 class="text-2xl font-bold text-brand-900 mb-2">{Year} - {Title}</h3>
    <p class="text-brand-600 leading-relaxed">{Description}</p>
  </div>
</div>
```

**Proposed Component:**
```astro
<TimelineItem
  year="1989"
  title="Starting Out"
  description="I qualified as a joiner..."
/>
```

**Impact:**
- Makes timeline easier to maintain
- Could be data-driven from `src/data/timeline.ts`

---

### 6. **FaultCard Component** ⭐
**Current State:** Already exists but could be improved

**Where Used:**
- `src/components/CommonFaults.astro` - 6 fault cards

**Current:** Each fault card is manually coded with complex hover effects

**Proposed:** Standardize into reusable component with props for:
- Icon color/variant
- Title
- Description
- Hover effects (already implemented)

**Impact:**
- Cleaner code
- Easier to add new faults
- Consistent styling

---

## 📊 Impact Summary

### Code Reduction:
- **Before:** ~2,000+ lines of duplicated code
- **After:** ~500 lines in reusable components
- **Savings:** ~75% reduction

### Maintenance Benefits:
- ✅ Update styling once → applies to all 224 location pages
- ✅ Add new service → just add to data array
- ✅ Consistent design language
- ✅ Easier to test

### Files Affected:
- 4 service page components (FireDoorInstallersPage, etc.)
- 224 location pages (via `[...slug].astro`)
- 1 about page

---

## 🎯 Implementation Priority

### Phase 1 (Do First):
1. ✅ `ServiceHero` - Already done!
2. `ServiceCard` - Highest impact (18+ instances)
3. `FeatureCard` - High impact (16+ instances)

### Phase 2 (Do Next):
4. `ProcessStep` - Medium impact (16+ instances)
5. `QualificationCard` - Medium impact (8+ instances)

### Phase 3 (Nice to Have):
6. `TimelineItem` - Low impact (6 instances, but improves readability)
7. Improve `FaultCard` - Already exists, just needs standardization

---

## 💡 Additional Opportunities

### Data-Driven Content:
- Move service data to `src/data/services.ts`
- Move timeline data to `src/data/timeline.ts`
- Move qualifications to `src/data/qualifications.ts`

**Benefits:**
- Content updates without touching components
- Easier for non-developers to update
- Better separation of concerns

### Script Extraction:
- Extract carousel script from `Carousel.astro` → `src/scripts/carousel.js`
- Extract search script from `AISmartSearch.astro` → `src/scripts/search.js`

**Benefits:**
- Cleaner component files
- Better code organisation
- Easier to test

---

## Next Steps

Would you like me to:
1. Create the `ServiceCard` component first? (Highest impact)
2. Create all Phase 1 components at once?
3. Show you a preview of how one would look before creating them all?

