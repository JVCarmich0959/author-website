import React from 'react';

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
          <button className="mt-2 px-3 py-1 bg-red-800 text-white rounded transition-colors hover:bg-red-700">Buy Now</button>
        </div>
      ))}
    </div>
  );
}
