import React from 'react'

export default function AuthorBio({ compact = false }) {
  return (
    <div className="blog-panel flex items-center gap-4 my-6 p-4">
      <img
        src={`${import.meta.env.BASE_URL}p1.jpg`}
        alt="Melissa Michaels"
        className={`${compact ? 'w-12 h-12' : 'w-20 h-20'} rounded-full object-cover border border-[rgba(205,180,139,0.35)]`}
      />
      {!compact && (
        <p className="text-sm max-w-prose opacity-90">
          Melissa Michaels writes the Bloodborne Chronicles and loves sharing
          behind-the-scenes looks at her urban fantasy world.
        </p>
      )}
    </div>
  )
}
