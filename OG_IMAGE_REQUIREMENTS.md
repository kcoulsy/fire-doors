# OG Image Requirements

## Issue
The site references `/og-image.jpg` but the file doesn't exist in the `/public` folder.

## Current Reference
- **Location:** `src/layouts/Layout.astro` (line 32)
- **URL:** `https://coulsyfiredoors.co.uk/og-image.jpg`
- **Used in:** Open Graph meta tags for social media sharing

## Required Specifications

### Image Requirements
- **Dimensions:** 1200×630px (recommended by Facebook, Twitter, LinkedIn)
- **Format:** JPG or PNG
- **File Size:** < 200KB (optimised)
- **Aspect Ratio:** 1.91:1

### Content Suggestions
The image should include:
- Company logo: "Coulsy Fire Door Services"
- Tagline: "Professional Fire Door Services Since 1989"
- Key visual: Fire door imagery or professional branding
- Contact info (optional): Phone number or website

### Design Tips
- Use high contrast for text readability
- Keep important content in the center (avoid edges which may be cropped)
- Use brand colours (#1e2a38, #1e3a8a)
- Ensure text is large enough to read when scaled down

## Implementation Steps

1. **Create the image** (using design software like:
   - Canva (template: Open Graph Image)
   - Figma
   - Photoshop
   - Or use an online OG image generator

2. **Optimise the image:**
   ```bash
   # Using ImageOptim, TinyPNG, or similar
   # Compress to < 200KB
   ```

3. **Save to public folder:**
   ```
   /public/og-image.jpg
   ```

4. **Verify:**
   - Check file exists: `https://coulsyfiredoors.co.uk/og-image.jpg`
   - Test with: https://www.opengraph.xyz/ or Facebook Sharing Debugger

## Impact
- ✅ Better social media previews
- ✅ Higher click-through rates from social platforms
- ✅ Professional appearance when shared
- ✅ Improved branding consistency

## Current Status
⚠️ **File Missing** - OG image needs to be created and added to `/public/og-image.jpg`

