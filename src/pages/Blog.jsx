import React, { useEffect, useState } from 'react'
import matter from 'gray-matter'
import { Buffer } from 'buffer'
import PostPreview from '../components/blog/PostPreview'
import Pagination from '../components/utility/Pagination'
import SearchBar from '../components/utility/SearchBar'
import SEO from '../components/utility/SEO'

const modules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default' })
window.Buffer = window.Buffer || Buffer

async function loadPosts() {
  const entries = await Promise.all(
    Object.entries(modules).map(async ([path, loader]) => {
      const slug = path.split('/').pop().replace('.md', '')
      const content = await loader()
      const { data } = matter(content)
      return { slug, ...data }
    })
  )
  return entries.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const postsPerPage = 5

  useEffect(() => {
    loadPosts().then(setPosts)
  }, [])

  const filtered = posts.filter((p) => {
    const text = `${p.title} ${p.summary} ${(p.tags || []).join(' ')}`.toLowerCase()
    return text.includes(search.toLowerCase())
  })

  const totalPages = Math.ceil(filtered.length / postsPerPage)
  const start = (page - 1) * postsPerPage
  const visible = filtered.slice(start, start + postsPerPage)

  return (
    <div className="container mx-auto p-4">
      <SEO title="Blog" />
      <SearchBar value={search} onChange={setSearch} />
      <div className="grid gap-6">
        {visible.map((post) => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  )
}
