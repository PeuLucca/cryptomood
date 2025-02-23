import { useState } from "react";
import "./Header.css";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <header>
      <h1>CryptoMood</h1>
      <nav>
        <ul className={`nav-list ${menuOpen ? "active" : ""}`}>
          <li onClick={() => scrollToSection("home")}>Home</li>
          <li onClick={() => scrollToSection("coins")}>Coins</li>
          <li>
            <a style={{ textDecoration: "none", color: "inherit" }} href="https://github.com/PeuLucca/cryptomood" target="_blank">
              GitHub Code
            </a>
          </li>
        </ul>
        <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
}
