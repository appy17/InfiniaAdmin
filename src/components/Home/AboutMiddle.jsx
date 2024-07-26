import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function AboutMiddle() {
  const [about, setAbout] = useState({
    description: "",
    image: "",
    title: "",
  });

  const [image, setImage] = useState();

  const baseUrl = "http://localhost:8080";

  const handleAboutChange = (e) => {
    const { name, value } = e.target;
    setAbout((prevAbout) => ({
      ...prevAbout,
      [name]: value,
    }));
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
      //  console.log("URL", response.data.secure_url);
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
        setAbout((prevAbout) => {
          const updatedAbout = { ...prevAbout, [type]: url };
          console.log("Updated About", updatedAbout);
          return updatedAbout;
        });
      }
    }
  };

  const fetchAbout = async () => {
    try {
      const response = await axios.get(baseUrl + "/aboutExpertise");
      setAbout(response.data.data[0]);
      // console.log("AboutMiddle", response.data.data[0]);
      setImage(response.data.data[0].image);
    } catch (error) {
      console.error("Error fetching abouts: ", error);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleUpdate = async () => {
    if (!about) {
      toast.error("About not found");
      return;
    }
    try {
      // console.log("About ", about._id);
      const response = await axios.patch(
        `${baseUrl}/aboutExpertise/update/${about._id}`,
        about
      );
      // console.log("hiiiiiiiiiiiiii");
      toast.success("Data Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(`Error occurred while deleting data: ${error}`);
    }
  };

  return (
    <div className="w-full border-2 mb-5">
      <h2 className="text-center p-3">ABOUT EXPERTIES SECTION</h2>
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
          <tr>
            <td className="w-[20%]">
              <input
                className="p-2 border-2 border-gray-700 w-full resize"
                name="title"
                type="text"
                value={about.title}
                onChange={handleAboutChange}
              />
            </td>

            <td className="w-[20%]">
              <input
                className="p-2 border-2 border-gray-700 w-full resize"
                name="image"
                type="file"
                onChange={(e) => handleFileChange(e, "image")}
              />
              <a href={about.image}>View</a>
            </td>
            <td className="w-[20%]">
              <textarea
                className="p-2 border-2 border-gray-700 w-full resize"
                name="description"
                type="text"
                value={about.description}
                onChange={handleAboutChange}
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
  );
}
