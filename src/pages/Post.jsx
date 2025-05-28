import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BlogPost from '../components/blog/BlogPost'
import SEO from '../components/utility/SEO'
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
    <>
      <SEO title={post.title} description={post.summary} />
      <BlogPost post={post} />
    </>
  )
}
