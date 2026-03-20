import React, { useEffect, useState } from "react";
import firedb from "../../firebase";
import "./Upload.css";
import { useNavigate } from "react-router-dom";

function UploadShuttle() {
  const [data, setData] = useState({
    name: "",
    price: "",
    img: "",
    
  });

  const [shuttles, setShuttles] = useState([]);
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

  // ✅ Fetch data
  useEffect(() => {
    firedb.child("Shuttles").on("value", (snapshot) => {
      const data = snapshot.val();
      const list = [];

      for (let id in data) {
        list.push({ id, ...data[id] });
      }

      setShuttles(list);
    });
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ✅ Add / Update
  const upload = () => {
    if (!data.name || !data.price) {
      alert("Fill required fields");
      return;
    }

    if (editId) {
      firedb.child("Shuttles").child(editId).update(data);
      alert("Updated ✅");
      setEditId(null);
    } else {
      firedb.child("Shuttles").push(data);
      alert("Shuttle Added ✅");
    }

    setData({ name: "", price: "", img: "" });
  };

  // ✅ Delete
  const del = (id) => {
    firedb.child("Shuttles").child(id).remove();
    alert("Deleted ❌");
  };

  // ✅ Edit
  const edit = (item) => {
    setData(item);
    setEditId(item.id);
  };

  return (
    <div className="upload-container">

      {/* Upload Form */}
      <div className="upload-box">
        <h2>Upload Shuttle</h2>

        <input name="name" placeholder="Shuttle Name" value={data.name} onChange={handleChange} />
        <input name="price" placeholder="Price" value={data.price} onChange={handleChange} />
        <input name="img" placeholder="Image URL" value={data.img} onChange={handleChange} />
       

        <button onClick={upload}>
          {editId ? "Update" : "Upload"}
        </button>
      </div>

      {/* Dashboard Table */}
      <div className="table-container">
        <h2>Shuttle List</h2>

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
            {shuttles.map((item) => (
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

export default UploadShuttle;