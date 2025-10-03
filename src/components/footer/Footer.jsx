import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="flex justify-center gap-4 mb-4">
        <a
          href="https://twitter.com/melissawrites"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Melissa on Twitter"
        >
          Twitter
        </a>
        <a
          href="https://instagram.com/melissamichaelswrites"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Melissa on Instagram"
        >
          Instagram
        </a>
        <a
          href="https://www.goodreads.com/author/show/1234567.Melissa_Michaels"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Melissa on Goodreads"
        >
          Goodreads
        </a>
        <a
          href="https://linkedin.com/in/melissamichaels"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect with Melissa on LinkedIn"
        >
          LinkedIn
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Melissa Michaels. All rights reserved.</p>
    </footer>
  );
}
