// src/components/books/Services.jsx
import BookModelContainer from "./computer/BookModelContainer";
import "./services.css";

export default function Services() {
  return (
    <section className="services simple-service">
      <div className="serviceInner">
        <BookModelContainer />
        <p className="bookBlurb">
          <strong>Raven's Revenge</strong> launches the Bloodborne Chronicles—a
          dark tale of magic and retribution.
        </p>
      </div>
    </section>
  );
}
