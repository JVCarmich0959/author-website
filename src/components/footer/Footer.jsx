import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="flex justify-center gap-4 mb-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/instagram.png" alt="Instagram" className="w-6 h-6" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <img src="/youtube.png" alt="YouTube" className="w-6 h-6" />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Melissa Michaels. All rights reserved.</p>
    </footer>
  );
}
