import React, { useEffect, useRef } from "react";

export default function IntroGate({ isOpen, onEnter, onOpenNote }) {
  const enterRef = useRef(null);
  const gateRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "unset";
      return;
    }

    document.body.style.overflow = "hidden";
    if (enterRef.current) {
      enterRef.current.focus();
    }

    const handleKeyDown = (event) => {
      if (event.key !== "Tab" || !gateRef.current) return;
      const focusable = gateRef.current.querySelectorAll(
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
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="intro-gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
    >
      <div className="intro-panel" ref={gateRef}>
        <p className="intro-kicker">Scrollytelling Guide</p>
        <h1 className="intro-title" id="intro-title">
          Enter the Bloodborne Signal
        </h1>
        <p className="intro-body">
          Move through the chapters to uncover the author, the stories, and the
          world they inhabit.
        </p>
        <div className="intro-actions">
          <button type="button" className="intro-primary" onClick={onEnter} ref={enterRef}>
            Enter site
          </button>
          <button type="button" className="intro-secondary" onClick={onOpenNote}>
            Read the note
          </button>
        </div>
        <p className="intro-footnote">Tip: Use the chapter rail to jump ahead.</p>
      </div>
    </div>
  );
}
