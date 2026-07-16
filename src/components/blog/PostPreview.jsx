import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, MessageCircle } from 'lucide-react'
import { readingMinutes } from '../../lib/readingTime'
import DispatchThumb from './DispatchThumb'

export default function PostPreview({ post, commentCount }) {
  const kickerDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : null
  const tag = post.tags?.[0]

  return (
    <article className="dispatch-card">
      <Link
        to={`/blog/${post.slug}`}
        className="dispatch-card-media"
        aria-hidden="true"
        tabIndex={-1}
      >
        {post.featuredImage ? (
          <img src={post.featuredImage} alt="" loading="lazy" />
        ) : (
          <DispatchThumb slug={post.slug} title={post.title} />
        )}
      </Link>
      <div className="dispatch-card-body">
        <p className="dispatch-card-kicker">{[tag, kickerDate].filter(Boolean).join(' · ')}</p>
        <h3 className="dispatch-card-title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="dispatch-card-excerpt">{post.summary}</p>
        <div className="dispatch-card-footer">
          <span>
            <Clock size={12} aria-hidden="true" />
            {readingMinutes(post.body)} min
          </span>
          {typeof commentCount === 'number' && (
            <span>
              <MessageCircle size={12} aria-hidden="true" />
              {commentCount}
            </span>
          )}
          {tag && <span className="dispatch-card-tag">{tag}</span>}
        </div>
      </div>
    </article>
  )
}
