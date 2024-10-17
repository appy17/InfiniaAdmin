// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

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

const Claymagix = () => {
  const navigate = useNavigate();
  const [infoArray, setInfoArray] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formState, setFormState] = useState({
    title: "",
    title2: "",
    background: "",
    heading: "",
    paragraph: "",
    points: "",
    images: [""],
  });
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const baseUrl = "http://localhost:8080/claymagix";

  const handleFileChange = async (e, fieldName, index = null) => {
    const file = e.target.files;
    if (file.length) {
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
      newImages.push(""); 
      return { ...prevState, images: newImages };
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

    // console.log("Form Data:", updatedFormState);

    try {
      if (editingId) {
        console.log("edit", editingId);
        await axios.patch(`${baseUrl}/update/${editingId}`, updatedFormState);

        toast.success("Entry updated successfully");
      } else {
        // await axios.post(`${baseUrl}/create`, updatedFormState);
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
      const response = await axios.get(`${baseUrl}`);
      const data = response?.data?.data ?? [];

      // console.log("dattta", data[0].info);
      setInfoArray(data[0].info);

      setEntries(Array.isArray(data) ? data : [data]);
      setFormState(response?.data?.data[0] || {});
    } catch (error) {
      console.log(error);
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
      await axios.delete(`${baseUrl}/${id}`);
      toast.success("Entry deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Error deleting entry");
    }
  };
  console.log("form", formState);
  const navigateBack = () => {
    navigate(-1);
  };

  const handleEdit1 = (index) => {
    setEditingIndex(index);
  };

  const handleUpdateChange = (e, field, index, pointIndex = null) => {
    const updatedArray = [...infoArray]; 

    if (field === "heading") {
      updatedArray[index].heading = e.target.value;
    } else if (field === "points") {
      updatedArray[index].points[pointIndex] = e.target.value;
    }

    setInfoArray(updatedArray); 
  };

  const handleSave = async (i) => {
    delete formState.info;

    const updatedObject = infoArray[i];

    const updatedArray = infoArray.map((item, index) => {
      return index === i ? updatedObject : item;
    });

    const dispatch = {
      ...formState,
      info: updatedArray,
    };

    try {
      await axios.patch(`${baseUrl}/update/${formState._id}`, dispatch);
      alert("Update Successful!");
    } catch (error) {
      console.error("Error updating object:", error);
    }

    setEditingIndex(null);
    fetchData();
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
              Title 2
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState?.title2}
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
              onChange={(e) => handleFileChange(e, "background")}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Paragraph
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formState?.para}
              onChange={(e) =>
                setFormState({ ...formState, para: e.target.value })
              }
            />
          </div>

          <div>
            {infoArray.map((info, index) => (
              <div key={info._id}>
                {editingIndex === index ? (
                  <div>
                    <input
                      type="text"
                      value={info.heading}
                      onChange={(e) => handleUpdateChange(e, "heading", index)}
                    />

                    {info.points.map((point, pointIndex) => (
                      <input
                        key={pointIndex}
                        type="text"
                        value={point}
                        onChange={(e) =>
                          handleUpdateChange(e, "points", index, pointIndex)
                        }
                      />
                    ))}

                    <button
                      className="w-[50%] bg-green-500 text-white p-2 rounded hover:bg-blue-600 transition"
                      onClick={() => handleSave(index)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3>{info.heading}</h3>
                    <ul>
                      {info.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                    <button
                      className="w-[50%] bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                      onClick={() => handleEdit1(index)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
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
                  onChange={(e) => handleFileChange(e, "images", index)}
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
          {Array.isArray(entries) && entries.length > 0 ? (
            entries.map((entry) => (
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
            ))
          ) : (
            <p>No entries available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Claymagix;
