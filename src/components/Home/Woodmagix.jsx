import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    return null;
  }
};

const Woodmagix = () => {
  const [formState, setFormState] = useState({
    title: "",
    title2: "",
    bgimage: "",
    para: "",
    info: {
      heading: "",
      points: [],
    },
    images: [],
  });

  const [newPoint, setNewPoint] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleFileChange = async (e, field) => {
    const files = e.target.files;
    if (files.length) {
      const urls = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadToCloudinary(files[i]);
        if (url) urls.push(url);
      }
      if (field === "images") {
        setFormState((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...urls],
        }));
      } else {
        setFormState((prevState) => ({
          ...prevState,
          [field]: urls[0],
        }));
      }
    }
  };

  const handleAddPoint = () => {
    if (newPoint.trim()) {
      setFormState((prevState) => ({
        ...prevState,
        info: {
          ...prevState.info,
          points: [...prevState.info.points, newPoint],
        },
      }));
      setNewPoint("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://infinia-backend.onrender.com/woodmagix",
        formState
      );
      setSuccessMessage("Form submitted successfully!");
      setErrorMessage("");
      navigate("/woodmagix-list");
    } catch (error) {
      setErrorMessage("Error submitting form, please try again.");
      setSuccessMessage("");
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button
        onClick={navigateBack}
        className="h-[40px] mt-[10px] mb-[10px] cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
          border-blue-600
          border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
          active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
      >
        Back
      </button>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Woodmagix</h1>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
            {successMessage}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formState.title}
            onChange={(e) =>
              setFormState({ ...formState, title: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Title 2
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formState.title2}
            onChange={(e) =>
              setFormState({ ...formState, title2: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Background Image
          </label>
          <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleFileChange(e, "bgimage")}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Heading
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formState.info.heading}
            onChange={(e) =>
              setFormState({
                ...formState,
                info: { ...formState.info, heading: e.target.value },
              })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Paragraph
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formState.para}
            onChange={(e) =>
              setFormState({ ...formState, para: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Points</label>
          <input
            type="text"
            value={newPoint}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setNewPoint(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddPoint}
            className="mt-2 bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
          >
            Add Point
          </button>
          <ul className="list-disc ml-6 mt-2">
            {formState.info.points.map((point, index) => (
              <li key={index} className="text-gray-700">
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Images</label>
          <input
            type="file"
            multiple
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleFileChange(e, "images")}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {formState.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`image-${index}`}
              className="h-32 object-cover"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 mt-6"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Woodmagix;
