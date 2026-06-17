// src/components/hero/Hero.jsx
import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useReducedMotion } from "motion/react";
import Shape from "./Shape";
import "./hero.css";

const LoadingFallback = () => (
  <div className="canvas-loading" aria-hidden="true">
    <div className="loading-spinner" />
  </div>
);

const ScrollIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 13l3 3 7-7" />
    <path d="M12 17V3" />
  </svg>
);

export default function Hero({ as: Wrapper = "section", id = "home" }) {
  const prefersReducedMotion = useReducedMotion();
  const [showToTop, setShowToTop] = useState(false);

  // the scroll-to-top button only appears once the hero is out of view
  useEffect(() => {
    const onScroll = () => setShowToTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = useCallback((targetId) => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToTop();
    }
  }, [scrollToTop]);

  const titleVariants = useMemo(() => ({
    initial: { y: prefersReducedMotion ? 0 : -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: prefersReducedMotion ? 0.3 : 1, ease: "easeOut" }
  }), [prefersReducedMotion]);

  const scrollVariants = useMemo(() => ({
    animate: prefersReducedMotion 
      ? { opacity: 1 }
      : { y: [0, 5], opacity: [0, 1, 0] },
    transition: prefersReducedMotion 
      ? { duration: 0.3 }
      : { repeat: Infinity, duration: 4, ease: "easeInOut" }
  }), [prefersReducedMotion]);

  const buttonVariants = useMemo(() => ({
    hover: prefersReducedMotion ? {} : { scale: 1.2 },
    tap: prefersReducedMotion ? {} : { scale: 0.95 }
  }), [prefersReducedMotion]);

  const wrapperProps = {
    className: "hero",
    ...(id ? { id } : {}),
  };

  return (
    <>
      <Wrapper {...wrapperProps}>
        <header className="hSection left">
          <motion.div className="hero-intro" {...titleVariants}>
            <p className="hero-eyebrow">Urban Fantasy · The Bloodborne Chronicles</p>
            <h1 className="hTitle">Melissa Michaels</h1>
            <p className="hero-subtitle">
              Where ancient bloodlines meet modern warfare — and the shadows
              hunt back.
            </p>
            <div className="hero-cta">
              <button
                type="button"
                className="hero-btn hero-btn--primary"
                onClick={() => scrollToId("services")}
              >
                Read a Sample
              </button>
              <button
                type="button"
                className="hero-btn hero-btn--ghost"
                onClick={() => scrollToId("about")}
              >
                Meet Melissa
              </button>
            </div>
          </motion.div>

          <motion.a
            href="#services"
            className="scroll"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("services");
            }}
            {...scrollVariants}
            aria-label="Scroll to the book preview"
          >
            <ScrollIcon />
          </motion.a>
        </header>

        <div className="bg" role="img" aria-label="Hero background with 3D effects">
          <Canvas
            style={{ position: "absolute", inset: 0, zIndex: -2 }}
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
            gl={{ 
              antialias: false, 
              alpha: true,
              powerPreference: "high-performance"
            }}
          >
            <Suspense fallback={<LoadingFallback />}>
              <Shape />
            </Suspense>
          </Canvas>

          <div className="hImg">
            <img
              src={`${import.meta.env.BASE_URL}Hero_bg.png`}
              alt="Urban fantasy themed hero background featuring mystical elements"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <p className="sr-only">Tagline: It's in the blood</p>

          <div className="hero-fade" aria-hidden="true" />
        </div>

        <motion.button
          className={`to-top${showToTop ? " to-top--visible" : ""}`}
          onClick={scrollToTop}
          onKeyDown={handleKeyDown}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          aria-label="Scroll to top of page"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="none"
            stroke="var(--antique-gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 30V10M10 20l10-10 10 10" />
          </svg>
        </motion.button>
      </Wrapper>
    </>
  );
}
