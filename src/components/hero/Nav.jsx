// src/components/hero/Nav.jsx

import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./hero.css";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Preview" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const goTo = useCallback(
    (id) => {
      if (location.pathname !== "/") {
        navigate(`/#${id}`);
      } else {
        scrollTo(id);
      }
      setOpen(false);
    },
    [location.pathname, navigate, scrollTo]
  );

  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash) {
      setTimeout(() => scrollTo(hash), 50);
    }
  }, [location, scrollTo]);

  return (
    <nav className="nav">
      <div
        className="nav__logo"
        onClick={() => goTo("home")}
        role="button"
        aria-label="Go to Home"
      >
        Bloodborne Chronicles
      </div>

      <button
        className={`nav__toggle${open ? " nav__toggle--open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav__links${open ? " nav__links--open" : ""}`}>
        {sections.map(({ id, label }) => (
          <li key={id} onClick={() => goTo(id)} role="menuitem">
            {label}
          </li>
        ))}
        <li onClick={() => setOpen(false)} role="menuitem">
          <Link to="/blog">Blog</Link>
        </li>
      </ul>
    </nav>
  );
}
