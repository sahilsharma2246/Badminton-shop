import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>🏸 Badminton Store</h3>
        <p>Your one-stop shop for all badminton needs.</p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/cart">Cart</a>
          <a href="/login">Login</a>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} Badminton Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;