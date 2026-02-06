import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange, className = '' }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={`flex justify-center gap-2 ${className}`.trim()} aria-label="Pagination">
      {pages.map((pageNumber) => {
        const isCurrent = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            aria-current={isCurrent ? 'page' : undefined}
            className={`px-3 py-1 rounded-md border transition-colors ${
              isCurrent
                ? 'blog-button border-red-700'
                : 'blog-button--ghost border-[rgba(205,180,139,0.35)] hover:bg-[rgba(205,180,139,0.22)]'
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
    </nav>
  );
}
