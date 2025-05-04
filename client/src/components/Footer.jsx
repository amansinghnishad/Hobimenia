import React from "react";
import "../css/componentCSS/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <p>&copy; {new Date().getFullYear()} Hobimenia. All rights reserved.</p>
      <p>Made with ❤️ by ASN</p>
    </footer>
  );
};

export default Footer;
