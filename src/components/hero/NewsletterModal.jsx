// src/components/hero/NewsletterModal.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./hero.css"; // Ensure you add styles shown below

export default function NewsletterModal({ href = "#contact" }) {
  const [visible, setVisible] = useState(false);

  // [COMMENT] Scroll listener triggers when 60% down the page
  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.6;
      if (window.scrollY > triggerPoint && !visible) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="newsletter-popup"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 100 }}
          role="dialog"
          aria-modal="true"
          aria-label="Newsletter sign-up"
        >
          <div className="newsletter-content">
            <p>📜 Join the Bloodborne Bulletin</p>
            <a href={href} className="newsletter-button">
              Count me in
            </a>
            <button
              onClick={() => setVisible(false)}
              aria-label="Dismiss newsletter prompt"
              className="newsletter-close"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
