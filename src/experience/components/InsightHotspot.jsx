import React from "react";

export default function InsightHotspot({ label, isFound, onOpen }) {
  return (
    <button
      type="button"
      className={`experience-hotspot${isFound ? " is-found" : ""}`}
      onClick={onOpen}
      aria-pressed={isFound}
      aria-label={`${label} insight`}
    >
      <span className="experience-hotspot__dot" aria-hidden="true" />
      <span className="experience-hotspot__label">{label}</span>
    </button>
  );
}
