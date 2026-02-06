import React from 'react';
import { Link } from 'react-router-dom';

export default function PostPreview({ post, className = '' }) {
  return (
    <article className={`blog-card p-6 ${className}`.trim()}>
      {post.thumbnail && (
        <Link to={`/blog/${post.slug}`} className="block mb-4">
          <img src={post.thumbnail} alt="" className="rounded" />
        </Link>
      )}
      <h2 className="text-xl mb-2 blog-heading">
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="text-sm blog-muted mb-4">{new Date(post.date).toLocaleDateString()}</p>
      <p className="mb-2">{post.summary}</p>
      {post.tags && (
        <ul className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag) => (
            <li key={tag} className="text-xs px-2 py-1 rounded border border-[rgba(205,180,139,0.25)] bg-[rgba(205,180,139,0.1)]">
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
