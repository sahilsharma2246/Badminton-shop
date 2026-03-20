import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">

      
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome to Badminton Hub 🏸</h1>
          <p>Your one-stop shop for all badminton needs</p>
          
        </div>
      </section>

   
      <section className="stringing">
        <div className="stringing-container">
          <img
            src="https://d2j6dbq0eux0bg.cloudfront.net/images/7002065/3321731267.jpg"
            alt="Stringing Machine"
          />
          <div>
            <h2>Professional Stringing Machine</h2>
            <p>
              Get your racquet restrung with perfect tension for better
              performance and durability.
            </p>
            <button onClick={() => navigate("/Strings")}>
              Explore Service
            </button>
          </div>
        </div>
      </section>

      
      <section className="categories">
        <h2>Explore Categories</h2>
        <div className="category-grid">

          <div className="card" onClick={() => navigate("/Racquet")}>
            🏸 Racquets
          </div>

          <div className="card" onClick={() => navigate("/Strings")}>
            🧵 Strings
          </div>

          <div className="card" onClick={() => navigate("/Shuttle")}>
            🎯 Shuttlecocks
          </div>

          <div className="card" onClick={() => navigate("/Acc")}>
            🎒 Accessories
          </div>

        </div>
      </section>

      
      <section className="featured">
        <h2>Explore Products</h2>

        <div className="products">

          <div className="product-card">
            <img src="https://totalsportsaustralia.com.au/wp-content/uploads/2023/03/29-2-Copy-1024x1024.jpg" alt="Racquet" />
            <h3>Yonex Racquet</h3>
            <p>₹1999</p>
            <button onClick={() => navigate("/Racquet")}>
              Explore
            </button>
          </div>

          <div className="product-card">
            <img src="https://yonexshop.tw/photo/BGSTG/BG65TW/zz-BG65TW_004-1.jpg?1650871926" alt="String" />
            <h3>BG65 String</h3>
            <p>₹499</p>
            <button onClick={() => navigate("/Strings")}>
              Explore
            </button>
          </div>

          <div className="product-card">
            <img src="https://altonsports.co.uk/cdn/shop/files/81anzvz2afl._ac_sl1500__1.jpg?v=1750431430" alt="Shuttle" />
            <h3>Nylon Shuttle</h3>
            <p>₹799</p>
            <button onClick={() => navigate("/Shuttle")}>
              Explore
            </button>
          </div>

        </div>
      </section>

    
      

    </div>
  );
};

export default Home;