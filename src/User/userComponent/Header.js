import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">🏸 Badminton Store</div>

      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/racquet">Racquet</Link></li>
          <li><Link to="/shuttle">Shuttle</Link></li>
          <li><Link to="/strings">Strings</Link></li>
          <li><Link to="/Acc">Accessories</Link></li>
          <li><Link to="/cart">Cart 🛒</Link></li>
          <li><Link to="/login" className="login-btn">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;