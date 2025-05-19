import { lazy, Suspense } from "react";
import LazyLoad from "react-lazyload";

const Hero      = lazy(() => import("./components/hero/Hero"));
const Services  = lazy(() => import("./components/books/Services"));
const About     = lazy(() => import("./components/about/About"));
const Newsletter= lazy(() => import("./components/newsletter/Newsletter"));

const App = () => (
  <div className="container">
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
          <About />
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
  </div>
);

export default App;
