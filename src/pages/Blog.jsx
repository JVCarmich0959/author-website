
import React from 'react'
import ReactMarkdown from 'react-markdown'
import Nav from '../components/hero/Nav'

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import matter from 'gray-matter'


const modules = import.meta.glob('../posts/*.md', { as: 'raw' })

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

    <div className="container blog-page">
      <Nav />
      <main className="blog">
        {posts.map((post) => (
          <article key={post.id} className="prose mx-auto mb-8">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        ))}
      </main>

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
