import React, { useEffect, useState } from "react";
import firedb from "../../firebase";
import "./Shop.css";

function Cart() {
  const [cart, setCart] = useState([]);

  // 👇 New states
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState({
    name: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((sum, item) => {
    return sum + Number(item.price || 0);
  }, 0);

  // 👇 Handle input
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 👇 Final Order Submit
  const submitOrder = () => {
    if (!user.name || !user.phone || !user.address) {
      alert("Please fill all details");
      return;
    }

    const order = {
      customer: user,
      items: cart,
      total: totalPrice,
      date: new Date().toISOString()
    };

    firedb.child("Orders").push(order);

    alert("Order placed ✅");

    setCart([]);
    localStorage.removeItem("cart");
    setShowForm(false);
    setUser({ name: "", phone: "", address: "" });
  };

  return (
    <div className="shop-container">
      <h2 className="shop-title">Cart</h2>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>Cart is empty</p>
      ) : (
        <>
          {/* TABLE */}
          <div className="cart-table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img src={item.img} alt="" width="60" />
                    </td>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TOTAL */}
          <div className="cart-total">
            <h3>Total: ₹{totalPrice}</h3>

            <button
              className="place-order-btn"
              onClick={() => setShowForm(true)}
            >
              Place Order
            </button>
          </div>

          {/* 👇 ORDER FORM */}
          {showForm && (
            <div className="order-form">
              <h3>Enter Details</h3>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={user.name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={user.phone}
                onChange={handleChange}
              />

              <textarea
                name="address"
                placeholder="Address"
                value={user.address}
                onChange={handleChange}
              ></textarea>

              <button onClick={submitOrder}>Confirm Order</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;