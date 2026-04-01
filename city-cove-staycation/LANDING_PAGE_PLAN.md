# City Cove Landing Page Plan

## Goal

Create a one-page landing page for **City Cove Staycation** inside this Next.js project that feels aligned with the Facebook page vibe:

- modern staycation energy
- clean and premium but still warm
- pool-view / resort-adjacent atmosphere
- social-media-friendly presentation
- focused on quick trust and direct inquiry/booking

## Current Project State

The app is still a default Next.js starter, so we can shape the landing page from scratch without needing to preserve an existing design system.

Relevant files:

- `app/page.tsx`
- `app/globals.css`
- `app/layout.tsx`

## Vibe Direction

Because the Facebook page content was not fully readable through public scraping, this plan uses the strongest public cues available from the linked profile and related public listing text:

- fully furnished 1-bedroom staycation unit
- balcony and pool-view positioning
- near MOA / Pasay / Shore 3 Residences
- "hotel comfort" presentation

### Visual mood

- Bright, airy, polished
- Neutral base with aquatic accents
- Condo-luxury rather than tropical-beach cliche
- Instagram-ready blocks with strong photo framing

### Suggested style system

- Backgrounds: ivory, warm white, soft sand
- Accent colors: sea-glass teal, deep slate, muted gold
- Surfaces: white cards with soft shadows and rounded corners
- Imagery: large hero image, pool-view shots, cozy bedroom, styled living area
- Typography pairing:
  - Headings: `Cormorant Garamond`
  - Body/UI: `Manrope`

## Landing Page Structure

### 1. Hero Section

Purpose: immediate emotional pull and clear offer.

Content:

- brand name: `City Cove Staycation`
- short headline
- 1-line positioning statement
- primary CTA: `Book Your Stay` or `Message on Facebook`
- secondary CTA: `View Amenities`
- hero image collage or full-bleed feature image

Suggested message direction:

- "Your modern pool-view staycation near MOA"
- "Hotel-style comfort in the heart of Pasay"

### 2. Quick Highlights Strip

Purpose: communicate value in seconds.

Suggested highlights:

- 4 guests
- 1 bedroom
- pool view
- balcony
- Wi-Fi / smart TV
- near MOA

This should sit directly below the hero and feel clean, icon-led, and easy to scan.

### 3. About the Stay

Purpose: translate Facebook-post style selling points into a more premium web section.

Content:

- short host-style description
- emphasis on comfort, convenience, and aesthetic feel
- mention ideal guests: couples, small families, solo travelers

Tone:

- warm
- reassuring
- aspirational but not exaggerated

### 4. Photo-First Showcase

Purpose: match the social-media vibe.

Layout idea:

- asymmetric gallery
- one dominant image plus supporting smaller images
- light captions like `Pool View Balcony`, `Cozy Bedroom`, `Relaxing Lounge Area`

This section is important because the Facebook-page vibe likely depends heavily on visuals.

### 5. Amenities Section

Purpose: reduce hesitation and answer practical booking questions.

Suggested amenity groups:

- Sleep: bedroom, beds, linens, AC
- Living: sofa, smart TV, Wi-Fi
- Kitchen: essentials, dining setup
- Bathroom: hot shower, toiletries
- Building: pool access, security, elevator
- Location perks: MOA, airport access, nearby dining

### 6. Location / Accessibility Section

Purpose: make the listing feel convenient and bookable.

Content direction:

- Shore 3 Residences / Pasay
- walking or short-drive proximity to MOA
- convenient for staycations, events, and short city breaks

UI idea:

- simple location card
- travel-time chips
- optional embedded map later

### 7. Why Guests Choose City Cove

Purpose: build trust even before reviews are added.

Suggested bullets:

- stylish and comfortable interiors
- relaxing pool-facing ambiance
- easy check-in experience
- great location for shopping and dining

If reviews become available later, this section can evolve into testimonials.

### 8. Final CTA Section

Purpose: convert visitors after they have seen the full story.

Options:

- `Book Now`
- `Send Inquiry`
- `Message on Facebook`

Add a short reassurance line such as:

- "Perfect for quick escapes, weekend resets, and city staycations."

## Content Needed From You

To make the landing page truly match the Facebook page, these assets will matter most:

- best 5 to 10 property photos
- logo or profile image if available
- exact CTA destination
  - Facebook Messenger
  - Airbnb
  - direct contact
- confirmed amenity list
- exact location wording you want shown
- any guest review snippets

## Implementation Plan

### Phase 1. Foundation

- replace starter metadata in `app/layout.tsx`
- set up brand fonts
- create a custom color system in `app/globals.css`
- remove default starter markup from `app/page.tsx`

### Phase 2. Core Page Build

- build hero
- build highlights strip
- build about section
- build amenities grid
- build location section
- build final CTA

### Phase 3. Visual Polish

- add layered gradients and soft background shapes
- refine spacing and responsive typography
- make image blocks feel editorial, not template-like
- add subtle reveal/hover motion

### Phase 4. Content Integration

- replace placeholders with real photos and copy
- connect live CTA links
- refine wording to match the Facebook tone exactly

## Recommended Build Order In This Repo

1. Update `app/layout.tsx` with proper title, description, and fonts.
2. Rewrite `app/globals.css` with branded color variables and base styles.
3. Rebuild `app/page.tsx` as a single polished landing page.
4. Add property images into `public/` once you provide them.
5. Do a mobile-first refinement pass.

## Design Notes For "Same Vibe"

To keep the page close to the Facebook feel, the design should avoid:

- generic startup SaaS sections
- overly dark luxury styling
- neon resort visuals
- corporate hotel copywriting

It should instead emphasize:

- bright lifestyle imagery
- cozy-modern condo appeal
- resort-adjacent calm
- approachable premium feel
- social-post-style warmth with cleaner web structure

## Best Next Step

Build the first version with placeholder photos and copy, then do one refinement round after comparing it directly with screenshots from the Facebook page. That will be the fastest way to get a close visual match.
