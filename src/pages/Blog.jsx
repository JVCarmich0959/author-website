import React from 'react'
import ReactMarkdown from 'react-markdown'
import Nav from '../components/hero/Nav'

const modules = import.meta.glob('../posts/*.md', { eager: true, as: 'raw' })
const posts = Object.entries(modules).map(([path, content]) => ({
  id: path.split('/').pop().replace(/\.md$/, ''),
  content: content.trim(),
}))

export default function Blog() {
  return (
    <div className="container blog-page">
      <Nav />
      <main className="blog">
        {posts.map((post) => (
          <article key={post.id} className="prose mx-auto mb-8">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        ))}
      </main>
    </div>
  )
}
