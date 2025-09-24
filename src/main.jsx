import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import Layout from './components/Layout.jsx'
// const Shop = lazy(() => import('./pages/Shop.jsx')) // Uncomment when ready
// const Blog = lazy(() => import('./pages/Blog.jsx')) // Uncomment when ready
const Post = lazy(() => import('./pages/Post.jsx'))

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
            {/* Optional routes */}
            {/* <Route path="shop" element={<Shop />} /> */}
            {/* <Route path="blog" element={<Blog />} /> */}
            <Route path="post/:slug" element={<Post />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
)

{/* TODO: Create Shop.jsx and Blog.jsx under /pages before uncommentng their imports and routes 
      - Optional fallback route for 404 pages
      - Revew any warnings from ReactDOM.createRoot() to ensure it's not being called multiple times*/}