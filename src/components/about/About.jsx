// src/components/about/About.jsx
import { useRef, useCallback, useMemo } from "react";
import "./about.css";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Animation variants with reduced motion support
const createVariants = (shouldReduceMotion) => ({
  heading: {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: shouldReduceMotion ? 0.2 : 0.6 } 
    },
  },
  
  content: {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : 0.3 + i * 0.1,
        duration: shouldReduceMotion ? 0.2 : 0.6,
        ease: "easeOut",
      },
    }),
  },
  
  social: {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : 0.8,
        duration: shouldReduceMotion ? 0.2 : 0.6,
        ease: "easeOut",
      },
    },
  },
  
  link: {
    hover: shouldReduceMotion ? {} : { scale: 1.1, transition: { duration: 0.2 } },
    tap: shouldReduceMotion ? {} : { scale: 0.95 },
  },
  
  image: {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.8, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : 0.2,
        duration: shouldReduceMotion ? 0.2 : 0.8,
        ease: "easeOut"
      }
    },
  }
});

// Social media icons as SVG components for better performance and customization
const SocialIcons = {
  Instagram: ({ className, ...props }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="32"
      height="32"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  
  Facebook: ({ className, ...props }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="32"
      height="32"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  
  Twitter: ({ className, ...props }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="32"
      height="32"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.26 4.26 0 001.88-2.36 8.53 8.53 0 01-2.7 1.03 4.23 4.23 0 00-7.24 3.86A12 12 0 013 5.2a4.22 4.22 0 001.31 5.64 4.2 4.2 0 01-1.92-.53v.05a4.23 4.23 0 003.39 4.14 4.2 4.2 0 01-1.9.07 4.23 4.23 0 003.95 2.94A8.5 8.5 0 012 19.54 12 12 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.36 8.36 0 0022.46 6z" />
    </svg>
  )
};

/**
 * Renders the About section of the webpage, featuring an author's headshot, biography, blurb,
 * and social media links. Animations are applied to various elements as they come into view.
 * Respects user's reduced motion preferences.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.headshot - The URL of the author's headshot image.
 * @param {Array<string>} props.bio - An array of HTML strings representing the author's biography.
 * @param {string} props.blurb - A short italicized blurb about the author.
 * @param {Object} props.socialLinks - An object containing URLs for social media profiles.
 * @param {string} [props.socialLinks.instagram] - URL for the Instagram profile.
 * @param {string} [props.socialLinks.facebook] - URL for the Facebook profile.
 * @param {string} [props.socialLinks.twitter] - URL for the Twitter profile.
 * @param {string} [props.authorName="Melissa Michaels"] - The author's name for accessibility.
 * @param {string} [props.authorDescription="author of the Bloodborne Chronicles"] - Description for alt text.
 * 
 * @returns {JSX.Element} A motion-enhanced section element displaying the author's details.
 */
export default function About({ 
  as: Wrapper = "section",
  id = "about",
  headshot, 
  bio = [], 
  blurb, 
  socialLinks = {},
  authorName = "Melissa Michaels",
  authorDescription = "author of the Bloodborne Chronicles"
}) {
  const ref = useRef();
  const shouldReduceMotion = useReducedMotion();
  
  const inView = useInView(ref, { 
    margin: "-100px",
    once: true // Trigger animation only once for better performance
  });
  
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start end", "end start"] 
  });
  
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Memoize processed bio array
  const bioArray = useMemo(() => {
    return Array.isArray(bio) ? bio.filter(Boolean) : [bio].filter(Boolean);
  }, [bio]);

  // Memoize animation variants based on reduced motion preference
  const variants = useMemo(() => createVariants(shouldReduceMotion), [shouldReduceMotion]);

  // Memoize social links with defaults
  const processedSocialLinks = useMemo(() => ({
    instagram: socialLinks.instagram || null,
    facebook: socialLinks.facebook || null,
    twitter: socialLinks.twitter || null,
  }), [socialLinks]);

  // Error boundary for headshot loading
  const handleImageError = useCallback((e) => {
    console.warn('Failed to load author headshot:', e.target.src);
    e.target.style.display = 'none';
  }, []);

  const renderSocialLink = useCallback((platform, url, Icon) => {
    if (!url) return null;
    
    return (
      <motion.a
        key={platform}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={platform.toLowerCase()}
        variants={variants.link}
        whileHover="hover"
        whileTap="tap"
        aria-label={`Visit ${authorName}'s ${platform} profile`}
      >
        <Icon />
      </motion.a>
    );
  }, [variants.link, authorName]);

  const wrapperProps = {
    className: "about",
    ref,
    "aria-labelledby": "about-title",
    role: "region",
    ...(id ? { id } : {}),
  };

  return (
    <Wrapper {...wrapperProps}>
      <motion.div
        className="about_progress"
        style={{ scaleX: progress }}
        initial={{ scaleX: 0 }}
        aria-hidden="true"
      />

      <motion.h2
        id="about-title"
        className="aboutTitle"
        variants={variants.heading}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        About {authorName}
        <motion.span
          className="aboutTitle_underline"
          initial={{ width: 0 }}
          animate={inView ? { width: "3rem" } : { width: 0 }}
          transition={{ 
            delay: shouldReduceMotion ? 0 : 0.4, 
            duration: shouldReduceMotion ? 0.2 : 0.8, 
            ease: "easeOut" 
          }}
          aria-hidden="true"
        />
      </motion.h2>

      {headshot && (
        <motion.img
          src={headshot}
          alt={`${authorName}, ${authorDescription}`}
          className="headshot"
          loading="lazy"
          variants={variants.image}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          onError={handleImageError}
        />
      )}

      <div className="aboutContent" role="main">
        {bioArray.map((text, i) => (
          <motion.p
            key={i}
            custom={i}
            variants={variants.content}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        ))}
        
        {blurb && (
          <motion.p
            className="aboutBlurb"
            variants={variants.content}
            custom={bioArray.length}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <em>{blurb}</em>
          </motion.p>
        )}
      </div>

      <motion.nav
        className="socialLinks"
        variants={variants.social}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        aria-label={`${authorName}'s social media profiles`}
        role="navigation"
      >
        {renderSocialLink('Instagram', processedSocialLinks.instagram, SocialIcons.Instagram)}
        {renderSocialLink('Facebook', processedSocialLinks.facebook, SocialIcons.Facebook)}
        {renderSocialLink('Twitter', processedSocialLinks.twitter, SocialIcons.Twitter)}
      </motion.nav>
    </Wrapper>
  );
}
