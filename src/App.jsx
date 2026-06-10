import React, { lazy, Suspense } from "react";
import SEO from './components/utility/SEO';

const Hero = lazy(() => import("./components/hero/Hero"));
const BookPreview = lazy(() => import("./components/books/BookPreview"));
const About = lazy(() => import("./components/about/About"));
const Newsletter = lazy(() => import("./components/newsletter/Newsletter"));

// Main homepage: hero, book preview, author bio, newsletter signup
const App = () => {
  return (
    <main id="main">
      <SEO title="Melissa Michaels" description="Urban fantasy author" />

      <Suspense fallback={null}>
        <Hero />
      </Suspense>

      <Suspense fallback={null}>
        <BookPreview id="services" />
      </Suspense>

      <Suspense fallback={<div className="section-loading">Loading author bio...</div>}>
        <About
          headshot={`${import.meta.env.BASE_URL}aboutme.jpg`}
          bio={[
            `Some stories find you in the static between frequencies, in the three frames of thermal
            where something moves too fast to be human. Melissa Michaels writes at the intersection
            of ancient bloodlines and modern warfare, where drones track shadows that shouldn't exist
            and family curses download like malware into military-grade systems.`,

            `The Bloodborne Chronicles emerged from late-night gaming sessions and hiking trails where
            Caesar, her German Shepherd, would freeze at sounds only he could hear. Her protagonist
            Raven Andros sees the world in heat signatures and extraction points—until the day the
            geometry breaks and something older than surveillance satellites starts hunting back.`,

            `<em>Raven's Transformation</em>, featured in literary journal <em>Abaculus</em>, introduced
            readers to a world where mandatory leave feels like a death sentence and going home means
            confronting shadows that point the wrong direction at sunset.`
          ]}
          blurb="More stories and updates coming soon."
        />
      </Suspense>

      <Suspense fallback={null}>
        <section id="contact">
          <Newsletter />
        </section>
      </Suspense>
    </main>
  );
};

export default App;
