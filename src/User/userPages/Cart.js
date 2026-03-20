import React, { useEffect, useState } from "react";
import firedb from "../../firebase";
import "./Shop.css";

function Cart() {
  const [cart, setCart] = useState([]);

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

  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const order = {
      items: cart,
      total: totalPrice,
      date: new Date().toISOString()
    };

    firedb.child("Orders").push(order);

    alert("Order placed ✅");

    setCart([]);
    localStorage.removeItem("cart");
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

            <button className="place-order-btn" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;