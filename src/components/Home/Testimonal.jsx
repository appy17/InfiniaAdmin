import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);

  const baseUrl = "http://localhost:8080";

  const handleTestimonialChange = (e, id) => {
    const { name, value } = e.target;
    setTestimonials((prevTestimonials) =>
      prevTestimonials.map((testimonial) =>
        testimonial._id === id ? { ...testimonial, [name]: value } : testimonial
      )
    );
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

  const handleFileChange = async (e, type, id) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      if (url) {
        setTestimonials((prevTestimonials) =>
          prevTestimonials.map((testimonial) =>
            testimonial._id === id
              ? { ...testimonial, [type]: url }
              : testimonial
          )
        );
      }
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(baseUrl + "/testimonial");
      setTestimonials(response.data.data);
    } catch (error) {
      console.error("Error fetching testimonials: ", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleUpdate = async (id) => {
    const testimonialToUpdate = testimonials.find(
      (testimonial) => testimonial._id === id
    );
    if (!testimonialToUpdate) {
      toast.error("Testimonial not found");
      return;
    }
    try {
      const response = await axios.patch(
        `${baseUrl}/testimonial/update/${id}`,
        testimonialToUpdate
      );
      if (response.status === 200) {
        toast.success("Data Updated Successfully");
        fetchTestimonials(); // Refresh the data after update
      } else {
        toast.error("Failed to update data");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(`Error occurred while updating data: ${error}`);
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
          {testimonials.map((testimonial) => (
            <tr key={testimonial._id}>
              <td className="w-[20%]">
                <input
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="name"
                  type="text"
                  value={testimonial.name}
                  onChange={(e) => handleTestimonialChange(e, testimonial._id)}
                />
              </td>
              <td className="w-[20%]">
                <input
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="city"
                  type="text"
                  value={testimonial.city}
                  onChange={(e) => handleTestimonialChange(e, testimonial._id)}
                />
              </td>
              <td className="w-[20%]">
                <input
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="icon"
                  type="file"
                  onChange={(e) => handleFileChange(e, "icon", testimonial._id)}
                />
                <a
                  href={testimonial.icon}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </td>
              <td className="w-[20%]">
                <input
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="image"
                  type="file"
                  onChange={(e) =>
                    handleFileChange(e, "image", testimonial._id)
                  }
                />
                <a
                  href={testimonial.image}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </td>
              <td className="w-[20%]">
                <input
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="title"
                  type="text"
                  value={testimonial.title}
                  onChange={(e) => handleTestimonialChange(e, testimonial._id)}
                />
              </td>
              <td>
                <button
                  className="btn btn-success text-white btn-sm items-center"
                  onClick={() => handleUpdate(testimonial._id)}
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
