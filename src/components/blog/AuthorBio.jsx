import React from 'react'

export default function AuthorBio({ compact = false }) {
  return (
    <div className="flex items-center gap-4 my-4">
      <img
        src={`${import.meta.env.BASE_URL}p1.jpg`}
        alt="Melissa Michaels"
        className={compact ? 'w-12 h-12 rounded-full' : 'w-20 h-20 rounded-full'}
      />
      {!compact && (
        <p className="text-sm max-w-prose">
          Melissa Michaels writes the Bloodborne Chronicles and loves sharing
          behind-the-scenes looks at her urban fantasy world.
        </p>
      )}
    </div>
  )
}
