import axios from "axios";
import React, { useEffect, useState } from "react";

const Hero = () => {
  const [hero, setHero] = useState({}); // Initialize hero as an empty object

  const fetchHero = async () => {
    try {
      const res = await axios.get("https://infinia-backend.onrender.com");
      console.log("Fetched Data:", res.data);

      setHero(res.data);
      console.log("Hero ", hero);
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setHero((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    axios
      .patch(
        `https://infinia-backend.onrender.com/hero/update/${hero._id}`,
        hero
      )
      .then((res) => {
        alert(res.data.msg); 
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchHero();
  }, []);

  return (
    <>
      <div className="pt-24 overflow-y-hidden">
        <div className="border-2 w-full max-w-[1289px] mx-auto mt-[-100px]">
          <h2 className="text-center p-3">HERO SECTION</h2>
          <div className="w-full border-2 border-red-700">
            <table className="table table-zebra w-full">
              <thead className="bg-gray-800 text-white w-full">
                <tr>
                  <th>Title</th>
                  <th>Subtitle</th>
                  <th>Button Text</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-[20%]">
                    <textarea
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="title"
                      type="text"
                      onChange={handleChange}
                      value={hero || ""} // Default to empty string if title is undefined
                    />
                  </td>
                  <td className="w-[50%]">
                    <textarea
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="subTitle"
                      type="text"
                      onChange={handleChange}
                      value={hero.subTitle || ""}  undefined
                    />
                  </td>
                  <td>
                    <input
                      className="p-2 border-2 border-gray-700"
                      name="buttonText"
                      type="text"
                      onChange={handleChange}
                      value={hero.buttonText || ""} // Default to empty string if buttonText is undefined
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

            <h2 className="text-center p-3">STATS SECTION</h2>
            <table className="table table-zebra w-full">
              <thead className="bg-gray-800 text-white w-full">
                <tr>
                  <th>First</th>
                  <th>Second</th>
                  <th>Third</th>
                  <th>Fourth</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-[20%]">
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="num1"
                      type="text"
                      onChange={handleChange}
                      value={hero.num1 || ""} // Default to empty string if num1 is undefined
                    />
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="num1Des"
                      type="text"
                      onChange={handleChange}
                      value={hero.num1Des || ""} // Default to empty string if num1Des is undefined
                    />
                  </td>
                  <td className="w-[20%]">
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="num2"
                      type="text"
                      onChange={handleChange}
                      value={hero.num2 || ""} // Default to empty string if num2 is undefined
                    />
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="num2Des"
                      type="text"
                      onChange={handleChange}
                      value={hero.num2Des || ""} // Default to empty string if num2Des is undefined
                    />
                  </td>
                  <td className="w-[20%]">
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="num3"
                      type="text"
                      onChange={handleChange}
                      value={hero.num3 || ""} // Default to empty string if num3 is undefined
                    />
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="num3Des"
                      type="text"
                      onChange={handleChange}
                      value={hero.num3Des || ""} // Default to empty string if num3Des is undefined
                    />
                  </td>
                  <td className="w-[20%]">
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="num4"
                      type="text"
                      onChange={handleChange}
                      value={hero.num4 || ""} // Default to empty string if num4 is undefined
                    />
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="num4Des"
                      type="text"
                      onChange={handleChange}
                      value={hero.num4Des || ""} // Default to empty string if num4Des is undefined
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
    </>
  );
};

export default Hero;
