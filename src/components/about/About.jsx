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
  hidden: {opacity: 0 },
  visible: i => ({
    opacity: 1, 
    transition: { delay: 0.3 + i * 0.2, duration: 0.8 }
  })
};

const formVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1, scale: 1,
    transition: { delay: 0.9, duration: 0.8, ease: "easeInOut" }
  }
};

export default function About() {
  const ref = useRef();
  const inView = useInView(ref, { margin: "-100px" });
// scroll progress inside this section
const { scrollYProgress } = useScroll({ target: ref });
const progress = useTransform(scrollYProgress, [0, 1], [ "0%", "100%"]);

return (
  <section id="about" className="about" ref={ref}>
    {/* little gold progress bar */}
    <motion.div
      className="about_progress"
      style={{ scaleX: progress }}
    />

    <motion.h2
       className="aboutTitle"
       variants={headingVariants}
       initial="hidden"
       animate={inView ? "visible" : "hidden"}
       >
        About the Author
        <motion.span
          className="aboutTitle_underline"
          initial={{ width: 0}}
          animate={inView ? { width: "3rem" }: {}}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          />
       </motion.h2>

       <div className="aboutContent">
        {[
          'Melissa Michaels is an author, reader, and aspirng novelist. Her love of writing grew out of her passion for reading, her tastes leaning towards Urban Fantasy.',
          'She is the author of <i>Ravens Transformation</i>, an Urban Fantasy short story featured in',
          'Abaculus III  a collection of international tales of science fiction, fantasy, and horror.',
          'Melissa is a proud member of the North Carolina Writers Network'
        ].map((text, i) => (
          <motion.p
            key={i}
            custom={i}
            variants={contentVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        ))} 
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
                < input
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