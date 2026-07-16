import React from 'react'

// Deterministic per-post fallback art for posts without a featured image.
// Seeded by slug so a post keeps the same look across renders and pages.

const VARIANTS = [
  { glow: '#B9211D', gx: '20%', gy: '15%' },
  { glow: '#8C5431', gx: '80%', gy: '20%' },
  { glow: '#B9211D', gx: '75%', gy: '80%' },
  { glow: '#6e0f0c', gx: '25%', gy: '75%' },
  { glow: '#8C5431', gx: '50%', gy: '10%' },
  { glow: '#6e0f0c', gx: '15%', gy: '55%' },
]

function hashCode(str = '') {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

export default function DispatchThumb({ slug = '', title = '' }) {
  const variant = VARIANTS[hashCode(slug) % VARIANTS.length]
  const letter = (title.match(/[a-zA-Z0-9]/) || ['✦'])[0].toUpperCase()
  const gradientId = `dispatch-thumb-${slug}`

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1B0C00" />
          <stop offset="1" stopColor="#0d1014" />
        </linearGradient>
        <radialGradient id={`${gradientId}-glow`} cx={variant.gx} cy={variant.gy} r="70%">
          <stop offset="0" stopColor={variant.glow} stopOpacity="0.32" />
          <stop offset="1" stopColor={variant.glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#${gradientId})`} />
      <rect width="400" height="240" fill={`url(#${gradientId}-glow)`} />
      <text
        x="200"
        y="120"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Cinzel Decorative', serif"
        fontWeight="900"
        fontSize="150"
        fill="#CDB48B"
        opacity="0.16"
      >
        {letter}
      </text>
      <g stroke="#CDB48B" strokeOpacity="0.35" strokeWidth="1" fill="none">
        <path d="M170 200 h24 m12 0 h24" />
        <path d="M200 194 l6 6 l-6 6 l-6 -6 z" fill="#B9211D" fillOpacity="0.55" stroke="none" />
      </g>
    </svg>
  )
}
