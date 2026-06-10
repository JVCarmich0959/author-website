import React from 'react'
import { Link } from 'react-router-dom'

export default function PostPreview({ post }) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article className="blog-card flex flex-col p-6">
      {post.thumbnail && (
        <Link to={`/blog/${post.slug}`} className="block mb-4 -mt-2 -mx-2">
          <img src={post.thumbnail} alt="" className="rounded-lg w-full object-cover max-h-44" />
        </Link>
      )}
      {formattedDate && <p className="blog-meta mb-2">{formattedDate}</p>}
      <h2 className="text-xl mb-3 leading-snug">
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="text-sm opacity-80 mb-4 line-clamp-4">{post.summary}</p>
      <div className="mt-auto flex items-end justify-between gap-3">
        <Link to={`/blog/${post.slug}`} className="blog-meta hover:opacity-100">
          Read the dispatch →
        </Link>
        {post.tags?.length > 0 && (
          <ul className="flex flex-wrap gap-2 justify-end">
            {post.tags.map((tag) => (
              <li key={tag} className="blog-chip text-xs px-2 py-1 rounded-full">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
