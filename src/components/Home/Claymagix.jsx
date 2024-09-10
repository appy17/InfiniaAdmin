import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "myCloud");
  formData.append("cloud_name", "dnevtbn0x");

  // const baseUrl = 'https://infinia-backend.onrender.com/claymagix'
  const baseUrl = "http://localhost:5173/8080";

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

const Claymagix = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: "",
    title2: "",
    background: "", // Background image
    heading: "",
    paragraph: "",
    points: [""],
    images: [""],
  });
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Define baseUrl here
  const baseUrl = "http://localhost:8080";

  const handleFileChange = async (e, fieldName, index = null) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      if (url) {
        if (fieldName === "background") {
          setFormState((prevState) => ({
            ...prevState,
            background: url,
          }));
        } else if (fieldName === "images" && index !== null) {
          setFormState((prevState) => {
            const newImages = [...prevState.images];
            newImages[index] = url;
            return { ...prevState, images: newImages };
          });
        }
      }
    }
  };

  const handleAddImage = () => {
    setFormState((prevState) => ({
      ...prevState,
      images: [...prevState.images, ""],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormState((prevState) => {
      const newImages = [...prevState.images];
      newImages.splice(index, 1);
      return { ...prevState, images: newImages };
    });
  };

  const handlePointChange = (index, value) => {
    setFormState((prevState) => {
      const newPoints = [...prevState.points];
      newPoints[index] = value;
      return { ...prevState, points: newPoints };
    });
  };

  const handleAddPoint = () => {
    setFormState((prevState) => ({
      ...prevState,
      points: [...prevState.points, ""],
    }));
  };

  const handleRemovePoint = (index) => {
    setFormState((prevState) => {
      const newPoints = [...prevState.points];
      newPoints.splice(index, 1);
      return { ...prevState, points: newPoints };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormState = {
      ...formState,
      info: {
        heading: formState.heading,
        points: formState.points,
      },
    };

    // Log the updated form state for debugging
    console.log("Form Data:", updatedFormState);

    try {
      if (editingId) {
        await axios.patch(
          `${baseUrl}/claymagix/updateclamagix/${editingId}`,
          updatedFormState
        );
        toast.success("Entry updated successfully");
      } else {
        await axios.post(`${baseUrl}/addclaymagix`, updatedFormState);
        toast.success("Entry created successfully");
      }
      setFormState({
        title: "",
        title2: "",
        background: "",
        heading: "",
        paragraph: "",
        points: [""],
        images: [""],
      });
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.log(`Occured error while handling submit ${error}`);
      toast.error("Error submitting form");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getclaymagix`);
      setEntries(response.data);
    } catch (error) {
      toast.error("Error fetching entries");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (entry) => {
    setFormState({
      title: entry.title,
      title2: entry.title2,
      background: entry.bgimage,
      heading: entry.info?.heading,
      paragraph: entry.para,
      points: entry.info?.points || [""],
      images: entry.images || [""],
    });
    setEditingId(entry._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/claymagix/${id}`);
      toast.success("Entry deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Error deleting entry");
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex">
      <button
        onClick={navigateBack}
        className="h-[40px] mt-[10px] mb-[10px] cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
      >
        Back
      </button>
      <div className="ml-[400px] p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">CLAYMAGIX</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
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
              onChange={(e) => handleFileChange(e, "background")} // Handle background image
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Paragraph
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.paragraph}
              onChange={(e) =>
                setFormState({ ...formState, paragraph: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Heading
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState.heading}
              onChange={(e) =>
                setFormState({ ...formState, heading: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Points
            </label>
            {formState.points.map((point, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={point}
                  onChange={(e) => handlePointChange(index, e.target.value)}
                />
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => handleRemovePoint(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 text-blue-500"
              onClick={handleAddPoint}
            >
              Add Point
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Images
            </label>
            {formState.images.map((image, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleFileChange(e, "images", index)} // Handle image file uploads
                />
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => handleRemoveImage(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 text-blue-500"
              onClick={handleAddImage}
            >
              Add Image
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            {editingId ? "Update" : "Submit"}
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Entries</h2>
          {entries.map((entry) => (
            <div
              key={entry._id}
              className="mb-4 p-4 border border-gray-300 rounded-lg"
            >
              <h3 className="text-lg font-semibold">{entry.title}</h3>
              <button
                className="mr-2 text-blue-500"
                onClick={() => handleEdit(entry)}
              >
                Edit
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDelete(entry._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Claymagix;
