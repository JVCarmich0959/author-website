import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="flex justify-center gap-4 mb-4">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.goodreads.com" target="_blank" rel="noopener noreferrer">Goodreads</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
      <p>&copy; {new Date().getFullYear()} Melissa Michaels. All rights reserved.</p>
    </footer>
  );
}
