import React from 'react'

export default function Pagination({ page, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <nav className="flex justify-center gap-2 mt-8" aria-label="Pagination">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded ${
            p === page ? 'bg-red-800 text-white' : 'bg-black/50'
          }`}
        >
          {p}
        </button>
      ))}
    </nav>
  )
}
