import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import SEO from "../components/utility/SEO";
import chapters from "./data/chapters";
import ExperienceGate from "./components/ExperienceGate";
import ExperienceOverlay from "./components/ExperienceOverlay";
import ExperienceChapter from "./components/ExperienceChapter";
import ExperienceModal from "./components/ExperienceModal";
import useActiveChapter from "./hooks/useActiveChapter";
import useInsights from "./hooks/useInsights";
import "./experience.css";

const ExperienceScene = lazy(() => import("./components/ExperienceScene"));

export default function ExperiencePage() {
  const prefersReducedMotion = useReducedMotion();
  const [authorNoteOpen, setAuthorNoteOpen] = useState(false);
  const [activeInsight, setActiveInsight] = useState(null);
  const [hasEntered, setHasEntered] = useState(false);

  const chapterIds = useMemo(() => chapters.map((chapter) => chapter.id), []);
  const activeChapterId = useActiveChapter(chapterIds);
  const activeChapter = chapters.find((chapter) => chapter.id === activeChapterId) ?? chapters[0];

  const { foundSet, foundCount, markFound } = useInsights();

  useEffect(() => {
    document.documentElement.classList.add("experience-active");
    return () => document.documentElement.classList.remove("experience-active");
  }, []);

  const handleNavigate = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const offset = 90;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  const handleOpenInsight = (chapter) => {
    setActiveInsight(chapter);
    markFound(chapter.insight.id);
  };

  return (
    <main className="experience-page scrolly-shell">
      <SEO title="Experience | Melissa Michaels" description="Interactive author experience" />
      <ExperienceGate isOpen={!hasEntered} onEnter={() => setHasEntered(true)} />

      {hasEntered && (
        <>
          <Suspense fallback={<div className="experience-scene__fallback" aria-hidden="true" />}>
            <ExperienceScene
              visualState={activeChapter.visualState}
              reducedMotion={prefersReducedMotion}
            />
          </Suspense>

          <ExperienceOverlay
            chapters={chapters}
            activeId={activeChapterId}
            onNavigate={handleNavigate}
            onOpenNote={() => setAuthorNoteOpen(true)}
            insightsFound={foundCount}
            insightsTotal={chapters.length}
          />

          <div className="experience-track scrolly-track">
            {chapters.map((chapter) => (
              <ExperienceChapter
                key={chapter.id}
                chapter={chapter}
                isFound={foundSet.has(chapter.insight.id)}
                onOpenInsight={handleOpenInsight}
                reducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </>
      )}

      <ExperienceModal
        isOpen={authorNoteOpen}
        title="Author’s Note"
        onClose={() => setAuthorNoteOpen(false)}
        labelledBy="author-note-title"
      >
        <p>
          The /experience page is designed as a living guide to the Bloodborne Chronicles—part
          transmission log, part reader dossier. Each chapter offers a short insight to deepen the
          journey without changing the story’s canon.
        </p>
        <p>
          Prefer a quieter ride? Your reduced-motion setting will keep everything readable while
          dialing down animation.
        </p>
      </ExperienceModal>

      <ExperienceModal
        isOpen={Boolean(activeInsight)}
        title={activeInsight?.title ?? "Insight"}
        onClose={() => setActiveInsight(null)}
        labelledBy="insight-title"
      >
        <p>{activeInsight?.insight.snippet}</p>
      </ExperienceModal>
    </main>
  );
}
