import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Offering = () => {
  const [data, setData] = useState({
    description: "",
    image: [],
    title: "",
    buttonText: "",
    buttonColor:""
  });
  const [imgArr, setImgArr] = useState([]);

  const fetchHero = () => {
    axios
      .get("http://localhost:8080/offering")
      .then((res) => {
        // console.log("Offering data", res.data.data[0].images);
        setData(res.data.data[0]);
        setImgArr(res.data.data[0].images);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log('File data without image ', data);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "myCloud");
    formData.append("cloud_name", "dnevtbn0x");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnevtbn0x/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary: ", error);
      toast.error("Error uploading file");
      return null;
    }
  };

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      if (url) {
        setData((prevAbout) => {
          const updatedAbout = { ...prevAbout, [type]: url };
          console.log("Updated ", updatedAbout);
          return updatedAbout;
        });
      }
    }
  };

  const handleUpdate = () => {
   console.log("Form data ", data);
    axios.put(`http://localhost:8080/offering/update/${data._id}`, data)
      .then((res) => {
        toast.success('Data added successfully');
        console.log(res.data.msg);
      })
      .catch((error) => {
        toast.error('Something went wrong')
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchHero();
  }, []);

  return (
    <>
      <div>
        <div className="border-2 w-[1350px] mt-3">
          <h2 className="text-center p-3">OFFERING SECTION</h2>
          <div className="w-full border-2 border-red-700">
            <table className="table table-zebra w-full">
              <thead className="bg-gray-800 text-white w-full">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Button Text</th>
                  <th>Button Color</th>
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
                      value={data.title || ""}
                    />
                  </td>
                  <td className="w-[100px]">
                    <textarea
                      className="p-2 border-2 border-gray-700 w-[250px] resize"
                      name="description"
                      type="text"
                      onChange={handleChange}
                      value={data.description || ""}
                    />
                  </td>
                  <td>
                    {imgArr && Array.isArray(imgArr) ? (
                      imgArr.map((item, index) => (
                        <div key={index} className="flex flex-col">
                          <input
                            className="p-2 border-2 border-gray-700 mb-2"
                            name={`image-${index}`}
                            type="file"
                            onChange={(e) => handleFileChange(e, index)}
                          />
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </div>
                      ))
                    ) : (
                      <div>No Images</div>
                    )}
                  </td>
                  <td>
                    <input
                      className="p-2 border-2 border-gray-700"
                      name="buttonText"
                      type="text"
                      onChange={handleChange}
                      value={data.buttonText || ""}
                    />
                  </td>
                  <td>
                    <input
                      className="p-2 border-2 border-gray-700"
                      name="buttonColor"
                      type="text"
                      onChange={handleChange}
                      value={data.buttonColor || ""}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-success text-white btn-sm"
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

export default Offering;
