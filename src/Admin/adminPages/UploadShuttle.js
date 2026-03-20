import React, { useState } from "react";
import firedb from "../../firebase";
import "./Upload.css";

function UploadShuttle() {
  const [data, setData] = useState({
    name: "",
    price: "",
    img: "",
    desc: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const upload = () => {
    if (!data.name || !data.price) {
      alert("Fill required fields");
      return;
    }

    firedb.child("Shuttles").push(data);
    alert("Shuttle Added ✅");

    setData({ name: "", price: "", img: "", desc: "" });
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2>Upload Shuttle</h2>

        <input name="name" placeholder="Shuttle Name" value={data.name} onChange={handleChange} />
        <input name="price" placeholder="Price" value={data.price} onChange={handleChange} />
        <input name="img" placeholder="Image URL" value={data.img} onChange={handleChange} />
        <textarea name="desc" placeholder="Description" value={data.desc} onChange={handleChange}></textarea>

        <button onClick={upload}>Upload</button>
      </div>
    </div>
  );
}

export default UploadShuttle;