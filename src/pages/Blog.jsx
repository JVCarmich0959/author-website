import React, { useEffect, useState } from 'react'
import PostPreview from '../components/blog/PostPreview'
import Pagination from '../components/utility/Pagination'
import SearchBar from '../components/utility/SearchBar'
import SEO from '../components/utility/SEO'
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
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadPosts().then(setPosts)
  }, [])

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  const POSTS_PER_PAGE = 5
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE)
  const paginated = filtered.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  )

  return (
    <div className="container py-8">
      <SEO title="Blog" description="Latest updates from Melissa Michaels" />
      <SearchBar value={search} onChange={setSearch} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginated.map((post) => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  )
}
