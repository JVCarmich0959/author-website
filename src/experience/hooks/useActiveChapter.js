import { useEffect, useMemo, useState } from "react";

export default function useActiveChapter(chapterIds = []) {
  const [activeId, setActiveId] = useState(chapterIds[0]);

  const ids = useMemo(() => chapterIds.filter(Boolean), [chapterIds]);

  useEffect(() => {
    if (!ids.length) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setActiveId(ids[0]);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
