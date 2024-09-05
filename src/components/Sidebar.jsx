import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { LiaBlogSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { SiAboutdotme } from "react-icons/si";
import { TbBrandSafari } from "react-icons/tb";
import { MdOutlineEventSeat } from "react-icons/md";
import { AiOutlineFontSize } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaImage } from "react-icons/fa";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`h-[110vh] fixed mt-[100px] pt-5 transition-width duration-500 z-20 ${
        isExpanded ? "w-[14%]" : "w-[5%]"
      } bg-gray-100 shadow-lg`}
    >
      <div className="pl-4 flex flex-col justify-between h-full">
        <div>
          <Link to="/">
            <div className="mt-4 flex items-center cursor-pointer w-full hover:bg-gray-200 p-2 rounded">
              <RiDashboardFill size={20} />
              {isExpanded && (
                <h3 className="transition-all duration-500 text-lg font-bold ml-2">
                  DASHBOARD
                </h3>
              )}
            </div>
          </Link>

          <Link to="/home">
            <div className="mt-4 flex items-center cursor-pointer w-full hover:bg-gray-200 p-2 rounded">
              <IoHome size={20} />
              {isExpanded && (
                <h3 className="transition-all duration-500 text-lg font-bold ml-2">
                  HOME
                </h3>
              )}
            </div>
          </Link>

          <Link to="/blog">
            <div className="mt-4 flex items-center cursor-pointer w-full hover:bg-gray-200 p-2 rounded">
              <LiaBlogSolid size={20} />
              {isExpanded && (
                <h3 className="transition-all duration-500 text-lg font-bold ml-2">
                  BLOG
                </h3>
              )}
            </div>
          </Link>

          <Link to="/about">
            <div className="mt-4 flex items-center cursor-pointer w-full hover:bg-gray-200 p-2 rounded">
              <SiAboutdotme size={20} />
              {isExpanded && (
                <h3 className="transition-all duration-500 text-lg font-bold ml-2">
                  ABOUT
                </h3>
              )}
            </div>
          </Link>

          <Link to="/brand">
            <div className="mt-4 flex items-center cursor-pointer w-full hover:bg-gray-200 p-2 rounded">
              <TbBrandSafari size={20} />
              {isExpanded && (
                <h3 className="transition-all duration-500 text-lg font-bold ml-2">
                  BRAND
                </h3>
              )}
            </div>
          </Link>

          <Link to="/event">
            <div className="mt-4 flex items-center cursor-pointer w-full hover:bg-gray-200 p-2 rounded">
              <MdOutlineEventSeat size={20} />
              {isExpanded && (
                <h3 className="transition-all duration-500 text-lg font-bold ml-2">
                  EVENTS
                </h3>
              )}
            </div>
          </Link>
          <Link to="/product">
            <div className="mt-4 flex items-center cursor-pointer w-full hover:bg-gray-200 p-2 rounded">
              <MdProductionQuantityLimits size={20} />
              {isExpanded && (
                <h3 className="transition-all duration-500 text-lg font-bold ml-2">
                  PRODUCTS
                </h3>
              )}
            </div>
          </Link>
        </div>

        <div
          className={`absolute top-1/2 transform -translate-y-1/2 ${
            isExpanded ? "left-[85%]" : "left-full"
          } transition-left duration-500`}
        >
          <button
            className="bg-gray-600 p-2 rounded-full focus:outline-none hover:bg-gray-500"
            onClick={toggleSidebar}
          >
            {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>
      </div>
    </div>
  );
}
