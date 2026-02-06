import React from 'react';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search posts...',
  className = '',
  'aria-label': ariaLabel = 'Search',
  ...props
}) {
  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className={`blog-input ${className}`.trim()}
      {...props}
    />
  );
}
