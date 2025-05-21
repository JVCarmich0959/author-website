# Urban Fantasy Author Website

This project powers the online presence of **Melissa Michaels**, author of *Raven's Revenge* and the growing **Bloodborne Chronicles** series. It's a Vite-powered React front end that showcases her books, shares author updates, and collects newsletter sign‑ups.

## Key Technologies

* **React & Vite** – component‑driven UI with hot module reloading
* **Tailwind CSS** – utility‑first styling
* **React Three Fiber** – interactive 3D book and merchandise models
* **EmailJS** – handles newsletter and contact forms (requires `VITE_SERVICE_ID`, `VITE_TEMPLATE_ID`, `VITE_PUBLIC_KEY`)

## Project Structure

```
.
├── src
│   ├── components         # React components for hero, about, books, newsletter form, etc.
│   ├── posts              # Markdown blog posts → /blog/<slug>
│   └── assets             # Static images, 3D model files, icons
├── public                 # Static assets (covers, icons) served at root
├── .env.example           # Sample environment variables
└── README.md              # Project overview and setup instructions
```

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```
2. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```

   Fill in your EmailJS credentials:

   ```text
   VITE_SERVICE_ID=your_service_id
   VITE_TEMPLATE_ID=your_template_id
   VITE_PUBLIC_KEY=your_public_key
   ```
3. **Start development server:**

   ```bash
   npm run dev
   ```
4. **Build for production:**

   ```bash
   npm run build
   ```
5. **Run tests:**

   ```bash
   npm test
   ```

## Features

* Animated hero section spotlighting *Raven's Revenge*
* Interactive 3D book and merchandise models
* "About the Author" section with Melissa’s bio
* Newsletter signup form powered by EmailJS
* Video gallery showcasing trailers and interviews

## Managing Videos

Videos are defined in `src/components/video/VideoGallery.jsx` within the `videos` array:

1. **Add a video**: append `{ id: 'unique-id', url: 'video-url' }`.
2. **Remove a video**: remove its object from the array.

Changes appear automatically on reload or rebuild.

## Adding Blog Posts

Blog posts live in `src/posts/` as Markdown files:

1. Create a new `.md` file, e.g., `my-post.md` → `/blog/my-post`.
2. Write content in Markdown (front matter not required).

New posts are picked up on the next run.

---

The codebase is intentionally minimal, keeping the focus on promoting **The Bloodborne Chronicles**. Feel free to adapt it for your own author site or series.
