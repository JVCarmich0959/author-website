import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import matter from 'gray-matter'
import { Buffer } from 'buffer'

const modules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default' })
window.Buffer = window.Buffer || Buffer

async function loadPosts() {
  const entries = await Promise.all(
    Object.entries(modules).map(async ([path, loader]) => {
      const content = await loader()
      const slug = path.split('/').pop().replace(/\.md$/, '')
      const { data } = matter(content)
      return { slug, ...data }
    })
  )
  return entries.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export default function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    loadPosts().then(setPosts)
  }, [])

  return (
    <div className="container py-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article
          key={post.slug}
          className="bg-black/40 p-6 rounded shadow hover:shadow-lg hover:-translate-y-1 transition"
        >
          <h2 className="text-xl mb-2">
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className="text-sm opacity-75 mb-4">
            {new Date(post.date).toLocaleDateString()}
          </p>
          <p>{post.summary}</p>
        </article>
      ))}
    </div>
  )
}
