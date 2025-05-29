import React, { lazy, Suspense } from "react";
import SEO from './components/utility/SEO'
import LazyLoad from "react-lazyload";

const Hero = lazy(() => import("./components/hero/Hero"));
const Services = lazy(() => import("./components/books/BookPreview"));
const About = lazy(() => import("./components/about/About"));
const Newsletter = lazy(() => import("./components/newsletter/Newsletter"));

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

    <Suspense fallback={null}>
      <LazyLoad height="600vh" offset={-100}>
        <section id="about">
          <About
            headshot="/aboutme.jpg"
            bio={[
              'Melissa is an author, reader, and novelist. Melissa’s love of writing grew out of her passion for reading, with her tastes leaning towards urban fantasy.',
              'She is the Author of <i>Raven’s Transformation</i>, an Urban Fantasy short story featured in Abaculus III, a collection of international tales of science fiction, fantasy, and horror.',
              'Besides writing, she enjoys gaming, hiking, spending time with her family, and her German Shepard - Caesar.',
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
