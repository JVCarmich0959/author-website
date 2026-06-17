import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles/tailwind.css'
import './index.css'

import App from './App.jsx'
import Layout from './components/Layout.jsx'

// Lazy load your components
const BlogPage = lazy(() => import ('./components/blog/BlogPage'))
const BlogPostWrapper = lazy(() => import('./components/blog/BlogPostWrapper'))
const ConfirmSubscription = lazy(() => import('./components/newsletter/ConfirmSubscription'))

createRoot(document.getElementById('root')).render(
<StrictMode>
  <BrowserRouter
    basename={import.meta.env.BASE_URL}
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
          <Route path="confirm" element={<ConfirmSubscription />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
)
