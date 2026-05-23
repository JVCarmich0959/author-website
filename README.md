# Urban Fantasy Author Website

This project powers the online presence of **Melissa Michaels**, author of *Raven's Revenge* and the growing **Bloodborne Chronicles** series. It is a Vite + React front end that showcases her books, hosts the blog, and collects newsletter subscriptions.

## Key Technologies

- **React + Vite** – component-driven UI with hot module reloading
- **Tailwind CSS** – utility-first styling
- **React Three Fiber** – 3D book and merchandise models
- **Supabase** – Postgres database for blog posts and newsletter subscribers
- **EmailJS** – sends the bottom contact form (separate from the newsletter)

## Project Structure

- `src/components` – React components for hero, about, books, blog, newsletter, footer
- `src/experience` – chapter-based scrollytelling experience
- `src/lib/supabase.js` – Supabase client and row mappers
- `public` – static assets (book covers, 3D models, icons)

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in the values (see **Environment Variables** below).
3. Start the dev server
   ```bash
   npm run dev
   ```
4. Build production assets
   ```bash
   npm run build
   ```
5. Run tests
   ```bash
   npm test
   ```

## Environment Variables

```
# EmailJS (contact form at bottom of the homepage)
VITE_SERVICE_ID=your_emailjs_service_id
VITE_TEMPLATE_ID=your_emailjs_template_id
VITE_PUBLIC_KEY=your_emailjs_public_key

# Supabase (blog posts + newsletter subscribers)
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

The Supabase URL and publishable key come from your Supabase project dashboard
under *Project Settings → API Keys*. The publishable key is safe to ship to the
browser — never put the `service_role` key in a `VITE_*` variable.

## Database

Two tables in the Supabase `public` schema:

- **`subscribers`** – newsletter signups. Columns: `id`, `email` (unique, case-insensitive), `name`, `source`, `confirmed`, `confirmation_token`, `unsubscribe_token`, `created_at`, `confirmed_at`, `unsubscribed_at`.
- **`posts`** – blog posts. Columns: `id`, `slug` (unique), `title`, `summary`, `body` (Markdown), `tags` (text[]), `featured_image`, `author`, `published_at`, `created_at`, `updated_at`.

Row Level Security is enabled on both. The anon key can:
- INSERT into `subscribers` (signup form)
- SELECT from `posts` where `published_at` is set and in the past

It cannot read the subscriber list. To export subscribers, use the Supabase dashboard or a server-side `service_role` key.

## Writing a Blog Post

Until there's an admin UI, post directly in Supabase Studio:

1. Open *Table Editor → posts → Insert row*.
2. Fill in `slug` (e.g. `my-post`), `title`, `body` (Markdown), `summary`, and optionally `tags`, `featured_image`.
3. Set `published_at` to a timestamp to make it live. Leave null to keep as draft.

The post appears at `/blog/<slug>` on the next page load.

## Features

- Animated hero section highlighting *Raven's Revenge*
- Interactive 3D models for signed books, Patreon exclusives, and newsletter perks
- "About the Author" section
- Newsletter sign-up popup writes directly to Supabase
- `/experience` route featuring a chaptered narrative with insight hotspots and a lightweight 3D backdrop
- Video gallery for book trailers and interviews

## Managing Videos

Embedded videos are defined in `src/components/video/VideoGallery.jsx` inside the `videos` array. Append/remove objects with a unique `id` and a `url`.

## Experience Page

Visit `/experience` for the scroll-driven narrative. Chapters live in `src/experience/data/chapters.js`.
