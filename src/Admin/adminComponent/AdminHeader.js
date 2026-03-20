import React from "react";
import { Link } from "react-router-dom";
import "./AdminHeader.css";

function AdminHeader() {
  return (
    <header className="admin-header">
      <h2>Admin Panel</h2>

      <nav>
        <Link to="/admin/racquet">Uploaded-Racquet</Link>
        <Link to="/admin/shuttle">Uploaded-Shuttle</Link>
        <Link to="/admin/strings">Uploaded-Strings</Link>
        <Link to="/admin/Acc">Uploaded-Accessories</Link>
        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/logout" className="logout-btn">Logout</Link>
      </nav>
    </header>
  );
}

export default AdminHeader;