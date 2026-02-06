import React, { useMemo } from "react";

export default function ExperienceOverlay({
  chapters,
  activeId,
  onNavigate,
  onOpenNote,
  insightsFound,
  insightsTotal,
}) {
  const activeIndex = useMemo(
    () => chapters.findIndex((chapter) => chapter.id === activeId),
    [chapters, activeId]
  );

  const activeNumber = activeIndex >= 0 ? chapters[activeIndex].number : "01";

  return (
    <aside className="experience-overlay" aria-label="Experience controls">
      <div className="experience-overlay__top">
        <div>
          <p className="experience-overlay__label">Active chapter</p>
          <div className="experience-overlay__chapter">
            <span>{activeNumber}</span>
            <span className="experience-overlay__divider">/</span>
            <span>{chapters.length.toString().padStart(2, "0")}</span>
          </div>
        </div>
        <button type="button" className="experience-overlay__note" onClick={onOpenNote}>
          Author’s Note
        </button>
      </div>

      <nav aria-label="Chapter navigation">
        <ol className="experience-overlay__nav">
          {chapters.map((chapter, index) => {
            const isActive = chapter.id === activeId;
            return (
              <li key={chapter.id}>
                <button
                  type="button"
                  className={`experience-overlay__nav-button${isActive ? " is-active" : ""}`}
                  onClick={() => onNavigate(chapter.id)}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`Jump to chapter ${index + 1}: ${chapter.title}`}
                >
                  {chapter.number}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="experience-overlay__insights" aria-live="polite">
        <span>Insights found</span>
        <strong>
          {insightsFound}/{insightsTotal}
        </strong>
      </div>
    </aside>
  );
}
