import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { LiaBlogSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { SiAboutdotme } from "react-icons/si";
import { TbBrandSafari } from "react-icons/tb";
export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      style={{
        zIndex: "",
      }}
      className={`h-[85vh] fixed mt-[97px]  pt-5 transition-width duration-500 z-2  ${
        isExpanded ? "w-[14%]" : "w-[5%]"
      } bg-gray-100`}
    >
      <div className="pl-8 flex flex-col justify-between">
        {/* Dashbard */}
        <div>
          <Link to="/">
            <div className="mt-4  flex items-center cursor-pointer w-full">
              <RiDashboardFill size={20} />
              {isExpanded && (
                <h3
                  className={`transition-all duration-500 ${
                    isExpanded
                      ? "opacity-100 max-h-10"
                      : "opacity-0 max-h-0 overflow-hidden"
                  } text-lg font-bold`}
                >
                  DASHBOARD
                </h3>
              )}
            </div>
          </Link>
        </div>

        {/* Home */}
        <div>
          <Link to="/home">
            <ul className="mt-4  flex items-center cursor-pointer w-full ">
              <li>
                <details close>
                  <summary className="flex ">
                    {" "}
                    <IoHome size={20} />{" "}
                    {isExpanded && (
                      <h3
                        className={`transition-all ml-2 duration-500 -mt-1 ${
                          isExpanded
                            ? "opacity-100 max-h-10"
                            : "opacity-0 max-h-0 overflow-hidden"
                        } text-lg font-bold`}
                      >
                        HOME
                      </h3>
                    )}
                  </summary>
                </details>
              </li>
            </ul>
          </Link>
        </div>

        {/* Blog */}
        <div>
          <Link to="/blog">
            <div className="w-full mt-[10px] cursor-pointer flex items-center gap-2">
              <LiaBlogSolid size={20} />
              {isExpanded && (
                <h3
                  className={`transition-all duration-500 ${
                    isExpanded
                      ? "opacity-100 max-h-10"
                      : "opacity-0 max-h-0 overflow-hidden"
                  } text-lg font-bold`}
                >
                  BLOG
                </h3>
              )}
            </div>
          </Link>
        </div>

        {/*About*/}
        <div>
          <Link to="/about">
            <div className="w-full mt-[10px] cursor-pointer flex items-center gap-2">
              <SiAboutdotme size={20} />
              {isExpanded && (
                <h3
                  className={`transition-all duration-500 ${
                    isExpanded
                      ? "opacity-100 max-h-10"
                      : "opacity-0 max-h-0 overflow-hidden"
                  } text-lg font-bold`}
                >
                  ABOUT
                </h3>
              )}
            </div>
          </Link>
        </div>

        {/*Brands*/}
        <div>
          <Link to="/brand">
            <div className="w-full mt-[10px] cursor-pointer flex items-center gap-2">
              <TbBrandSafari size={20} />
              {isExpanded && (
                <h3
                  className={`transition-all duration-500 ${
                    isExpanded
                      ? "opacity-100 max-h-10"
                      : "opacity-0 max-h-0 overflow-hidden"
                  } text-lg font-bold`}
                >
                  BRAND
                </h3>
              )}
            </div>
          </Link>
        </div>

        {/* <Link to="/login">
          <div className="w-full mt-[10px] cursor-pointer flex items-center gap-2">
            <TbBrandSafari size={20} />
            {isExpanded && (
              <h3
                className={`transition-all duration-500 ${
                  isExpanded
                    ? "opacity-100 max-h-10"
                    : "opacity-0 max-h-0 overflow-hidden"
                } text-lg font-bold`}
              >
                LOGIN
              </h3>
            )}
          </div>
        </Link> */}
      </div>
      <div
        className={`fixed top-[16%] z-1 transition-left duration-500 ${
          !isExpanded ? "left-[5.5%]" : "left-[15.5%]"
        } transform -translate-x-1/2`}
      >
        <button
          className="bg-gray-600 p-3 btn-neutral rounded-full"
          onClick={toggleSidebar}
        >
          {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
    </div>
  );
}
