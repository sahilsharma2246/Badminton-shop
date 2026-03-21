import React, { useEffect, useState } from "react";
import firedb from "../../firebase";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    firedb.child("Orders").on("value", (snapshot) => {
      const data = snapshot.val();
      const list = [];

      for (let id in data) {
        list.push({ id, ...data[id] });
      }

      setOrders(list.reverse());
    });
  }, []);

  // ❌ Delete Order
  const deleteOrder = (id) => {
    if (window.confirm("Delete this order?")) {
      firedb.child("Orders").child(id).remove();
    }
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">Orders</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">

            {/* DELETE BUTTON */}
            <button
              className="delete-order-btn"
              onClick={() => deleteOrder(order.id)}
            >
              Delete
            </button>

            {/* Customer Info */}
            <div className="order-user">
              <h3>{order.customer?.name}</h3>
              <p>📞 {order.customer?.phone}</p>
              <p>📍 {order.customer?.address}</p>
            </div>

            {/* Items */}
            <div className="order-items">
              {order.items.map((item, i) => (
                <div key={i} className="order-item">
                  <img src={item.img} alt="" />
                  <div>
                    <p>{item.name}</p>
                    <span>₹{item.price}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="order-footer">
              <h4>Total: ₹{order.total}</h4>
              <p>{new Date(order.date).toLocaleString()}</p>
            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default Orders;