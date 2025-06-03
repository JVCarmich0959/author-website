// src/components/hero/Nav.jsx

import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "../utility/ThemeToggle";
import "./hero.css";

// [COMMENT] Define the sections for internal navigation
const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Preview" },
];

export default function Nav() {
  const [open, setOpen] = useState(false); // [COMMENT] Tracks whether the mobile menu is expanded
  const navigate = useNavigate();
  const location = useLocation();

  // [COMMENT] Smoothly scrolls to the given section ID if it exists on the page
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // [COMMENT] Either navigate to homepage hash or scroll there if already on the homepage
  const goTo = useCallback(
    (id) => {
      if (location.pathname !== "/") {
        navigate(`/#${id}`);
      } else {
        scrollTo(id);
      }
      setOpen(false); // [COMMENT] Closes the mobile nav menu after navigation
    },
    [location.pathname, navigate, scrollTo]
  );

  // [COMMENT] On load or route change, check if there's a hash in the URL and scroll to it
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash) {
      setTimeout(() => scrollTo(hash), 50);
    }
  }, [location, scrollTo]);

  return (
    <nav className="nav" role="navigation" aria-label="Primary Navigation">
      {/* [COMMENT] Logo acts as a home button with appropriate ARIA role */}
      <div
        className="nav__logo"
        onClick={() => goTo("home")}
        role="button"
        tabIndex={0} // [COMMENT] Makes div focusable for keyboard navigation
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") goTo("home");
        }}
        aria-label="Navigate to Home section"
      >
        Melissa Michaels
      </div>

      {/* [COMMENT] Mobile menu toggle button */}
      <button
        className={`nav__toggle${open ? " nav__toggle--open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="nav-links"
      >
        <span />
        <span />
        <span />
      </button>

      {/* [COMMENT] Main navigation links with role="menubar" for screen readers */}
      <ul
        id="nav-links"
        className={`nav__links${open ? " nav__links--open" : ""}`}
        role="menubar"
      >
        {sections.map(({ id, label }) => (
          <li
            key={id}
            onClick={() => goTo(id)}
            role="menuitem"
            tabIndex={0} // [COMMENT] Allows focus on each nav item
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") goTo(id);
            }}
            aria-label={`Navigate to ${label} section`}
          >
            {label}
          </li>
        ))}

        {/* [COMMENT] External blog route (uses Link instead of scroll) */}
        <li
          role="menuitem"
          tabIndex={0}
          onClick={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setOpen(false);
          }}
          aria-label="Navigate to Blog page"
        >
          <Link to="/blog">Blog</Link>
        </li>
      </ul>
    </nav>
  );
}
