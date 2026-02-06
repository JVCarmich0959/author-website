const chapters = [
  {
    id: "signal",
    number: "01",
    title: "Signal in the static",
    body:
      "Follow the flicker between surveillance feeds and the bloodlines that refuse to stay hidden.",
    visualState: {
      accent: "#b9211d",
      ambient: 0.4,
      spot: 0.9,
      camera: [0, 1.8, 6],
      fog: ["#050607", 4, 12],
    },
    insight: {
      id: "signal",
      label: "Find the signal",
      snippet:
        "Every transmission carries a ghost. The Bloodborne Chronicles begin where the feeds go quiet.",
    },
  },
  {
    id: "raven",
    number: "02",
    title: "Raven’s first breach",
    body:
      "Raven Andros maps extraction points while something older maps her back.",
    visualState: {
      accent: "#d15a3c",
      ambient: 0.35,
      spot: 0.8,
      camera: [-1.2, 1.6, 6.5],
      fog: ["#0b0d12", 4, 13],
    },
    insight: {
      id: "raven",
      label: "Trace Raven’s path",
      snippet:
        "Heat signatures lie. Raven trusts geometry until geometry stops trusting her.",
    },
  },
  {
    id: "bloodline",
    number: "03",
    title: "Bloodline protocols",
    body:
      "Family histories are rewritten with every mission, and every mission asks for more.",
    visualState: {
      accent: "#a45cff",
      ambient: 0.45,
      spot: 0.75,
      camera: [1.4, 2.1, 6.2],
      fog: ["#0c0f1a", 4, 14],
    },
    insight: {
      id: "bloodline",
      label: "Decode the bloodline",
      snippet:
        "The Andros line carries a signal that can’t be scrubbed from any report.",
    },
  },
  {
    id: "archives",
    number: "04",
    title: "Shadowed archives",
    body:
      "Every classified file hides the same question: who survives the next frame?",
    visualState: {
      accent: "#5bd0ff",
      ambient: 0.35,
      spot: 0.7,
      camera: [0.4, 1.5, 5.8],
      fog: ["#081016", 3, 11],
    },
    insight: {
      id: "archives",
      label: "Unseal the archive",
      snippet:
        "The oldest records are never fully redacted—they hum in the margins.",
    },
  },
  {
    id: "crossing",
    number: "05",
    title: "Crossing the threshold",
    body:
      "The feed fractures. The mission shifts from extraction to survival.",
    visualState: {
      accent: "#f0b94f",
      ambient: 0.5,
      spot: 0.85,
      camera: [-0.6, 2.2, 6.8],
      fog: ["#15110d", 4, 12],
    },
    insight: {
      id: "crossing",
      label: "Cross the line",
      snippet:
        "Once the threshold is crossed, the only command left is to keep moving.",
    },
  },
  {
    id: "signal-end",
    number: "06",
    title: "Signal end / signal begin",
    body:
      "The story loops back with new coordinates—an invitation to keep listening.",
    visualState: {
      accent: "#9ad16b",
      ambient: 0.4,
      spot: 0.8,
      camera: [0, 1.9, 6.1],
      fog: ["#0a120b", 4, 12],
    },
    insight: {
      id: "signal-end",
      label: "Log the aftermath",
      snippet:
        "The final frame is always the start of the next signal.",
    },
  },
];

export default chapters;
