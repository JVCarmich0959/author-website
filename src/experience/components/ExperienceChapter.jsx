import React, { useEffect, useRef, useState } from "react";
import InsightHotspot from "./InsightHotspot";

export default function ExperienceChapter({
  chapter,
  isFound,
  onOpenInsight,
  reducedMotion,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      id={chapter.id}
      ref={sectionRef}
      className={`experience-chapter${isVisible ? " is-visible" : ""}`}
      aria-labelledby={`${chapter.id}-title`}
      data-visual={chapter.id}
    >
      <div className="experience-chapter__content">
        <p className="experience-chapter__number">{chapter.number}</p>
        <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
        <p className="experience-chapter__body">{chapter.body}</p>
        <InsightHotspot
          label={chapter.insight.label}
          isFound={isFound}
          onOpen={() => onOpenInsight(chapter)}
        />
      </div>
    </section>
  );
}
