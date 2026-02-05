import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export default function Chapter({
  id,
  number,
  title,
  statement,
  body,
  align = "left",
  children,
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const bodyMarkup = useMemo(() => {
    if (!body) return null;
    if (Array.isArray(body)) {
      return body.map((line, index) => <p key={`${id}-body-${index}`}>{line}</p>);
    }
    return <p>{body}</p>;
  }, [body, id]);

  return (
    <section
      id={id}
      ref={ref}
      className={`scrolly-chapter scrolly-chapter--${align}${isVisible ? " is-visible" : ""}`}
      data-chapter={number}
      aria-labelledby={`${id}-title`}
    >
      <div className="chapter-grid">
        <div className="chapter-meta">
          <span className="chapter-number">{number}</span>
          <h2 id={`${id}-title`} className="chapter-title">
            {title}
          </h2>
          {statement && <p className="chapter-statement">{statement}</p>}
          {bodyMarkup}
        </div>
        <div className="chapter-media">{children}</div>
      </div>
    </section>
  );
}
