import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, BookMarked } from "lucide-react";
import "./footer.css";

// TODO: replace these with Melissa's real profile URLs.
const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { name: "Twitter / X", href: "https://twitter.com", Icon: Twitter },
  { name: "Facebook", href: "https://facebook.com", Icon: Facebook },
];

const GOODREADS_URL = "https://www.goodreads.com";

export default function Footer() {
  return (
    <footer className="footer">
      <a
        className="footer-goodreads"
        href={GOODREADS_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <BookMarked size={18} aria-hidden="true" />
        <span>Follow on Goodreads</span>
      </a>

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
