// src/components/about/About.jsx
import { useRef } from "react";
import "./about.css";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: 0.3 + i * 0.1, 
      duration: 0.6,
      ease: "easeOut"
    },
  }),
};

const socialVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      delay: 0.8, 
      duration: 0.6,
      ease: "easeOut"
    },
  },
};

const linkVariants = {
  hover: { 
    scale: 1.1,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

export default function About({ headshot, bio = [], blurb, socialLinks = {} }) {
  const ref = useRef();
  const inView = useInView(ref, { 
    margin: "-100px",
    once: true // Trigger animation only once for better performance
  });
  
  const { scrollYProgress } = useScroll({ 
    target: ref,
    offset: ["start end", "end start"]
  });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const bioArray = Array.isArray(bio) ? bio : [bio].filter(Boolean);

  // Default social links with customization support
  const defaultSocialLinks = {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    ...socialLinks
  };

  return (
    <section id="about" className="about" ref={ref}>
      <motion.div 
        className="about_progress" 
        style={{ scaleX: progress }}
        initial={{ scaleX: 0 }}
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
          initial={{ width: 0 }}
          animate={inView ? { width: "3rem" } : { width: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        />
      </motion.h2>

      {headshot && (
        <motion.img
          src={headshot}
          alt="Author headshot"
          className="headshot"
          loading="lazy"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ 
            delay: 0.2, 
            duration: 0.8,
            ease: "easeOut"
          }}
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
        variants={socialVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {defaultSocialLinks.instagram && (
          <motion.a
            href={defaultSocialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Visit Instagram profile"
          >
            <img src="/instagram.png" alt="Instagram" />
          </motion.a>
        )}
        
        {defaultSocialLinks.facebook && (
          <motion.a
            href={defaultSocialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Visit Facebook profile"
          >
            <img src="/facebook.png" alt="Facebook" />
          </motion.a>
        )}
        
        {defaultSocialLinks.twitter && (
          <motion.a
            href={defaultSocialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="twitter"
            variants={linkVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Visit Twitter profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="32"
              height="32"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.26 4.26 0 001.88-2.36 8.53 8.53 0 01-2.7 1.03 4.23 4.23 0 00-7.24 3.86A12 12 0 013 5.2a4.22 4.22 0 001.31 5.64 4.2 4.2 0 01-1.92-.53v.05a4.23 4.23 0 003.39 4.14 4.2 4.2 0 01-1.9.07 4.23 4.23 0 003.95 2.94A8.5 8.5 0 012 19.54 12 12 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.36 8.36 0 0022.46 6z" />
            </svg>
          </motion.a>
        )}
      </motion.div>
    </section>
  );
}