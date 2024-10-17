import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function AboutLast() {
  const [about, setAbout] = useState([]);
  const baseUrl = "https://infiniaback.onrender.com";
  // const baseUrl = "http://localhost:8080";

  const handleAboutChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAbout = [...about];
    updatedAbout[index][name] = value;
    setAbout(updatedAbout);
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

  const handleFileChange = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      if (url) {
        const updatedAbout = [...about];
        updatedAbout[index].image = url;
        setAbout(updatedAbout);
      }
    }
  };

  const fetchAbout = async () => {
    try {
      const response = await axios.get(baseUrl + "/aboutlast");
      const data = response.data.data;

      if (Array.isArray(data)) {
        setAbout(data);
      } else {
        setAbout([data]); // If data is not an array, convert it to an array with one object
      }

      console.log("AboutLast", response);
    } catch (error) {
      console.error("Error fetching about: ", error);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleUpdate = async (index) => {
    const aboutItem = about[index];
    if (!aboutItem) {
      toast.error("About not found");
      return;
    }
    try {
      const response = await axios.patch(
        `${baseUrl}/aboutlast/update/${aboutItem._id}`,
        aboutItem
      );
      toast.success("Data Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(`Error occurred while updating data: ${error}`);
    }
  };

  return (
    <div className="w-full border-2 mb-5">
      <h2 className="text-center p-3">ABOUT LAST SECTION</h2>
      <table className="table table-zebra w-full">
        <thead className="bg-gray-800 text-white w-full">
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {about.map((item, index) => (
            <tr key={item._id}>
              <td className="w-[20%]">
                <input
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="title"
                  type="text"
                  value={item.title}
                  onChange={(e) => handleAboutChange(e, index)}
                />
              </td>

              <td className="w-[20%]">
                <input
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="image"
                  type="file"
                  onChange={(e) => handleFileChange(e, index)}
                />
                <a href={item.image}>View</a>
              </td>
              <td className="w-[20%]">
                <textarea
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="description"
                  type="text"
                  value={item.description}
                  onChange={(e) => handleAboutChange(e, index)}
                />
              </td>

              <td>
                <button
                  className="btn btn-success text-white btn-sm items-center"
                  onClick={() => handleUpdate(index)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
