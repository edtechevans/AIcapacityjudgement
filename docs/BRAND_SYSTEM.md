# Identity System — AI Capacity × Judgement
**Edition:** 1.0 · 14 November 2026  
**Concept:** *The Intersection* — learn what AI makes possible; choose when it belongs.

## 1. Strategy

AI Capacity and AI Judgement must feel distinct and equally important. The brand never confuses technical fluency with wisdom, or implies that using more AI is always better. Its identity combines optimism with restraint: approachable for Grade 6 learners, credible for Grade 10 learners and educators.

The mark is not a robot, sparkles or a generic brain. Two coloured paths approach one shared point. The **aqua pathway** signifies the ability to understand, experiment and create. The **coral pathway** signifies discernment, agency and responsibility. The small **white centre** represents a considered decision. Neither path dominates.

**Primary name:** AI Capacity × Judgement  
**Short form:** AI C×J  
**Product descriptor:** Learning Studio  
**Short supporting line:** Learn what AI can do. Decide when it should.

Do not add an AISG school logo or imply an official school-branded product without a separate school branding approval.

## 2. Brand assets (vector originals)

| Purpose | Repository asset | Guidance |
| --- | --- | --- |
| Master symbol | \`assets/brand/mark.svg\` | Preferred header, footer, favicon and app visual |
| Transparent mark | \`assets/brand/mark-transparent.svg\` | Dark backgrounds and subtle accents only |
| Horizontal wordmark | \`assets/brand/lockup.svg\` | Press, presentations and standalone placements |
| Safari pinned-tab mask | \`assets/brand/mask-icon.svg\` | Monochrome; browser applies the theme colour |
| Browser favicon | \`favicon.svg\` | Maintained as a compatibility copy of the mark |
| Vector social preview | \`assets/brand/social-preview.svg\` | Source artwork for sharing PNG |

## 3. Raster exports

Generated from master SVG files using \`scripts/build_brand_assets.py\`:
- \`favicon-16.png\`, \`favicon-32.png\` — browser fallbacks
- \`apple-touch-icon.png\` — 180 × 180, solid background
- \`icon-192.png\`, \`icon-512.png\` — standard app icons
- \`icon-maskable-512.png\` — full-bleed maskable icon
- \`social-preview.png\` — 1200 × 630 image for Open Graph and X/Twitter cards

Do not hand-edit PNGs. Update the SVG masters and rebuild the exports. The workflow \`.github/workflows/brand-assets.yml\` regenerates PNGs when vectors change. **Always check the GitHub Pages publishing status after updating assets; automated workflow commits can require a subsequent normal push for Pages to republish.**

## 4. Colour system

| Role | Hex | Use |
| --- | --- | --- |
| Ink | \`#142339\` | Primary typography, logo field, dark hero |
| Cloud | \`#F7F9FC\` | Main page background |
| Paper | \`#FFFFFF\` | Cards and forms |
| Line | \`#DAE4EA\` | Low-emphasis boundaries, never as critical text |
| Supporting text | \`#52657B\` | Secondary typography |
| Capacity text | \`#176C69\` | Teal pathway text and actionable accents |
| Capacity light | \`#E1F5F2\` | Capacity panels and active backgrounds |
| Capacity bright | \`#69E9D8\` | Identity mark and decoration **on dark only** |
| Judgement text | \`#AB473B\` | Coral pathway text and actionable accents |
| Judgement light | \`#FFF0EA\` | Judgement panels and warnings |
| Judgement bright | \`#FF9C80\` | Identity mark and decoration **on dark only** |
| Warm highlight | \`#F5E2C1\` | Rarely, as a tertiary expressive accent |
| Keyboard focus | \`#136B8E\` | Focus outlines with offset |

### Verified text contrast

Ratios calculated to WCAG relative luminance:
- Ink on white: **15.80:1**
- Supporting text on Cloud: **5.68:1**
- Capacity text on Capacity light: **5.48:1**
- Judgement text on Judgement light: **5.11:1**
- White on Judgement text background: **5.68:1**
- Capacity bright on Ink: **10.72:1**
- Judgement bright on Ink: **7.76:1**

These are the **defined pairings**, not a guarantee that every computed colour on every UI element meets WCAG. Complete an actual WCAG 2.2 AA audit before school-wide operational deployment.

**Do not use the bright aqua or bright coral for small text on white.** Use the darker text colours. Always combine pathway colour with a textual label: colour must not be the only signal.

## 5. Typography and UI principles

Use operating-system fonts rather than remote Google Fonts. This avoids unnecessary network dependencies and is important for access from different regions, including China.

- **Display:** Avenir Next → SF Pro Display → Segoe UI → Arial. Confident, warm, slightly tight tracking.
- **Body:** -apple-system → BlinkMacSystemFont → Segoe UI → Avenir Next → Arial.
- **Labels:** restrained uppercase tracking; no decorative font that compromises reading.
- **Teaching:** generous line height, one focal learning task at a time, optional comfortable reading size.
- **Interface:** geometric cards with consistent radii, clean hierarchy and subtle motion only where it helps understanding.
- **Illustration:** use the intersection, pathways, decision points and genuine work. Avoid robot heads, glowing brains and ornamental “AI magic” imagery.

The website owns design tokens in **\`ui/identity.css\`**, loaded after the component stylesheet (\`styles.css\`) and layout stylesheet (\`ui/future.css\`). New UI should consume tokens instead of inventing uncoordinated hex colours.

## 6. Logo rules

- Keep the centre diamond clear.
- Never rotate the mark or rearrange pathway colours.
- Prefer a minimum rendered size of **24 px** for the mark; a full logo works best at 40+ px.
- Clearspace around the standalone icon should be at least 20% of its rendered width.
- Use the dark-tile symbol on white or light backgrounds and the transparent mark on dark surfaces with sufficient contrast.
- Do not stretch, add gradients to the symbol, add a glow, or substitute an unrelated "AI" symbol.
- Do not use the retired text-only **C×J** mark as the primary logo. Keep C×J only in shorthand copy.

## 7. Content and accessibility

Branding serves the learning experience rather than competing with it:
- Capacity and Judgement have equal visual weight and both receive actionable next steps.
- Students should quickly recognise the selected grade, current pathway and lesson stage.
- Learning remains **explanation → model → practice → authentic application → reflection**.
- Authentic use *or purposeful non-use* is equally valid.
- Every icon-only button needs an accessible name. Images used decoratively have \`alt=""\`; meaningful standalone logo assets need alternate text.
- Honour reduced motion, keyboard access and zoom on phone and desktop.
- Site completion remains **formative**, not a mastery judgement. Student aliases and progress remain local; no school SSO is implied.

## 8. Maintenance checklist

1. Update master SVG icons and the colour variables in \`ui/identity.css\`.
2. Run or check the \`Regenerate brand assets\` workflow.
3. Verify PNG dimensions and inspect the 16 px favicon, Apple icon, sharing preview and dark/light placements.
4. Update the CSS/HTML cache version when changing brand assets.
5. Run the Learning Studio quality workflow.
6. Confirm GitHub Pages deploys and check the real site on desktop, narrow mobile and Safari.
7. Review whether the latest brand treatment still feels age-appropriate across G6–G10.

## 9. Brand kit

The public, source-linked visual reference is [Brand Showcase](../brand.html). The original educational content remains credited under the repository's existing licence and attribution; do not presume that any additional third-party fonts or images are cleared merely because a design is included.
