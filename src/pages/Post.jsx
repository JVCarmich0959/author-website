import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import { Buffer } from 'buffer'

const modules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default' })
window.Buffer = window.Buffer || Buffer

async function loadPost(slug) {
  const loader = modules[`../posts/${slug}.md`]
  if (!loader) return null
  const content = await loader()
  const { data, content: body } = matter(content)
  return { slug, ...data, body }
}

export default function Post() {
  const { slug } = useParams()
  const [post, setPost] = useState()

  useEffect(() => {
    loadPost(slug).then(setPost)
  }, [slug])

  if (post === undefined) {
    return <div className="prose mx-auto">Loading...</div>
  }

  if (!post) {
    return <div className="prose mx-auto">Post not found.</div>
  }

  return (
    <article className="prose mx-auto p-4 bg-black/40 rounded">
      <h1>{post.title}</h1>
      <ReactMarkdown>{post.body}</ReactMarkdown>
    </article>
  )
}
