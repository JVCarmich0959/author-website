// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [
    // use default settings so React plugin handles JSX in .jsx and .js
    react(),
  ],
  resolve: {
    alias: {
      // point markdown imports to your shim
      'react-markdown': path.resolve(__dirname, 'src/lib/react-markdown-shim.jsx'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
