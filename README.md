# Urban Fantasy Author Website

This project powers the online presence of **Melissa Michaels**, author of *Raven's Revenge* and the growing **Bloodborne Chronicles** series. It is a Vite powered React front end that showcases her books, shares author updates and collects newsletter sign‑ups.

## Key Technologies

- **React + Vite** – component‑driven UI with hot module reloading
- **Tailwind CSS** – utility‑first styling
- **React Three Fiber** – 3D book and merchandise models
- **EmailJS** – sends contact and newsletter forms (requires `VITE_SERVICE_ID`, `VITE_TEMPLATE_ID`, and `VITE_PUBLIC_KEY`)

## Project Structure

- `src/components` – React components for the hero, about section, services (book models, Patreon links), and newsletter form
- `public` – static assets such as the *Raven's Revenge* cover, 3D model files and icons

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your EmailJS credentials

3. Start the Vite dev server
   ```bash
   npm run dev
   ```
   This launches the React front end with hot reload.
  codex/create-env-example-and-update-readme
4. (Optional) run the Express server for the EJS pages

3. Build production assets
main
   ```bash
   npm run build
   ```
 codex/create-env-example-and-update-readme
5. Build production assets

4. Run tests
main
   ```bash
   npm test
   ```
   Runs the sample test in `src/App.test.jsx` using Vitest.

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

