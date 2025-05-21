import React from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'

const modules = import.meta.glob('../posts/*.md', { eager: true, as: 'raw' })
const posts = Object.entries(modules).map(([path, content]) => {
  const slug = path.split('/').pop().replace(/\.md$/, '')
  const { data, content: body } = matter(content)
  return { slug, ...data, body }
})

export default function Post() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  if (!post) {
    return <div className="prose mx-auto">Post not found.</div>
  }
  return (
    <article className="prose mx-auto">
      <h1>{post.title}</h1>
      <ReactMarkdown>{post.body}</ReactMarkdown>
    </article>
  )
}
