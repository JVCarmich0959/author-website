# Changelog

## [Unreleased]
- Initial design polish and structure complete, preparing for content integration.

## [2025-06-03] - Core Refactors & Accessibility Pass

### Updated
- Refactored `main.jsx` to remove undefined lazy imports (`Shop.jsx`, `Blog.jsx`)
- Enabled React Router v7 future flags to suppress warnings
- Ensured all lazy components are wrapped with `<Suspense>` fallbacks
- Only existing routes (`Post.jsx`) are rendered in the router

### Fixed
- Runtime crashes caused by missing route components
- Accessibility issues in navigation:
  - Added `aria-label`, `role`, `tabIndex`, and keyboard interaction support
  - Applied `aria-controls` and `aria-expanded` to mobile toggle
  - Made "Melissa Michaels" logo act as semantic home link

### Changed
- Replaced twirling newsletter CTA with a scroll-triggered popup modal
  - Added `NewsletterModal.jsx`
  - Triggers after user scrolls 60% down the page
  - Includes dismiss option and styled consistently with theme
- Hero page refinements:
  - Applied `textShadow` and `flicker` animation to the word “blood”
  - Added `.sr-only` text for screen reader support
  - Adjusted z-index for canvas render order
  - Replaced hardcoded color values with `--antique-gold` variable
