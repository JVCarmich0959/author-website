// src/components/hero/Hero.jsx
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "motion/react";
import Nav from "./Nav";
import "./hero.css";

// Components
import Shape from "./Shape";
import NewsletterCta from "./NewsletterCta";

export default function Hero() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <Nav />

      <section id="home" className="hero">
        <div className="hSection left">
          <motion.h1
            initial={{ y: -100, opactiy: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1}}
            className="hTitle"
            >
              Melissa Michaels
              <br />
              <span> Urban Fantasy Author </span>
            </motion.h1>

            <motion.a
            href="#about"
            className="scroll"
            animate={{ y: [0, 5], opacity : [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            >
              {/* -your scroll-down SVG...*/}
            </motion.a>
        </div>
        
        <div className="bg">
          <Canvas>
            <Suspense fallback={null}>
              <Shape />
            </Suspense>
          </Canvas>
          <div className="hImg">
            <img src="/Hero_bg.png" alt="Hero background" />
          </div>
          <div className="hero-slogan">It's in the blood</div>
        </div>

        <motion.div
          className="to-top"
          onClick={scrollToTop}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Up-arrow SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="none"
              stroke="var(--color-antique-gold)"
              strokeWidth="2"
              >
                <path d="M20 30V10M10 20l10-10 10 10" />
              </svg>
        </motion.div>
      </section>
    </>
  )
}