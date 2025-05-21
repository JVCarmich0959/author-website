import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-markdown': path.resolve('./src/lib/react-markdown-shim.jsx'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
