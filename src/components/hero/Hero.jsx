// src/components/hero/Hero.jsx
import React, { Suspense, useCallback, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useReducedMotion } from "motion/react";
import Shape from "./Shape";
import NewsletterModal from "./NewsletterModal";
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
  
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToTop();
    }
  }, [scrollToTop]);

  const slogan = useMemo(() => ["It's", "in", "the", "blood"], []);

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

  const getSloganAnimation = useCallback((word, index) => {
    const isBlood = word === "blood";
    
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: index * 0.2, duration: 0.3 }
      };
    }

    return {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        scale: isBlood ? [1, 1.2, 1] : 1,
      },
      transition: {
        delay: index * 0.8,
        duration: 0.6,
        repeat: isBlood ? 3 : 0,
        ease: "easeInOut",
      }
    };
  }, [prefersReducedMotion]);

  const getSloganStyle = useCallback((word) => {
    const isBlood = word === "blood";
    
    return {
      animation: !prefersReducedMotion && isBlood ? "flicker 2s infinite" : "none",
      textShadow: "0 0 6px rgba(0, 0, 0, 0.8)",
      color: isBlood ? "var(--blood-red)" : "inherit",
    };
  }, [prefersReducedMotion]);

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
          <motion.h1
            {...titleVariants}
            className="hTitle"
          >
            Melissa Michaels
            <br />
            <span className="subtitle"> Urban Fantasy Author </span>
          </motion.h1>

          <motion.a
            href="#about"
            className="scroll"
            {...scrollVariants}
            aria-label="Scroll to About section"
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
              src="/Hero_bg.png"
              alt="Urban fantasy themed hero background featuring mystical elements"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="hero-slogan" role="presentation" aria-hidden="true">
            {slogan.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                {...getSloganAnimation(word, i)}
                style={getSloganStyle(word)}
              >
                {word}{" "}
              </motion.span>
            ))}
          </div>
          
          <p className="sr-only">Tagline: It's in the blood</p>
        </div>

        <motion.button
          className="to-top"
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

      <NewsletterModal />
    </>
  );
}
