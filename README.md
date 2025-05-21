# Urban Fantasy Author Website

This project powers the online presence of **Melissa Michaels**, author of *Raven's Revenge* and the growing **Bloodborne Chronicles** series. It is a Vite powered React front end that showcases her books, shares author updates and collects newsletter sign‑ups.

## Key Technologies

- **React + Vite** – component‑driven UI with hot module reloading
- **Tailwind CSS** – utility‑first styling
- **React Three Fiber** – 3D book and merchandise models
- **EmailJS** – sends contact and newsletter forms (requires `VITE_SERVICE_ID`, `VITE_TEMPLATE_ID`, and `VITE_PUBLIC_KEY`)

## Project Structure

 codex/update-documentation-and-fix-code-issues
- `src/components` – React components for the hero, about section, services and newsletter form

- `src/components` – React components for the hero, about section, services (book models, Patreon links), and newsletter form
 main
- `public` – static assets such as the *Raven's Revenge* cover, 3D model files and icons

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the Vite dev server
   ```bash
   npm run dev
   ```
   This launches the React front end with hot reload.
3. Build production assets
 codex/update-documentation-and-fix-code-issues
   ```bash
   npm run build
   ```
4. Run tests

main
   ```bash
   npm test
   ```

## Environment Variables

Create a `.env` file based on `.env.example` and fill in your EmailJS credentials:

```
VITE_SERVICE_ID=your_service_id
VITE_TEMPLATE_ID=your_template_id
VITE_PUBLIC_KEY=your_public_key
```

## Features

- Animated hero section highlighting *Raven's Revenge*
- Interactive 3D models for signed books, Patreon exclusives and newsletter perks
- "About the Author" section describing Melissa and her writing journey
- Newsletter sign‑up form powered by EmailJS
- Video gallery showcasing book trailers and interviews

The codebase is intentionally minimal to keep the focus on promoting **The Bloodborne Chronicles**. Feel free to adapt it for your own author site or book series.

## Managing Videos

Embedded videos are defined in `src/components/video/VideoGallery.jsx` inside the `videos` array.

1. **Add a video** – append a new object with a unique `id` and `url` pointing to a video file or YouTube embed link.
2. **Remove a video** – delete its object from the array.

Changes are automatically reflected the next time the app is built or reloaded.

## Adding Blog Posts

Blog posts live in `src/posts/` as Markdown files. Each file becomes a post on
the `/blog` page.

1. Create a new `.md` file inside `src/posts/`.
2. The file name becomes the post slug, e.g. `my-post.md` -> `/blog/my-post`.
3. Write your post in standard Markdown. Front matter is not required.

New posts are automatically included the next time the app runs.

