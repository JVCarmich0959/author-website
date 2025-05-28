// src/components/books/BookPreview.jsx
import BookModelContainer from "./computer/BookModelContainer";
import "./book-preview.css";

export default function BookPreview() {
  return (
    <section className="book-preview">
      <div className="preview-content">
        <BookModelContainer />
        <div className="preview-description">
          <h2 className="preview-title">Raven's Revenge</h2>
          <p>
            Raven's Revenge kicks off the <em>Bloodborne Chronicles</em> with a gripping tale of sorcery and payback.
          </p>
        </div>
      </div>
    </section>
  );
}
