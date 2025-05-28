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
            Launching the <em>Bloodborne Chronicles</em>—a dark tale of magic and retribution.
          </p>
        </div>
      </div>
    </section>
  );
}
