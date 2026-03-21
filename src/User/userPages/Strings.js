import React, { useEffect, useState } from "react";
import firedb from "../../firebase";
import "./Shop.css";

function Strings() {
  const [strings, setStrings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    firedb.child("Strings").on("value", (snapshot) => {
      const data = snapshot.val();
      const list = [];

      for (let id in data) {
        list.push({ id, ...data[id] });
      }

      setStrings(list);
    });
  }, []);

  const addToCart = (item) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...storedCart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Added to cart ✅");
  };

  // 🔍 Search filter
  const filteredStrings = strings.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="shop-container">
      <h2 className="shop-title">Strings</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search strings..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="shop-grid">
        {filteredStrings.map((item) => (
          <div className="shop-card" key={item.id}>
            <h3>{item.name}</h3>
            <img src={item.img} alt="" />
            <p>₹{item.price}</p>

            <button className="shop-btn" onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Strings;