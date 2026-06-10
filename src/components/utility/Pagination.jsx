import React from 'react'

export default function Pagination({ page, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <nav className="flex flex-wrap justify-center gap-2 mt-10" aria-label="Pagination">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="blog-btn px-3 py-1 rounded disabled:opacity-40"
        aria-label="Previous page"
      >
        ‹
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded blog-btn ${p === page ? 'blog-btn--active' : ''}`}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="blog-btn px-3 py-1 rounded disabled:opacity-40"
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  )
}
