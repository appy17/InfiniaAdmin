import React from "react";
import { IoSearchSharp } from "react-icons/io5";  

export default function Navbar() {
  return (
    <div className="w-full bg-gray-100 text-gray-800 p-6">
      <div className="p-5 overflow-hidden w-[40px] h-[40px] hover:w-[270px] bg-[#4070f4] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
        <div className="flex items-center justify-center ">
          <IoSearchSharp className="w-[25px] h-[25px] ml-[-12px] items-center fill-white" />
        </div>

        <input
          type="text"
          className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
        />
      </div>
    </div>
  );
}
