import React from 'react'

// Uncontrolled on purpose: BlogPage debounces the onChange, so a controlled
// value would lag the user's keystrokes.
export default function SearchBar({ onChange, placeholder = 'Search the dispatches...', ...rest }) {
  return (
    <input
      type="search"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="blog-input w-full p-3 rounded-lg"
      {...rest}
    />
  )
}
