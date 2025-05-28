import { lazy, Suspense } from "react";
import LazyLoad from "react-lazyload";

const Hero = lazy(() => import("./components/hero/Hero"));
const Services = lazy(() => import("./components/books/BookPreview"));
const About = lazy(() => import("./components/about/About"));
const Newsletter = lazy(() => import("./components/newsletter/Newsletter"));

const App = () => (
  <main id="main" className="container">
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
            headshot="/p1.png"
            bio={[
              'Melissa Michaels is an author, reader, and aspiring novelist. Her love of writing grew out of her passion for reading, her tastes leaning towards Urban Fantasy.',
              'She is the author of <i>Ravens Transformation</i>, an Urban Fantasy short story featured in Abaculus III, a collection of international tales of science fiction, fantasy, and horror.',
              'Melissa is a proud member of the North Carolina Writers Network',
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
