import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./userComponent/Header";
import Footer from "./userComponent/Footer";

function UserLayout() {
  return (
    <>
      <Header />       
      
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Outlet />     
      </main>
      
      <Footer />      
    </>
  );
}

export default UserLayout;