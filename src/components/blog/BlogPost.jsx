import React from 'react'
import ReactMarkdown from 'react-markdown'
import AuthorBio from './AuthorBio'

export default function BlogPost({ post }) {
  return (
    <article className="prose mx-auto p-4 bg-black/40 dark:bg-gray-100/20 rounded">
      <h1 className="text-3xl font-display mb-2">{post.title}</h1>
      <p className="text-sm opacity-75">{new Date(post.date).toLocaleDateString()}</p>
      <AuthorBio />
      <ReactMarkdown>{post.body}</ReactMarkdown>
      {post.tags && (
        <p className="mt-4">Tags: {post.tags.join(', ')}</p>
      )}
      <div className="mt-6 space-x-4 text-sm">
        <span>Share:</span>
        <a
          href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
      <div className="mt-10 text-center text-sm opacity-75">Comments coming soon...</div>
    </article>
  )
}
