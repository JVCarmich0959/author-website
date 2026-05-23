# TODO List

## Newsletter / Subscribers (Supabase)
- [x] Wire NewsletterModal to a real backend (Supabase `subscribers` table)
- [x] Only mark subscribed in localStorage on success
- [ ] Build double opt-in: send confirmation email via Resend / Supabase Edge Function; flip `confirmed=true` when the user clicks the link
- [ ] Build unsubscribe page that flips `unsubscribed_at` using the `unsubscribe_token`
- [ ] Decide on a sender (Resend, Postmark, AWS SES) and create a Supabase Edge Function for broadcasts
- [ ] Replace the bottom EmailJS "contact" form with either a real contact form or a second signup surface (currently this is a generic message-to-mom form — fine but should be relabeled)

## Blog (Supabase)
- [x] Move posts from hardcoded `src/data/posts.js` into Supabase `posts` table
- [x] Remove the misleading localStorage "Write a post" form
- [x] Fetch posts (list + single) from Supabase
- [x] Delete dead `/post/:id` route + `src/pages/Post.jsx`
- [ ] Build an admin UI for writing/editing posts (or document the Supabase Studio flow well enough that mom can use it)
- [ ] Add tag filtering on `/blog`
- [ ] Add featured-post / pinned-post support

## Contact Section
- [ ] Audit the bottom "Newsletter" component — it's actually a contact form, rename + adjust copy

## Social Media Integration
- [ ] Replace placeholder URLs in `Footer.jsx` (currently point to twitter.com, instagram.com, etc.) with mom's real handles
- [ ] Verify all social icons match theme on hover/focus

## Performance
- [ ] `public/Raven.gif` is 16 MB — convert to MP4/WebM
- [ ] `public/Hero_bg.png` is 1.8 MB — convert to compressed JPG or WebP
- [ ] Audit `.glb` model sizes (5 MB+ each)

## Design Enhancements
- [ ] Smooth fade-in on hero
- [ ] Mobile responsiveness pass on hero + modal
- [ ] 404 fallback route

## Cleanup
- [ ] Remove `gray-matter` and `buffer` from package.json (no longer used after Post.jsx deletion)
- [ ] Audit `hero.css` for unused selectors
