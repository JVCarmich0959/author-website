import React, { lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from './components/utility/SEO'
import LazyLoad from "react-lazyload";

const Hero = lazy(() => import("./components/hero/Hero"));
const Services = lazy(() => import("./components/books/BookPreview"));
const About = lazy(() => import("./components/about/About"));
const Newsletter = lazy(() => import("./components/newsletter/Newsletter"));
const FeaturedPost = lazy(() => import("./components/blog/FeaturedPost"));
const Testimonials = lazy(() => import("./components/testimonials/Testimonials"));

const App = () => {
  const reduceMotion = useReducedMotion();
  const sectionAnim = reduceMotion
    ? {}
    : { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } };

  return (
    <main id="main" className="container">
      <SEO title="Melissa Michaels" description="Urban fantasy author" />
      <Suspense fallback={null}>
        <LazyLoad height="100vh" offset={-100}>
          <motion.section id="home" {...sectionAnim}>
            <Hero />
          </motion.section>
        </LazyLoad>
      </Suspense>

      <Suspense fallback={null}>
        <LazyLoad height="100vh" offset={-100}>
          <motion.section id="featured" {...sectionAnim}>
            <FeaturedPost />
          </motion.section>
        </LazyLoad>
      </Suspense>

      <Suspense fallback={null}>
        <LazyLoad height="100vh" offset={-100}>
          <motion.section id="services" {...sectionAnim}>
            <Services />
          </motion.section>
        </LazyLoad>
      </Suspense>

      <Suspense fallback={null}>
        <LazyLoad height="100vh" offset={-100}>
          <motion.section id="testimonials" {...sectionAnim}>
            <Testimonials />
          </motion.section>
        </LazyLoad>
      </Suspense>

      <Suspense fallback={null}>
        <LazyLoad height="600vh" offset={-100}>
          <motion.section id="about" {...sectionAnim}>
          <About
            headshot="/p1.png"
            bio={[
              'Melissa is an author, reader, and novelist. Melissa’s love of writing grew out of her passion for reading, with her tastes leaning towards urban fantasy.',
              'She is the Author of <i>Raven’s Transformation</i>, an Urban Fantasy short story featured in Abaculus III, a collection of international tales of science fiction, fantasy, and horror.',
              'Besides writing, she enjoys gaming, hiking, spending time with her family, and her German Shepard - Caesar.',
            ]}
            blurb="More stories and updates coming soon."
          />
        </motion.section>
      </LazyLoad>
    </Suspense>

    <Suspense fallback={null}>
      <LazyLoad height="100vh" offset={-100}>
        <motion.section id="contact" {...sectionAnim}>
          <Newsletter />
        </motion.section>
      </LazyLoad>
    </Suspense>

  </main>
  );
};

export default App;
