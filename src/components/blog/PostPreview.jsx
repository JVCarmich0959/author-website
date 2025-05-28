import React from 'react'
import { Link } from 'react-router-dom'

export default function PostPreview({ post }) {
  return (
    <article className="bg-black/40 dark:bg-gray-100/20 p-6 rounded shadow hover:shadow-lg transition">
      {post.thumbnail && (
        <Link to={`/blog/${post.slug}`} className="block mb-4">
          <img src={post.thumbnail} alt="" className="rounded" />
        </Link>
      )}
      <h2 className="text-xl mb-2">
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="text-sm opacity-75 mb-4">
        {new Date(post.date).toLocaleDateString()}
      </p>
      <p className="mb-2">{post.summary}</p>
      {post.tags && (
        <ul className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag) => (
            <li key={tag} className="text-xs bg-gray-700/50 px-2 py-1 rounded">
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
