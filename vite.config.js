import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react({
      // enable React refresh and JSX transform in .js files
      include: /\.jsx?$/,
    }),
  ],
  esbuild: {
    // treat .js files as having JSX syntax
    loader: 'jsx',
    include: /src\/.*\.js$/,
  },
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
