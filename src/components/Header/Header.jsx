import { useState } from "react";
import "./Header.css";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <h1>CryptoMood</h1>
      <nav>
        <ul className={`nav-list ${menuOpen ? "active" : ""}`}>
          <li>Home</li>
          <li>News</li>
          <li>Coins</li>
          <li>GitHub Code</li>
        </ul>
        <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
};
