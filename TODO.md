# TODO List

## Blog System
- [ ] Create `/blog` route component and basic layout
- [ ] Add blog index page with placeholder post previews
- [ ] Implement routing logic for individual blog post views
- [ ] Consider using MDX or CMS (optional)

## Newsletter Integration
- [ ] Choose newsletter platform (Mailchimp, ConvertKit, etc.)
- [ ] Create mailing list and get embedded form or signup URL
- [ ] Update `NewsletterModal.jsx` to point to live signup endpoint
- [ ] (Optional) Add session storage to prevent re-showing modal

## Contact Section
- [ ] Build `<section id="contact">` at bottom of page
- [ ] Add a contact form or basic call-to-action block
- [ ] Wire up form submission if using backend or 3rd-party service

## Social Media Integration
- [ ] Replace placeholder social media links with real URLs
- [ ] Add `aria-label`s and `rel="noopener noreferrer"` to links
- [ ] Ensure hover/focus styles match theme

## Design Enhancements
- [ ] Add smooth fade-in transition on page load for hero
- [ ] Improve mobile responsiveness of hero text and modal
- [ ] Design and implement 404 fallback route
- [ ] Optionally add ambient scroll effects or lighting to `Canvas`

## Cleanup
- [ ] Remove unused placeholder files (e.g. `Shop.jsx`, `Blog.jsx` if not reused)
- [ ] Audit `hero.css` for unused selectors after final layout pass
