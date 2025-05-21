import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Melissa Michaels. All rights reserved.</p>
    </footer>
  );
}
