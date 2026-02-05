import React, { useCallback, useEffect, useState } from "react";

export default function ProgressIndicator({ chapters = [] }) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(chapters[0]?.id);

  useEffect(() => {
    const updateProgress = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const nextProgress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    if (!chapters.length) return undefined;
    if (typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    chapters.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [chapters]);

  const scrollToChapter = useCallback((id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const offset = 96;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <aside
      className="progress-indicator"
      aria-label="Scroll progress"
      role="navigation"
    >
      <div className="progress-track" aria-hidden="true">
        <span className="progress-bar" style={{ height: `${progress}%` }} />
      </div>
      <div className="progress-metric" aria-hidden="true">
        {Math.round(progress)}%
      </div>
      <ol className="progress-chapters">
        {chapters.map(({ id, number, label }) => {
          const isActive = activeId === id;
          return (
            <li key={id}>
              <button
                type="button"
                className={`progress-link${isActive ? " is-active" : ""}`}
                onClick={() => scrollToChapter(id)}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Jump to chapter ${number}: ${label}`}
              >
                <span className="progress-number">{number}</span>
                <span className="progress-label">{label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
