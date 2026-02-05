import React, { lazy, Suspense, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import SEO from './components/utility/SEO';
import Chapter from "./components/scrollytelling/Chapter";
import ProgressIndicator from "./components/scrollytelling/ProgressIndicator";
import IntroGate from "./components/scrollytelling/IntroGate";
import NoteModal from "./components/scrollytelling/NoteModal";

const Hero = lazy(() => import("./components/hero/Hero"));
const Services = lazy(() => import("./components/books/BookPreview"));
const About = lazy(() => import("./components/about/About"));
const Newsletter = lazy(() => import("./components/newsletter/Newsletter"));
const ImmersiveScene = lazy(() => import("./components/scrollytelling/ImmersiveScene"));

// Main homepage component with your original structure
const App = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const chapters = useMemo(() => ([
    { id: "home", number: "01", label: "Arrival" },
    { id: "services", number: "02", label: "Preview" },
    { id: "about", number: "03", label: "Author" },
    { id: "immersive", number: "04", label: "Immersion" },
    { id: "contact", number: "05", label: "Contact" },
  ]), []);

  const shouldShowImmersive = useMemo(() => {
    if (prefersReducedMotion) return false;
    if (typeof window === "undefined") return true;
    const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const isSmallScreen = window.matchMedia
      ? window.matchMedia("(max-width: 900px)").matches
      : false;
    return !(lowMemory || lowCores || isSmallScreen);
  }, [prefersReducedMotion]);

  return (
    <main id="main" className="scrolly-shell">
      <SEO title="Melissa Michaels" description="Urban fantasy author" />
      <IntroGate
        isOpen={!hasEntered}
        onEnter={() => setHasEntered(true)}
        onOpenNote={() => setNoteOpen(true)}
      />
      <NoteModal isOpen={noteOpen} onClose={() => setNoteOpen(false)} />

      {hasEntered && <ProgressIndicator chapters={chapters} />}

      <div className="scrolly-track" aria-hidden={!hasEntered}>
        <Suspense fallback={null}>
          <Chapter
            id="home"
            number="01"
            title="Bloodborne signal"
            statement="A scrollytelling guide into Melissa Michaels’ urban fantasy worlds."
            body="Follow the tension between surveillance tech, ancient bloodlines, and the ghosts that move just outside the frame."
            align="right"
          >
            <Hero as="div" id={null} />
          </Chapter>
        </Suspense>

        <Suspense fallback={null}>
          <Chapter
            id="services"
            number="02"
            title="Preview the latest"
            statement="Step into Raven Andros’ first encounter."
            body="A tactical operative meets a supernatural anomaly that breaks every rule she trusts."
          >
            <Services as="div" />
          </Chapter>
        </Suspense>

        <Suspense fallback={<div className="chapter-loading">Loading author bio...</div>}>
          <Chapter
            id="about"
            number="03"
            title="Behind the bloodline"
            statement="The author’s signal, decoded."
            body="Follow the threads that shape the Bloodborne Chronicles and the worlds they inhabit."
            align="right"
          >
            <About
              as="div"
              id={null}
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
          </Chapter>
        </Suspense>

        <Chapter
          id="immersive"
          number="04"
          title="Immersive layer"
          statement="A reserved slot for a future cinematic scene."
          body="This placeholder is ready for a lightweight WebGL or 3D moment when you’re ready to add it."
        >
          {shouldShowImmersive ? (
            <Suspense fallback={<div className="chapter-loading">Loading immersive layer...</div>}>
              <ImmersiveScene />
            </Suspense>
          ) : (
            <div className="immersive-placeholder" role="note">
              Immersive mode is paused on this device for performance.
            </div>
          )}
        </Chapter>

        <Suspense fallback={null}>
          <Chapter
            id="contact"
            number="05"
            title="Stay in the signal"
            statement="Join the reader list for new releases."
            body="Short dispatches, release alerts, and behind-the-scenes notes from the Bloodborne Chronicles."
            align="right"
          >
            <Newsletter />
          </Chapter>
        </Suspense>
      </div>
    </main>
  );
};

export default App;
