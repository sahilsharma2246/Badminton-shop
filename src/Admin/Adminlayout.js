import React from "react";
import { Outlet } from "react-router-dom";

import AdminHeader from "./adminComponent/AdminHeader";
import AdminFooter from "./adminComponent/AdminFooter";

function AdminLayout() {
  return (
    <>
      <AdminHeader />     
      
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Outlet />        
      </main>

      <AdminFooter />     
    </>
  );
}

export default AdminLayout;