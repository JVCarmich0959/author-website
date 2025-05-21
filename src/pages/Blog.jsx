import React from 'react'
import { Link } from 'react-router-dom'
import matter from 'gray-matter'

const modules = import.meta.glob('../posts/*.md', { eager: true, as: 'raw' })
const posts = Object.entries(modules).map(([path, content]) => {
  const slug = path.split('/').pop().replace(/\.md$/, '')
  const { data } = matter(content)
  return { slug, ...data }
}).sort((a, b) => new Date(b.date) - new Date(a.date))

export default function Blog() {
  return (
    <div className="blog">
      {posts.map((post) => (
        <article key={post.slug} className="prose mx-auto mb-8">
          <h2>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p>{post.summary}</p>
        </article>
      ))}
    </div>
  )
}
