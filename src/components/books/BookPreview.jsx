// src/components/books/BookPreview.jsx
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import BookModelContainer from "./computer/BookModelContainer";
import "./book-preview.css";

export default function BookPreview({ as: Wrapper = "section", id }) {
  const [showModal, setShowModal] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  const closeModal = useCallback(() => setShowModal(false), []);

  // Scroll lock on modal open
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  // Escape key handler
  useEffect(() => {
    if (!showModal) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showModal, closeModal]);

  // Focus trap inside modal
  useEffect(() => {
    if (!showModal) return;

    const focusableSelectors = 
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector(".modal-content");
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(focusableSelectors);
    if (focusableElements.length === 0) return;

    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    const trapFocus = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else { // Tab
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener("keydown", trapFocus);
    firstEl.focus();

    return () => document.removeEventListener("keydown", trapFocus);
  }, [showModal]);

  return (
    <>
      <Wrapper
        className="book-preview"
        aria-label="Book preview section"
        {...(id ? { id } : {})}
      >
        <div className="preview-content">
          <div className="book-model-wrapper">
            <BookModelContainer onLoad={() => setModelLoaded(true)} />
          </div>

          <div className="preview-description">
            <p className="preview-eyebrow">Book One · The Bloodborne Chronicles</p>
            <h2 className="preview-title">Raven's Revenge</h2>
            <ul className="preview-tags" aria-label="Genre">
              <li>Urban Fantasy</li>
              <li>Military Thriller</li>
            </ul>
            <p className="preview-teaser">
              Raven Andros sees the world in heat signatures and flight paths, in the clean{" "}
              geometry of kill zones and extraction points—until the day she sees something{" "}
              that moves too fast to be human...
            </p>
            <div className="preview-actions">
              <button
                className="read-more-btn"
                aria-expanded={showModal}
                aria-controls="modal-content"
                onClick={() => setShowModal(true)}
              >
                {showModal ? "Close Preview" : "Read Full Preview"}
              </button>
              <a
                href="#contact"
                className="preview-secondary-btn"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Get release news →
              </a>
            </div>
          </div>
        </div>
      </Wrapper>

      {showModal &&
        createPortal(
          <div
            className="modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={closeModal}
          >
            <div
              id="modal-content"
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={closeModal}
                aria-label="Close preview modal"
                autoFocus
              >
                ×
              </button>

              <h2 id="modal-title" className="modal-title">
                Raven's Revenge
              </h2>

              <article className="modal-text">
                <p>
                  Raven Andros sees the world in heat signatures and flight paths, in the clean{" "}
                  geometry of kill zones and extraction points, in the way a target moves through{" "}
                  crosshairs—until the day she sees something that moves too fast to be human,{" "}
                  too wrong to be real, caught for three frames on thermal before the feed cuts{" "}
                  to static and her team is gone and she is alone with the silence that follows{" "}
                  orders executed cleanly, perfectly, finally.
                </p>

                <p className="mandatory-leave">
                  "Mandatory Leave," they call it, the way they called her father's breakdown a{" "}
                  stress reaction, the way they called her grandfather's nightmares shell shock,{" "}
                  the way the Andros line has always carried something that doesn't fit in{" "}
                  after-action reports.
                </p>

                <p>
                  So they send her home to the family she hasn't spoken to in years, hasn't{" "}
                  wanted to speak to since the day she learned that some distances can't be{" "}
                  measured in klicks or flight time but only in the space between what you{" "}
                  remember and what really happened, between the shadows that should fall east{" "}
                  at sunset but somehow point north toward the old house where her grandmother{" "}
                  used to speak in languages that weren't quite Greek, weren't quite anything{" "}
                  at all.
                </p>

                <p>
                  Here where memories feel staged like training exercises, where the comfort{" "}
                  comes only from Lt. Lisa Hammond's voice patching through from orbit—that{" "}
                  tether to something real, something clean, something that follows the laws{" "}
                  of physics and chain of command—except Lisa's voice sounds further away each{" "}
                  day, like she's speaking not just from space but from time itself, from some{" "}
                  before when the world made sense and heat signatures told you everything you{" "}
                  needed to know about what was hunting you.
                </p>
              </article>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
