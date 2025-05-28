import React from 'react'

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      placeholder="Search posts..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mb-4 p-2 rounded bg-black/40 dark:bg-gray-100/20"
    />
  )
}
