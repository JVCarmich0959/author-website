import React from 'react';

// Books are not yet for sale; disable purchase actions for now.
const isAvailable = false;

const books = [
  { id: 1, title: "Raven's Revenge", cover: '/RR_Cover.jpg' },
  { id: 2, title: 'Abaculus III', cover: '/Abaculus.jpg' },
];

export default function BookCarousel() {
  return (
    <div className="overflow-x-auto flex gap-4 py-4 px-2 snap-x">
      {books.map((b) => (
        <div key={b.id} className="snap-center shrink-0 w-48 text-center">
          <img src={b.cover} alt={b.title} className="mb-2 rounded shadow" />
          <p className="font-display text-lg">{b.title}</p>
          {isAvailable ? (
            <button
              className="mt-2 px-3 py-1 bg-red-800 text-white rounded transition-colors hover:bg-red-700"
              aria-label={`Purchase ${b.title}`}
            >
              Buy Now
            </button>
          ) : (
            <span
              className="mt-2 inline-block px-3 py-1 bg-gray-500 text-white rounded"
              aria-label="Upcoming release"
            >
              Coming Soon
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
