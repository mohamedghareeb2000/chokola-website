---
name: Chokola Dessert Lounge
description: Elegant. Modern. Sweet.
colors:
  dusty-mauve: "#B07A8D"
  blush-pink: "#E7B5BB"
  chocolate-brown: "#4A2E2B"
  warm-cream: "#FFF5F0"
  nude-beige: "#EAD9C8"
  soft-gold: "#C9A86A"
typography:
  logo:
    fontFamily: "Angelista"
    usage: "Official logo artwork only; never render as live website text"
  display:
    fontFamily: "Montserrat, sans-serif"
    fontWeight: 600
  body:
    fontFamily: "Montserrat, sans-serif"
    fontWeight: 400
  title:
    fontFamily: "Montserrat, sans-serif"
    fontWeight: 600
  label:
    fontFamily: "Montserrat, sans-serif"
    fontWeight: 500
rounded:
  field: "18px"
  soft: "24px"
  product: "30px"
  panel: "32px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "40px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.blush-pink}"
    textColor: "{colors.chocolate-brown}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.dusty-mauve}"
    textColor: "{colors.warm-cream}"
  button-secondary:
    backgroundColor: "{colors.warm-cream}"
    textColor: "{colors.chocolate-brown}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
    height: "56px"
  input:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.chocolate-brown}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "16px 20px"
    height: "64px"
  product-card:
    backgroundColor: "{colors.warm-cream}"
    textColor: "{colors.chocolate-brown}"
    rounded: "{rounded.product}"
    padding: "16px 24px"
---

# Design System: Chokola Dessert Lounge

## Overview

**Creative North Star: "Elegant. Modern. Sweet."**

The official Chokola identity is soft, feminine, indulgent, and warm. The strawberry-and-chocolate logo, appetite-led dessert photography, generous product presentation, and controlled pink–brown palette make the brand feel premium without becoming cold or formal. The official brand board is the single source of truth for identity colors, typography, and logo usage.

The website-specific system supports that identity with rounded controls, softly separated surfaces, generous section spacing, and restrained interaction feedback. These digital rules describe the current implementation; they are not additions to the official brand identity. The serif typography visible inside supplied menu artwork belongs to that artwork only and is not an approved website font.

The system explicitly rejects childish candy branding, generic bakery templates, cold or overly formal luxury, excessively minimal layouts with too much empty space, generic SaaS interfaces, and cluttered designs with excessive animation.

**Key Characteristics:**

- Official palette and logo remain unchanged across digital applications.
- Dessert imagery is abundant, high quality, and central to product presentation.
- Layouts are warm and generous but retain useful information density.
- Website controls are rounded, tactile, and clearly interactive.
- Motion is restrained, purposeful, and reduced when requested by the user.

## Colors

The official palette is soft, feminine, and indulgent, reflecting luxury, warmth, and sweetness.

### Primary

- **Dusty Mauve** (`#B07A8D`): Official brand accent for emphasis, interactive states, supporting marks, and selected decorative details.
- **Blush Pink** (`#E7B5BB`): Official light brand color for primary calls to action, soft branded surfaces, and strawberry-led warmth.

### Secondary

- **Chocolate Brown** (`#4A2E2B`): Official dark brand color for primary text, strong contrast, logo details, and chocolate-led visual grounding.

### Tertiary

- **Soft Gold** (`#C9A86A`): Official highlight color for restrained premium accents and small moments of emphasis.

### Neutral

- **Warm Cream** (`#FFF5F0`): Official light surface color and the primary warm background within branded compositions.
- **Nude Beige** (`#EAD9C8`): Official supporting neutral for borders, quiet sections, packaging-inspired surfaces, and tonal separation.

### Named Rules

**The Official Six Rule.** These six colors are the complete official palette. Never rename, recolor, or supplement them as brand colors without an updated identity standard.

**The Contrast Rule.** Chocolate Brown is the default readable foreground on Warm Cream, Blush Pink, and Nude Beige. Dusty Mauve and Soft Gold are accents, not substitutes for legible body text.

## Typography

**Logo Typeface:** Angelista Regular, exclusively within the official logo artwork
**Website Typeface:** Montserrat

**Character:** Angelista gives the official Chokola logo its recognizable feminine signature. It is not a website text face. Montserrat supplies clarity, balance, and modern structure for every live text role.

### Hierarchy

- **Logo artwork** (Angelista Regular): Appears only inside the existing official logo artwork. Never recreate the logo or set headings, the brand name, or any other live website text in Angelista.
- **Display / Headline** (Montserrat Semibold): Used for major website headings and high-priority messages.
- **Title** (Montserrat Medium or Semibold): Used for product names, navigation group headings, cards, and form titles.
- **Body** (Montserrat Regular): Used for descriptions, supporting information, menus, and form content; keep long prose within approximately 65–75 characters per line.
- **Label** (Montserrat Medium or Semibold): Used for buttons, navigation, prices, short metadata, and form labels. Montserrat Light may be used for quiet supporting text when contrast remains accessible.

### Named Rules

**The Single Live-Family Rule.** Montserrat is the only typeface used for live website text, including headings, body copy, navigation, buttons, labels, forms, product information, and the brand name when it appears as text.

**The Logo Typeface Rule.** Angelista is exclusive to the existing official logo artwork. Do not load it as a webfont or apply it to any live text. Serif lettering inside supplied menu imagery is also artwork, not a reusable website font.

