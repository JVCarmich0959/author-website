import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function NoteModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const closeRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement;
    if (closeRef.current) {
      closeRef.current.focus();
    }

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
      if (previouslyFocused.current instanceof HTMLElement) {
        previouslyFocused.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="note-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="note-modal"
        ref={modalRef}
        aria-labelledby="note-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="note-header">
          <p className="note-kicker">Intro Note</p>
          <button
            type="button"
            className="note-close"
            onClick={onClose}
            ref={closeRef}
            aria-label="Close intro note"
          >
            ×
          </button>
        </div>
        <h2 id="note-title">Welcome to the guide</h2>
        <p className="note-body">
          This experience is built for one continuous scroll with gentle motion.
          If you prefer less animation, your settings will automatically reduce
          movement without hiding any content.
        </p>
        <p className="note-body">
          As you explore, keep an eye on the chapter rail for quick navigation.
        </p>
      </div>
    </div>,
    document.body
  );
}
