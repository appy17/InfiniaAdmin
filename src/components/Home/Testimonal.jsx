import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Testimonial() {
  const [testimonial, setTestimonial] = useState({
    name: "",
    city: "",
    icon: "",
    image: "",
    title: "",
  });

  const [image, setImage] = useState();
  const [icon, setIcon] = useState();

  const baseUrl = "http://localhost:8080";

  const handleTestimonialChange = (e) => {
    const { name, value } = e.target;
    setTestimonial((prevTestimonial) => ({
      ...prevTestimonial,
      [name]: value,
    }));
    console.log("Testimonial2 ", testimonial.icon);
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
         setTestimonial((prevTestimonial) => {
           const updatedTestimonial = { ...prevTestimonial, [type]: url };
           console.log("Updated Testimonial", updatedTestimonial);
           return updatedTestimonial;
         });
       }
     }
   };


  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(baseUrl + "/testimonial");
      setTestimonial(response.data.data[0]);
      // console.log("Testimonial", response.data.data[0]);
      setImage(response.data.data[0].image);
      setIcon(response.data.data[0].icon);
    } catch (error) {
      console.error("Error fetching testimonials: ", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleUpdate = async () => {
    if (!testimonial) {
      toast.error("Testimonial not found");
      return;
    }
    try {
      // console.log("Testimonials ", testimonial._id);
      const response = await axios.patch(
        `${baseUrl}/testimonial/update/${testimonial._id}`,
        testimonial
      );
      // console.log("hiiiiiiiiiiiiii");
      toast.success("Data Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(`Error occurred while deleting data: ${error}`);
    }
  };

  return (
    <div className="w-full border-2 border-red-700 mb-5">
      <h2 className="text-center p-3">Testimonial SECTION</h2>
      <table className="table table-zebra w-full">
        <thead className="bg-gray-800 text-white w-full">
          <tr>
            <th>Name of Customer</th>
            <th>City of Customer</th>
            <th>Icon of Customer</th>
            <th>Image of Customer</th>
            <th>Title of Customer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="w-[20%]">
              <input
                className="p-2 border-2 border-gray-700 w-full resize"
                name="name"
                type="text"
                value={testimonial.name}
                onChange={handleTestimonialChange}
              />
            </td>
            <td className="w-[20%]">
              <input
                className="p-2 border-2 border-gray-700 w-full resize"
                name="city"
                type="text"
                value={testimonial.city}
                onChange={handleTestimonialChange}
              />
            </td>
            <td className="w-[20%]">
              <input
                className="p-2 border-2 border-gray-700 w-full resize"
                name="icon"
                type="file"
                onChange={(e) => handleFileChange(e, "icon")}
              />
              <a href={testimonial.icon}>View</a>
            </td>
            <td className="w-[20%]">
              <input
                className="p-2 border-2 border-gray-700 w-full resize"
                name="image"
                type="file"
                onChange={(e) => handleFileChange(e, "image")}
              />
              <a href={testimonial.image}>View</a>
            </td>
            <td className="w-[20%]">
              <input
                className="p-2 border-2 border-gray-700 w-full resize"
                name="title"
                type="text"
                value={testimonial.title}
                onChange={handleTestimonialChange}
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
