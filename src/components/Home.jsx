import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="flex">
      <div className="w-1/5 h-screen">
        <Sidebar />
      </div>
      <div className="w-5/6 h-screen flex flex-col">
        <div>
          <Navbar />
        </div>
        <div className="flex-grow overflow-auto">
          <Body />
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
