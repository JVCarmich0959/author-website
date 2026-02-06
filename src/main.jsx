import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import Layout from './components/Layout.jsx'

// Lazy load your components
const BlogPage = lazy(() => import ('./components/blog/BlogPage'))
const BlogPostWrapper = lazy(() => import('./components/blog/BlogPostWrapper'))
const Post = lazy(() => import('./pages/Post.jsx'))
const ExperiencePage = lazy(() => import('./experience/ExperiencePage.jsx'))

createRoot(document.getElementById('root')).render(
<StrictMode>
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
    >
     <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<App />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostWrapper />} />
          <Route path="post/:id" element={<Post />} />
          <Route path="experience" element={<ExperiencePage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
)
