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
codex/modify-about-component-to-accept-props
            {blurb}
          </motion.p>
        )}
      </div>

      <motion.div
        className="subscribeForm"
        variants={formVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <h3>Join the Raven Post</h3>
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

            <h3>Join the Bloodborne Bulletin</h3>
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
 main
}
