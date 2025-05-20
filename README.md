# Urban Fantasy Author Website

This project powers the online presence of **Melissa Michaels**, author of *Raven's Revenge* and the growing **Bloodborne Chronicles** series. It combines a React front end with an Express server to showcase her books, share author updates and collect newsletter sign‑ups.

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
2. Start the Vite dev server
   ```bash
   npm run dev
   ```
   This launches the React front end with hot reload.
3. Build production assets
   ```bash
   npm run build
   ```

## Features

- Animated hero section highlighting *Raven's Revenge*
- Interactive 3D models for signed books, Patreon exclusives and newsletter perks
- "About the Author" section describing Melissa and her writing journey
- Newsletter sign‑up form powered by EmailJS

The codebase is intentionally minimal to keep the focus on promoting **The Bloodborne Chronicles**. Feel free to adapt it for your own author site or book series.

