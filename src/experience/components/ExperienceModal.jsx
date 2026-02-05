import React, { useEffect, useRef } from "react";

export default function ExperienceModal({ isOpen, title, children, onClose, labelledBy }) {
  const modalRef = useRef(null);
  const closeRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    previousFocus.current = document.activeElement;
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll(
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
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus.current instanceof HTMLElement) {
        previousFocus.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="experience-modal__overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div
        className="experience-modal"
        ref={modalRef}
        aria-labelledby={labelledBy}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="experience-modal__header">
          <div>
            <p className="experience-modal__kicker">Author Insights</p>
            <h2 id={labelledBy}>{title}</h2>
          </div>
          <button
            type="button"
            className="experience-modal__close"
            onClick={onClose}
            aria-label="Close modal"
            ref={closeRef}
          >
            ×
          </button>
        </header>
        <div className="experience-modal__body">{children}</div>
      </div>
    </div>
  );
}
