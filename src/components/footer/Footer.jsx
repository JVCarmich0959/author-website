import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";
import "./footer.css";

const SOCIALS = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@melissamichaelsurbanfanas6965",
    Icon: Youtube,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/melissadmichaels/",
    Icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/melissamdc104/",
    Icon: Instagram,
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <nav className="footer-social" aria-label="Social media">
        {SOCIALS.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="footer-social-link"
          >
            <Icon size={22} aria-hidden="true" />
          </a>
        ))}
      </nav>

      <nav className="footer-links" aria-label="Site">
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
      </nav>

      <p className="footer-copy">
        &copy; {new Date().getFullYear()} Melissa Michaels. All rights reserved.
      </p>
    </footer>
  );
}