## Elevation

The current website-specific digital system is softly layered rather than heavily elevated. Depth comes primarily from official-color tonal separation, borders, photography, and overlapping composition. Two ambient shadow tokens exist in the website CSS; they are supporting digital effects, not official brand identity elements.

### Shadow Vocabulary

- **Soft Ambient** (`0 22px 70px rgba(59, 36, 36, 0.10)`): Website-specific token for broad, low-contrast separation on large featured surfaces.
- **Card Ambient** (`0 16px 44px rgba(59, 36, 36, 0.08)`): Website-specific token for quiet separation when a card cannot rely on tonal contrast alone.

### Named Rules

**The Tonal-First Rule.** Use color and composition before shadow. Shadows must remain diffuse, chocolate-tinted, and subordinate to product imagery.

**The No-Logo-Effects Rule.** Never add glow, shadow, outline, bevel, or other effects to the official logo. The supplied `without background.png` is a presentation preview, not an approved logo variant.

## Components

Component geometry and motion in this section are website-specific rules extracted from the current implementation. They do not redefine the official identity.

### Buttons

- **Shape:** Fully pill-shaped (`999px`) with a minimum current height of `56px` for primary actions.
- **Primary:** Blush Pink background, Chocolate Brown text, Montserrat bold or semibold label, and current horizontal padding of `32px` to `36px`.
- **Hover / Focus:** Dusty Mauve background with Warm Cream text; a visible focus outline remains mandatory. Current transitions run for `300ms`.
- **Secondary:** Warm Cream or transparent light surface, Chocolate Brown text, and a low-contrast Blush Pink border. The shape remains pill-like.

### Chips

- **Style:** Fully rounded (`999px`) with Warm Cream or status-tinted backgrounds, Chocolate Brown text, and restrained Nude Beige borders.
- **State:** Meaning is communicated with text and, where present, an icon or status word—not color alone.

### Cards / Containers

- **Corner Style:** Current product cards use `30px`; contact items use `24px`; major panels and the footer use `32px`.
- **Background:** Warm Cream, white, or subtle official-palette tonal surfaces.
- **Shadow Strategy:** Tonal separation and borders are preferred; ambient shadow tokens are reserved for cases that need additional depth.
- **Border:** Current separators use low-opacity Nude Beige, Blush Pink, or Dusty Mauve.
- **Internal Padding:** Current cards generally use `16px 24px`; larger form panels use `24px` to `32px`.

### Inputs / Fields

- **Style:** White field, Chocolate Brown text, `18px` radius, `64px` height, and `20px` horizontal padding. Current borders use a pale official-palette neutral.
- **Focus:** Dusty Mauve border plus a visible two-pixel Blush Pink focus ring; global keyboard focus also receives a three-pixel Dusty Mauve outline.
- **Error / Disabled:** Errors include explicit text and semantic status treatment. Disabled buttons retain their label, lower opacity, and show a not-allowed cursor.

### Navigation

- The current fixed navigation uses a light Warm Cream surface when scrolled, Montserrat semibold labels, pill-shaped hit areas, and a two-pixel Blush Pink active underline. Mobile navigation becomes a stacked menu with the same colors, typography, and `44px` minimum controls.

### Motion

- Current website transitions generally use `300ms` for hover and focus feedback. Framer Motion entrance patterns include a `650ms` upward fade, `100ms` list staggering, and short navigation transitions around `280ms`. A single scroll cue uses a slow `1.8s` vertical loop.
- Motion must never gate content visibility. The existing global reduced-motion rule shortens animation and transition durations to `0.01ms`, disables repeated animation, and removes smooth scrolling when `prefers-reduced-motion: reduce` is active.

### Logo

- Use only the official primary logo with background, official transparent-background logo, or official strawberry icon.
- Clear space on all sides equals the height of the “C” in “Chokola.”
- Minimum size is `25mm` in print or `100px` in digital applications.
- Maintain the strawberry icon’s proportions and position. Never stretch, distort, recolor, rotate, flip, remove the icon, or add effects.

## Do's and Don'ts

### Do:

- **Do** use the exact official colors: Dusty Mauve (`#B07A8D`), Blush Pink (`#E7B5BB`), Chocolate Brown (`#4A2E2B`), Warm Cream (`#FFF5F0`), Nude Beige (`#EAD9C8`), and Soft Gold (`#C9A86A`).
- **Do** use Montserrat for every live website text role. Preserve Angelista only as part of the existing official logo artwork.
- **Do** maintain official logo clear space, minimum size, icon proportion, and strong contrast.
- **Do** use high-quality dessert photography with warm, appetite-led styling and clear product detail.
- **Do** preserve useful information density while keeping sections readable and well spaced.
- **Do** meet WCAG 2.1 AA with keyboard access, visible focus, reduced motion, and interactions that do not rely on color alone.

### Don't:

- **Don't** change official colors, invent additional brand colors, or rename identity elements.
- **Don't** stretch, distort, rotate, flip, recolor, remove the strawberry icon from, or add effects to the official logo.
- **Don't** treat serif typography inside menu artwork as an official website font.
- **Don't** resemble childish candy branding or generic bakery templates.
- **Don't** create cold or overly formal luxury.
- **Don't** use excessively minimal layouts with too much empty space.
- **Don't** introduce generic SaaS interfaces.
- **Don't** create cluttered designs with excessive animation.
