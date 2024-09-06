import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  // const baseUrl = "https://infinia-kappa.vercel.app";
  const baseUrl = "http://localhost:8080";

  const handleBlogChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBlogs = [...blogs];
    updatedBlogs[index] = { ...updatedBlogs[index], [name]: value };
    setBlogs(updatedBlogs);
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

  const handleFileChange = async (index, e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      if (url) {
        const updatedBlogs = [...blogs];
        updatedBlogs[index] = { ...updatedBlogs[index], [type]: url };
        setBlogs(updatedBlogs);
      }
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(baseUrl + "/blog");
      const fetchedBlogs = response.data.data.map((blog) => {
        let formattedDate = "";
        if (blog.date && !isNaN(Date.parse(blog.date))) {
          formattedDate = new Date(blog.date).toISOString().split("T")[0];
        } else {
          console.warn("Date value is invalid or missing");
        }
        return { ...blog, date: formattedDate };
      });
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error("Error fetching blogs: ", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleUpdate = async (index) => {
    const blog = blogs[index];
    if (!blog) {
      toast.error("Blog not found");
      return;
    }
    try {
      const response = await axios.patch(
        `${baseUrl}/blog/update/${blog._id}`,
        blog
      );
      toast.success("Data Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(`Error occurred while updating data: ${error}`);
    }
  };

  return (
    <div className="w-[1200px] ml-[50px] border-2 border-red-700 mb-5">
      <h2 className="text-center p-3">Blog SECTION</h2>
      {blogs.map((blog, index) => (
        <table key={blog._id} className="table table-zebra w-full mb-4">
          <thead className="bg-gray-800 text-white w-full">
            <tr>
              <th>Description</th>
              <th>Title</th>
              <th>Image</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-[20%]">
                <textarea
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="description"
                  type="text"
                  value={blog.description}
                  onChange={(e) => handleBlogChange(index, e)}
                />
              </td>
              <td className="w-[20%]">
                <input
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="title"
                  type="text"
                  value={blog.title}
                  onChange={(e) => handleBlogChange(index, e)}
                />
              </td>
              <td className="w-[20%]">
                <input
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="image"
                  type="file"
                  onChange={(e) => handleFileChange(index, e, "image")}
                />
                <a href={blog.image} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </td>
              <td className="w-[20%]">
                <input
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="date"
                  type="date"
                  value={blog.date}
                  onChange={(e) => handleBlogChange(index, e)}
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
          </tbody>
        </table>
      ))}
    </div>
  );
}
