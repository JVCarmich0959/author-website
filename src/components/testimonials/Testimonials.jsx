import React from 'react';

const testimonials = [
  {
    id: 1,
    quote: 'A thrilling ride from start to finish!',
    author: 'Jane Reviewer',
  },
  {
    id: 2,
    quote: 'Could not put it down, highly recommended.',
    author: 'Book Blogger',
  },
];

export default function Testimonials() {
  return (
    <section className="container mx-auto py-12 text-center" aria-label="Testimonials">
      <h2 className="text-2xl mb-6 font-display">What Readers Are Saying</h2>
      <ul className="space-y-6">
        {testimonials.map((t) => (
          <li key={t.id} className="max-w-xl mx-auto">
            <blockquote className="italic">“{t.quote}”</blockquote>
            <cite className="block mt-2 text-sm text-gray-300">— {t.author}</cite>
          </li>
        ))}
      </ul>
    </section>
  );
}
