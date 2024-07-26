import React from "react";
import InfiniaLogo from "../assets/InfiniaLogo.png";
import Mode from "./Mode/Mode";

export default function Navbar() {
  return (
    <div className="w-full fixed top-0 z-50 flex justify-between shadow-xl text-gray-800 p-6 bg-white">
      <img className="h-[50px] ml-10" src={InfiniaLogo} alt="Infinia Logo" />
      <Mode />
    </div>
  );
}
