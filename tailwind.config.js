/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/styles/**/*.css",
  ],
  darkMode: 'class',
  // keep Tailwind's global reset off so it can't fight the hand-written
  // gothic theme css; only the utility classes are generated
  corePlugins: { preflight: false },
  theme: { extend: {} },
  plugins: [],
};

