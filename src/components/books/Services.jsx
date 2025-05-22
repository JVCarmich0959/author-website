// src/components/books/Services.jsx
import BookModelContainer from "./computer/BookModelContainer";
import "./services.css";

export default function BookHighlight() {
  return (
    <section className="services book-highlight">
      <div className="highlight-content">
        <BookModelContainer />
        <div className="book-description">
          <h2 className="book-title">Raven's Revenge</h2>
          <p>
            Launching the <em>Bloodborne Chronicles</em>—a dark tale of magic and retribution.
          </p>
        </div>
      </div>
    </section>
  );
}
