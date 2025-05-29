// src/components/books/BookPreview.jsx
import BookModelContainer from "./computer/BookModelContainer";
import BookCarousel from "./BookCarousel";
import "./book-preview.css";

// Purchase controls are disabled until the book is officially released.
const isAvailable = false;

export default function BookPreview() {
  return (
    <section className="book-preview container mx-auto py-12">
      <div className="preview-content">
        <BookModelContainer />
        <div className="preview-description">
          <h2 className="preview-title text-3xl font-display">Raven's Revenge</h2>
          <p>
            Raven's Revenge kicks off the <em>Bloodborne Chronicles</em> with a gripping tale of sorcery and payback.
          </p>
          {isAvailable ? (
            <button
              className="mt-4 px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700 transition-colors"
              aria-label="Purchase Raven's Revenge"
            >
              Buy Now
            </button>
          ) : (
            <span
              className="mt-4 inline-block px-4 py-2 bg-gray-500 text-white rounded"
              aria-label="Upcoming release"
            >
              Coming Soon
            </span>
          )}
        </div>
      </div>
      <BookCarousel />
    </section>
  );
}
