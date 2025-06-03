// src/components/hero/NewsletterCta.jsx

import { motion } from "motion/react";
import "./hero.css";

// [COMMENT] Animation config for sliding in the CTA from the right
const slideIn = {
  initial: { x: 200, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 2 } },
};

export default function NewsletterCta({ href = "#contact" }) {
  return (
    <motion.a
      href={href}
      variants={slideIn}
      initial="initial"
      animate="animate"
      className="contactLink"
      aria-label="Join the Bloodborne Bulletin" // [COMMENT] Improves accessibility by describing the purpose
    >
      <motion.div
        className="contactButton"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 2, ease: "linear" }}
        role="button"
        tabIndex={0}
        aria-hidden="false"
        onKeyDown={(e) => {
          // [COMMENT] Enable keyboard activation for accessibility
          if (e.key === "Enter" || e.key === " ") {
            document.location.href = href;
          }
        }}
      >
        <svg
          viewBox="0 0 200 200"
          width="150"
          height="150"
          role="img"
          aria-labelledby="newsletter-title"
        >
          <title id="newsletter-title">Join the Bloodborne Bulletin</title>
          {/* [COMMENT] Red circular background */}
          <circle cx="100" cy="100" r="90" fill="var(--blood-red)" />

          {/* [COMMENT] Invisible path for text to follow around the circle */}
          <path
            id="innerCirclePath"
            fill="none"
            d="M100,100 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0"
          />

          {/* [COMMENT] Text following the circular path */}
          <text className="circleText" aria-hidden="true">
            <textPath href="#innerCirclePath">
              JOIN THE BLOODBORNE BULLETIN
            </textPath>
          </text>
        </svg>

        {/* [COMMENT] Arrow icon in the center (hover cue) */}
        <div className="arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="50"
            height="50"
            fill="none"
            stroke="var(--antique-gold)" // [COMMENT] Updated from hardcoded black to design-consistent token
            strokeWidth="2"
            aria-hidden="true"
          >
            <line x1="6" y1="18" x2="18" y2="6" />
            <polyline points="9 6 18 6 18 15" />
          </svg>
        </div>
      </motion.div>
    </motion.a>
  );
}
