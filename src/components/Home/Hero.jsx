import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

const Hero = () => {
  const [hero, setHero] = useState({});
  

  const fetchHero = async () => {
    try {
      const res = await axios.get("https://infiniaback.onrender.com/hero");
      console.log("Fetched Data:", res.data.data[0]);

      setHero(res.data.data[0]);
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
      .patch(`https://infinia-backend.onrender.com/hero/update/${hero._id}`, hero)
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((error) => {
        console.log(error);
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
                      value={hero.title || ""}
                    />
                  </td>
                  <td className="w-[50%]">
                    <textarea
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="subTitle"
                      type="text"
                      onChange={handleChange}
                      value={hero.subTitle || ""}
                    />
                  </td>
                  <td>
                    <input
                      className="p-2 border-2 border-gray-700"
                      name="buttonText"
                      type="text"
                      onChange={handleChange}
                      value={hero.buttonText || ""}
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
                      value={hero.num1 || ""}
                    />
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="num1Des"
                      type="text"
                      onChange={handleChange}
                      value={hero.num1Des || ""}
                    />
                  </td>
                  <td className="w-[20%]">
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="num2"
                      type="text"
                      onChange={handleChange}
                      value={hero.num2 || ""}
                    />
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="num2Des"
                      type="text"
                      onChange={handleChange}
                      value={hero.num2Des || ""}
                    />
                  </td>
                  <td className="w-[20%]">
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="num3"
                      type="text"
                      onChange={handleChange}
                      value={hero.num3 || ""}
                    />
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="num3Des"
                      type="text"
                      onChange={handleChange}
                      value={hero.num3Des || ""}
                    />
                  </td>
                  <td className="w-[20%]">
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="num4"
                      type="text"
                      onChange={handleChange}
                      value={hero.num4 || ""}
                    />
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize"
                      name="num4Des"
                      type="text"
                      onChange={handleChange}
                      value={hero.num4Des || ""}
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
