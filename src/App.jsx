import React, { lazy, Suspense } from "react";
import SEO from './components/utility/SEO';
import LazyLoad from "react-lazyload";

const Hero = lazy(() => import("./components/hero/Hero"));
const Services = lazy(() => import("./components/books/BookPreview"));
const About = lazy(() => import("./components/about/About"));
const Newsletter = lazy(() => import("./components/newsletter/Newsletter"));

// Main homepage component with your original structure
const App = () => (
  <main id="main" className="container">
    <SEO title="Melissa Michaels" description="Urban fantasy author" />
    <Suspense fallback={null}>
      <LazyLoad height="100vh" offset={-100}>
        <section id="home">
          <Hero />
        </section>
      </LazyLoad>
    </Suspense>

    <Suspense fallback={null}>
      <LazyLoad height="100vh" offset={-100}>
        <section id="services">
          <Services />
        </section>
      </LazyLoad>
    </Suspense>

    <Suspense fallback={<div>Loading...</div>}>
      <LazyLoad height="600vh" offset={-100} once>
        <section id="about">
          <About
            headshot="/aboutme.jpg"
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
        </section>
      </LazyLoad>
    </Suspense>

    <Suspense fallback={null}>
      <LazyLoad height="100vh" offset={-100}>
        <section id="contact">
          <Newsletter />
        </section>
      </LazyLoad>
    </Suspense>
  </main>
);

export default App;