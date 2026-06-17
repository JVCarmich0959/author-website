// src/components/hero/Nav.jsx

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./hero.css";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Excerpt" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const scrollTo = useCallback((id, attempt = 0) => {
    const el = document.getElementById(id);
    if (!el) {
      // home sections are lazy-loaded; when arriving from another page the
      // target may not be mounted yet, so retry briefly
      if (attempt < 20) {
        setTimeout(() => scrollTo(id, attempt + 1), 150);
      }
      return;
    }
    // the open menu locks body scroll (overflow: hidden); release it before
    // scrolling or mobile browsers cancel the smooth scroll
    document.body.style.overflow = "unset";
    // setTimeout instead of requestAnimationFrame: rAF is throttled in
    // background/low-power states on mobile. scroll-margin-top in index.css
    // keeps the section clear of the fixed header.
    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const goTo = useCallback(
    (id) => {
      closeMenu();
      if (location.pathname !== "/") {
        navigate(`/#${id}`);
      } else {
        scrollTo(id);
      }
    },
    [location.pathname, navigate, scrollTo, closeMenu]
  );

  const goToBlog = useCallback(() => {
    navigate("/blog");
    closeMenu();
  }, [navigate, closeMenu]);

  const handleKeyDown = useCallback((e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
    if (e.key === "Escape" && open) {
      closeMenu();
    }
  }, [open, closeMenu]);

  const handleClickOutside = useCallback((event) => {
    if (navRef.current && !navRef.current.contains(event.target) && open) {
      closeMenu();
    }
  }, [open, closeMenu]);

  const updateActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + 100;
    
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = setTimeout(() => scrollTo(hash), 100);
    }
    
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [location, scrollTo]);

  useEffect(() => {
    if (location.pathname === "/") {
      window.addEventListener("scroll", updateActiveSection, { passive: true });
      updateActiveSection();
      
      return () => {
        window.removeEventListener("scroll", updateActiveSection);
      };
    }
  }, [location.pathname, updateActiveSection]);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
      
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "unset";
      };
    }
  }, [open, handleClickOutside]);

  const toggleMenu = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
  }, []);

  const menuButtonProps = useMemo(() => ({
    className: `nav__toggle${open ? " nav__toggle--open" : ""}`,
    onClick: toggleMenu,
    "aria-label": open ? "Close navigation menu" : "Open navigation menu",
    "aria-expanded": open,
    "aria-controls": "nav-links",
    "aria-haspopup": "true"
  }), [open, toggleMenu]);

  const navLinksProps = useMemo(() => ({
    id: "nav-links",
    className: `nav__links${open ? " nav__links--open" : ""}`,
    role: "menubar",
    "aria-hidden": !open
  }), [open]);

  // Check if we're on blog pages
  const isBlogActive = location.pathname.startsWith("/blog");

  return (
    <nav 
      className="nav" 
      role="navigation" 
      aria-label="Primary Navigation"
      ref={navRef}
    >
      <div
        className="nav__logo"
        onClick={() => goTo("home")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, () => goTo("home"))}
        aria-label="Navigate to Home section"
      >
        It's in the <span className="flicker-blood">blood</span>
      </div>

      <button {...menuButtonProps}>
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <ul {...navLinksProps}>
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id && location.pathname === "/";
          
          return (
            <li
              key={id}
              onClick={() => goTo(id)}
              role="menuitem"
              tabIndex={open ? 0 : -1}
              onKeyDown={(e) => handleKeyDown(e, () => goTo(id))}
              aria-label={`Navigate to ${label} section`}
              className={isActive ? "nav__link--active" : ""}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </li>
          );
        })}

        <li
          onClick={goToBlog}
          role="menuitem"
          tabIndex={open ? 0 : -1}
          onKeyDown={(e) => handleKeyDown(e, goToBlog)}
          aria-label="Navigate to Blog page"
          className={isBlogActive ? "nav__link--active" : ""}
          aria-current={isBlogActive ? "page" : undefined}
        >
          Blog
        </li>

      </ul>

      {open && (
        <div 
          className="nav__overlay" 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}
