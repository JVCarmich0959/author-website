import { lazy, Suspense } from "react";
import LazyLoad from "react-lazyload";

const Hero      = lazy(() => import("./components/hero/Hero"));
const Services  = lazy(() => import("./components/books/Services"));
const About      = lazy(() => import("./components/about/About"));
const VideoGallery = lazy(() => import("./components/video/VideoGallery"));
const Newsletter = lazy(() => import("./components/newsletter/Newsletter"));
const Footer = lazy(() => import("./components/footer/Footer"));

const App = () => (
  <main id="main" className="container">
    {/* No more ugly "loading..." text */}
    <Suspense fallback={null}>
      <LazyLoad height="100vh" offset={-100}>
        <section id="home">
{/* HERO SECTION */}
          <Hero />
        </section>
      </LazyLoad>
    </Suspense>
    <Suspense fallback={null}>
      <LazyLoad height="100vh" offset={-100}>
        <section id="services">
{/* SERVICES SECTION */}
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
              'Melissa is a proud member of the North Carolina Writers Network'
            ]}
            blurb="More stories and updates coming soon."
          />
        </section>
      </LazyLoad>
    </Suspense>
    <Suspense fallback={null}>
      <LazyLoad height="100vh" offset={-100}>
        <section id="videos">
          <VideoGallery />
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
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  </main>
);

export default App;
