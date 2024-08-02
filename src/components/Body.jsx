import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MainRoutes from "./MainRoutes";

export default function Body({ onLogout }) {
  // console.log('')
  return (
    <div>
      <Navbar onLogout={onLogout} />
      <div className="flex">
        <Sidebar />
        <div className="mt-24 ml-[230px]">
          <MainRoutes />
        </div>
      </div>
    </div>
  );
}
  
