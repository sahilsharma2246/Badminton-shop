import React, { useEffect, useState } from "react";
import firedb from "../../firebase";
import "./Upload.css";
import { useNavigate } from "react-router-dom";

function UploadAccessories() {
  const [data, setData] = useState({
    name: "",
    price: "",
    img: "",
    
  });

  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  // ✅ Auth check
  useEffect(() => {
    const key = localStorage.getItem("userKey");

    if (!key) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    firedb.child("Owner").child(key).once("value", (snapshot) => {
      const user = snapshot.val();

      if (!user || user.status !== 1) {
        alert("Session expired. Please login again");
        navigate("/login");
      }
    });
  }, [navigate]);

  // ✅ Fetch accessories
  useEffect(() => {
    firedb.child("Accessories").on("value", (snapshot) => {
      const data = snapshot.val();
      const list = [];

      for (let id in data) {
        list.push({ id, ...data[id] });
      }

      setItems(list);
    });
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ✅ Upload / Update
  const upload = () => {
    if (!data.name || !data.price) {
      alert("Fill required fields");
      return;
    }

    if (editId) {
      firedb.child("Accessories").child(editId).update(data);
      alert("Updated ✅");
      setEditId(null);
    } else {
      firedb.child("Accessories").push(data);
      alert("Accessory Added ✅");
    }

    setData({ name: "", price: "", img: ""});
  };

  // ✅ Delete
  const del = (id) => {
    firedb.child("Accessories").child(id).remove();
    alert("Deleted ❌");
  };

  // ✅ Edit
  const edit = (item) => {
    setData(item);
    setEditId(item.id);
  };

  return (
    <div className="upload-container">

      {/* Form */}
      <div className="upload-box">
        <h2>Upload Accessories</h2>

        <input
          name="name"
          placeholder="Accessory Name"
          value={data.name}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          value={data.price}
          onChange={handleChange}
        />

        <input
          name="img"
          placeholder="Image URL"
          value={data.img}
          onChange={handleChange}
        />

        

        <button onClick={upload}>
          {editId ? "Update" : "Upload"}
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <h2>Accessories List</h2>

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <img src={item.img} alt="" width="100" />
                </td>
                
                <td>
                  <button onClick={() => edit(item)}>Edit</button>
                  <button onClick={() => del(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default UploadAccessories;