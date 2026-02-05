import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "experienceInsightsFound";

export default function useInsights() {
  const [foundIds, setFoundIds] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFoundIds(parsed);
        }
      }
    } catch (error) {
      console.warn("Unable to read insights from storage", error);
    }
  }, []);

  const markFound = useCallback((id) => {
    setFoundIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (error) {
        console.warn("Unable to save insights to storage", error);
      }
      return next;
    });
  }, []);

  const foundSet = useMemo(() => new Set(foundIds), [foundIds]);

  return {
    foundIds,
    foundSet,
    foundCount: foundIds.length,
    markFound,
  };
}
