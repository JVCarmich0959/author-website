// src/components/hero/Nav.jsx

/**
 * Nav.jsx
 *
 * A responsive top navigation bar for our “Bloodborne Chronicles” site.
 * - On desktop: shows inline links
 * - On mobile (<768px): collapses into a hamburger icon that toggles the menu
 * - Clicking a link smooth‐scrolls to the matching <section id="…">
 *
 * This file requires:
 *   • React (for useState)
 *   • hero.css (for styling & media queries)
 *
 * In a typical Vite/React project:
 *   • `npm install` has already pulled in React, ReactDOM, etc.
 *   • Vite uses ES Modules, so `import` is how we bring in dependencies.
 */

import React, { useState } from "react"; // useState lets us keep track of “open” vs. “closed”
import { Link } from "react-router-dom";
import "./hero.css";                    // our shared hero‐related styles

// Define each section we want to scroll to.
// The `id` must match the HTML <section id="…"> elsewhere on the page.
const sections = [
  { id: "home",     label: "Home"     },
  { id: "about",    label: "About"    },
  { id: "services", label: "Offerings"},
  { id: "contact",  label: "Bulletin" },
];

/**
 * Nav
 *
 * Renders:
 *  • A fixed top bar with site title
 *  • A hamburger toggle on small screens
 *  • A list of links that scroll to each section
 */
export default function Nav() {
  // `open` tracks whether the mobile menu is currently expanded
  const [open, setOpen] = useState(false);

  /**
   * goTo
   * @param {string} id — the target <section id="…">
   *
   * Finds the element by id, and if found, scrolls it into view smoothly.
   * Also closes the mobile menu (if it was open).
   */
  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
    setOpen(false);
  };

  return (
    <nav className="nav">
      {/** 
        * Logo / Site Title 
        * Clicking it scrolls back to the top (“home”).
        */}
      <div
        className="nav__logo"
        onClick={() => goTo("home")}
        role="button"
        aria-label="Go to Home"
      >
        Bloodborne Chronicles
      </div>

      {/**
        * Hamburger button:
        * - Visible only on mobile (via CSS @media)
        * - Toggles the boolean `open`
        * - aria-label for accessibility
        */}
      <button
        className={`nav__toggle${open ? " nav__toggle--open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {/* three bars */}
        <span />
        <span />
        <span />
      </button>

      {/**
        * Link list:
        * - `.nav__links--open` class slides it into view on mobile
        * - On desktop it’s always visible (CSS handles display:flex)
        */}
      <ul className={`nav__links${open ? " nav__links--open" : ""}`}>
        {sections.map((s) => (
          <li
            key={s.id}
            onClick={() => goTo(s.id)}
            role="menuitem"
          >
            {s.label}
          </li>
        ))}
        <li onClick={() => setOpen(false)} role="menuitem">
          <Link to="/shop">Shop</Link>
        </li>
      </ul>
    </nav>
  );
}
