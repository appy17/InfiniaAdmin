import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Blog() {
  const [blog, setBlog] = useState({
    description: "",
    title: "",
    image: "",
    date: "",
  });
  const [date, setDate] = useState();

  const [image, setImage] = useState();

  const baseUrl = "http://localhost:8080";

  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
    console.log("blog2 ", blog);
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
      console.log("hiiiiiiii");
       console.log("URL", response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary: ", error);
      toast.error("Error uploading file");
      return null;
    }
  };

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    console.log('Changed Image ', file);
    if (file) {
      const url = await uploadToCloudinary(file);
      if (url) {
        setBlog((prevBlog) => {
          const updatedBlog = { ...prevBlog, [type]: url };
          console.log("Updated Blog", updatedBlog);
          return updatedBlog;
        });
      }
    }
  };

 const fetchBlogs = async () => {
   try {
     const response = await axios.get(baseUrl + "/blog");
     let info = response.data.data[0];
     setBlog(info);

     console.log("Raw date value from server:", info.date);

     let formattedDate = "";
     if (info.date && !isNaN(Date.parse(info.date))) {
       formattedDate = new Date(info.date).toISOString().split("T")[0];
     } else {
       console.warn("Date value is invalid or missing");
     }
     setBlog((prevBlog) => ({ ...prevBlog, date: formattedDate }));

    //  console.log("Blogq", info);
     setImage(info.image);
   } catch (error) {
     console.error("Error fetching blogs: ", error);
   }
 };


  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleUpdate = async () => {
    if (!blog) {
      toast.error("Blog not found");
      return;
    }
    try {
      console.log("blogs ", blog._id);
      const response = await axios.patch(
        `${baseUrl}/blog/update/${blog._id}`,
        blog
      );
      toast.success("Data Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(`Error occurred while deleting data: ${error}`);
    }
  };

  return (
    <div className="w-[1200px] ml-[50px] border-2 border-red-700 mb-5">
      <h2 className="text-center p-3">Blog SECTION</h2>
      <table className="table table-zebra w-full">
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
                onChange={handleBlogChange}
              />
            </td>
            <td className="w-[20%]">
              <input
                className="p-2 border-2 border-gray-700 w-full resize"
                name="title"
                type="text"
                value={blog.title}
                onChange={handleBlogChange}
              />
            </td>
            <td className="w-[20%]">
              <input
                className="p-2 border-2 border-gray-700 w-full resize"
                name="image"
                type="file"
                onChange={(e) => handleFileChange(e, "image")}
              />
              <a href={blog.image}>View</a>
            </td>
            <td className="w-[20%]">
              <input
                className="p-2 border-2 border-gray-700 w-full resize"
                name="date"
                type="date"
                value={blog.date}
                onChange={handleBlogChange}
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
