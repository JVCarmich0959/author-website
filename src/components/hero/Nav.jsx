// src/components/hero/Nav.jsx

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./hero.css";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Preview" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const goTo = useCallback(
    (id) => {
      if (location.pathname !== "/") {
        navigate(`/#${id}`);
      } else {
        scrollTo(id);
      }
      closeMenu();
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
  const isExperienceActive = location.pathname === "/experience";

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
        Melissa Michaels
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

        <li
          onClick={() => {
            navigate("/experience");
            closeMenu();
          }}
          role="menuitem"
          tabIndex={open ? 0 : -1}
          onKeyDown={(e) =>
            handleKeyDown(e, () => {
              navigate("/experience");
              closeMenu();
            })
          }
          aria-label="Navigate to Experience page"
          className={isExperienceActive ? "nav__link--active" : ""}
          aria-current={isExperienceActive ? "page" : undefined}
        >
          Experience
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
