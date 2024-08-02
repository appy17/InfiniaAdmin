import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import InfiniaLogo from "../assets/InfiniaLogo.png";
import Mode from "./Mode/Mode";

export default function Navbar({ onLogout }) {
  return (
    <div className="w-full fixed top-0 z-50 flex justify-between items-center shadow-xl p-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
      <img className="h-[50px] ml-10" src={InfiniaLogo} alt="Infinia Logo" />
      <div className="flex items-center">
        <Mode />
        <RiLogoutCircleRLine
          title="Logout"
          style={{
            width: "20px",
          }}
          className="cursor-pointer ml-[30px] mr-[30px] w-[30px] hover:text-indigo-200 transition-all duration-300"
          onClick={() => {
            console.log("Logout icon clicked");
            onLogout();
          }}
        />
      </div>
    </div>
  );
}
