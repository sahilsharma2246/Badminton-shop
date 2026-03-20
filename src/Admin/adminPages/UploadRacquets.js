import React, { useState } from "react";
import firedb from "../../firebase";
import "./Upload.css";

function UploadRacquets() {
  const [racquet, setRacquet] = useState({
    name: "",
    price: "",
    img: "",
    desc: ""
  });

  const handleChange = (e) => {
    setRacquet({
      ...racquet,
      [e.target.name]: e.target.value
    });
  };

  const uploadData = () => {
    if (!racquet.name || !racquet.price) {
      alert("Please fill required fields");
      return;
    }

    const newRef = firedb.child("Racquets").push();

    newRef.set({
      name: racquet.name,
      price: racquet.price,
      img: racquet.img,
      desc: racquet.desc
    });

    alert("Racquet Added ✅");

    setRacquet({
      name: "",
      price: "",
      img: "",
      desc: ""
    });
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2>Upload Racquet</h2>

        <input
          type="text"
          name="name"
          placeholder="Racquet Name"
          value={racquet.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={racquet.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={racquet.img}
          onChange={handleChange}
        />

        <textarea
          name="desc"
          placeholder="Description"
          value={racquet.desc}
          onChange={handleChange}
        ></textarea>

        <button onClick={uploadData}>Upload</button>
      </div>
    </div>
  );
}

export default UploadRacquets;