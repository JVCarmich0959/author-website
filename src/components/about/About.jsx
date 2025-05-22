// src/components/about/About.jsx
import { useRef } from "react";
import "./about.css";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: 0.3 + i * 0.2, duration: 0.8 },
  }),
};

const formVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.9, duration: 0.8, ease: "easeInOut" },
  },
};

export default function About({ headshot, bio = [], blurb }) {
  const ref = useRef();
  const inView = useInView(ref, { margin: "-100px" });
  // scroll progress inside this section
  const { scrollYProgress } = useScroll({ target: ref });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const bioArray = Array.isArray(bio) ? bio : [bio].filter(Boolean);

  return (
    <section id="about" className="about" ref={ref}>
      {/* little gold progress bar */}
      <motion.div className="about_progress" style={{ scaleX: progress }} />

      <motion.h2
        className="aboutTitle"
        variants={headingVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        About the Author
        <motion.span
          className="aboutTitle_underline"
          initial={{ width: 0 }}
          animate={inView ? { width: "3rem" } : {}}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        />
      </motion.h2>

      {headshot && (
        <motion.img
          src={headshot}
          alt="Author headshot"
          className="headshot"
          loading="lazy"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        />
      )}

      <div className="aboutContent">
        {bioArray.map((text, i) => (
          <motion.p
            key={i}
            custom={i}
            variants={contentVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        ))}
        {blurb && (
          <motion.p
            className="aboutBlurb"
            variants={contentVariants}
            custom={bioArray.length}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {blurb}
          </motion.p>
        )}
      </div>

      <motion.div
        className="socialLinks"
        variants={contentVariants}
        custom={bioArray.length + 1}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <img src="/instagram.png" alt="Instagram" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <img src="/facebook.png" alt="Facebook" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="twitter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="currentColor"
          >
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.26 4.26 0 001.88-2.36 8.53 8.53 0 01-2.7 1.03 4.23 4.23 0 00-7.24 3.86A12 12 0 013 5.2a4.22 4.22 0 001.31 5.64 4.2 4.2 0 01-1.92-.53v.05a4.23 4.23 0 003.39 4.14 4.2 4.2 0 01-1.9.07 4.23 4.23 0 003.95 2.94A8.5 8.5 0 012 19.54 12 12 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.36 8.36 0 0022.46 6z" />
          </svg>
        </a>
      </motion.div>

      <motion.div
        className="subscribeForm"
        variants={formVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <h3>Subscribe to the Newsletter</h3>
        <form
          action="https://melissamichaelswordpress.com"
          method="POST"
          target="_blank"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        <p className="subText">Join 83 other subscribers</p>
      </motion.div>
    </section>
  );
}
