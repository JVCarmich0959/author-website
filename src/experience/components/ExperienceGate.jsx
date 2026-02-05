import React, { useEffect, useRef } from "react";

export default function ExperienceGate({ isOpen, onEnter }) {
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    buttonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="experience-gate" role="dialog" aria-modal="true" aria-labelledby="experience-gate-title">
      <div className="experience-gate__panel" ref={panelRef}>
        <p className="experience-gate__kicker">Interactive Guide</p>
        <h1 id="experience-gate-title">Enter the Bloodborne Signal</h1>
        <p>
          Move through six chapters to uncover the author’s world, unlock insights, and track your progress.
        </p>
        <button
          type="button"
          className="experience-gate__enter"
          onClick={onEnter}
          ref={buttonRef}
        >
          Enter experience
        </button>
      </div>
    </div>
  );
}
