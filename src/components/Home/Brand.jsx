import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Brand() {
  const [brand, setBrand] = useState({
    name: "",
    description: "",
  });

   const baseUrl = "http://localhost:8080";

 const handleChange = (e) => {
   const { name, value } = e.target;
   setBrand((prev) => ({
     ...prev,
     [name]: value,
   }));
  //  console.log('xxxxxx', brand);
 };

  const handleUpdate = () => {
    toast.success('Update is working');
  };

  const fetchBrand = async() => {
  try {
    const response = await axios.get(baseUrl + "/brands");
    setBrand(response.data.data[0]);
    console.log('Brands ', brand);
  } catch (error) {
    toast.error(`Something went Wrong`);
    console.log(`Occured Error while fetching data ${error}`);
  }
  }

  useEffect(() =>{
    fetchBrand();
  },[])

  return (
    <div className="z-1">
      <div className="ml-[100px] border-2 w-[1200px] mt-3">
        <h2 className="text-center p-3">BRAND SECTION</h2>
        <div className="w-full border-2 border-red-700">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-800 text-white w-full">
              <tr>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-[20%]">
                  <input
                    className="p-2 border-2 border-gray-700 w-full resize"
                    name="title"
                    type="text"
                    onChange={handleChange}
                  
                  />
                </td>
                <td className="w-[50%]">
                  <textarea
                    className="p-2 border-2 border-gray-700 w-full resize"
                    name="subTitle"
                    type="text"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-success text-white btn-sm items-center"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
