import React, { useState } from "react";
import InfiniaLogo from "../assets/InfiniaLogo.png";
import { MdDashboard } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { MdBrandingWatermark } from "react-icons/md";
import { FaBlog } from "react-icons/fa";
import { MdVideoCameraFront } from "react-icons/md";

export default function Sidebar() {
  let brand = ["Ecomagix", "Claymagix", "Woodmagix", "Skyace"];
  let products = [
    "Jails",
    "Bricks",
    "Doors",
    "Boards",
    "Furniture",
    "Shuttering",
    "Flooring Solution",
    "Elevational Roofing",
    "Construction Blocks",
  ];
  let product2 = products.reverse();
  const handleNavigate = (loc) => {
    console.log("Navigating to:", loc);
  };

  const [brands, setBrands] = useState(false);
  const [product, setProduct] = useState(false);

  const handleBrands = () => {
    setBrands(true);
  };
  const handleBrandsLeave = () => {
    setBrands(false);
  };
  const handleProducts = () => {
    setProduct(true);
  };
  const handleProductsLeave = () => {
    setProduct(false);
  };

  return (
    <div className="w-[310px] fixed bg-gray-100 text-white p-4 h-full">
      <img
        className="h-[70px] ml-[70px]"
        src={InfiniaLogo}
        alt="Infinia Logo"
      />
      <div>
        <hr className="mt-[10px]" />
      </div>
      <ul className="space-y-4 align-middle m-[50px]">
        <li
          onClick={() => handleNavigate("Dashboard")}
          className="flex items-center p-2 hover:bg-gray-200 rounded-md transition-colors duration-200"
        >
          <MdDashboard className="text-gray-800 m-[5px] cursor-pointer" />
          <p className="text-gray-800 ml-2 cursor-pointer">Dashboard</p>
        </li>
        <li
          onMouseEnter={handleBrands}
          onMouseLeave={handleBrandsLeave}
          className="flex flex-col items-center p-2 hover:bg-gray-200 rounded-md transition-colors duration-200"
        >
          <div className="flex flex-row mr-[80px]">
            <MdBrandingWatermark className="text-gray-800 m-[5px] cursor-pointer" />
            <p className="text-gray-800 ml-2 cursor-pointer">Brands</p>
          </div>
          <div>
            {brands && (
              <div>
                <ul>
                  {brand.map((item) => (
                    <li
                      key={item}
                      className="text-gray-800 m-2 text-left cursor-pointer hover:bg-gray-100"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </li>
        <li
          onMouseEnter={handleProducts}
          onMouseLeave={handleProductsLeave}
          className="flex flex-col items-center p-2 hover:bg-gray-200 rounded-md transition-colors duration-200"
        >
          <div className="flex flex-row mr-[80px]">
            <FaCartShopping className="text-gray-800 cursor-pointer" />
            <p className="text-gray-800 ml-2  cursor-pointer">Products</p>
          </div>
          <div>
            {product && (
              <div>
                <ul>
                  {product2.map((item) => (
                    <li
                      key={item}
                      className="text-left text-gray-800 m-3 cursor-pointer hover:bg-gray-100"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </li>
        <li
          onClick={() => handleNavigate("Dashboard")}
          className="flex items-center p-2 hover:bg-gray-200 rounded-md transition-colors duration-200"
        >
          <MdVideoCameraFront className="text-gray-800 m-[5px] cursor-pointer" />
          <p className="text-gray-800 ml-2 cursor-pointer">Media & Events</p>
        </li>
        <li
          onClick={() => handleNavigate("Dashboard")}
          className="flex items-center p-2 hover:bg-gray-200 rounded-md transition-colors duration-200"
        >
          <FaBlog className="text-gray-800 m-[5px] cursor-pointer" />
          <p className="text-gray-800 ml-2 cursor-pointer">Blogs</p>
        </li>
      </ul>
    </div>
  );
}
