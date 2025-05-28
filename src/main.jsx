import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
const Shop = lazy(() => import('./pages/Shop.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const Post = lazy(() => import('./pages/Post.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Post />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
)
