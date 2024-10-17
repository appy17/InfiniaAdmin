// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

const Skyace = () => {
  const [infoArray, setInfoArray] = useState([]);
  const [features, setFeatures] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [entries, setEntries] = useState([]);
  const baseUrl = "https://infiniaback.onrender.com/skyace";
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState({
    title: "",
    background: "",
    heading: "",
    paragraph: "",
    points: "",
    images: [],
  });

  // Handle file changes and upload to Cloudinary
  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      if (url) {
        setFormState((prevState) => {
          if (field === "images") {
            return { ...prevState, images: [...prevState.images, url] };
          }
          return { ...prevState, [field]: url };
        });
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}`);
      const data = response?.data?.data ?? [];
      setInfoArray(data[0].info);
      setFeatures(data[0].features);
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

  // const handleAddImage = () => {
  //   setFormState((prevState) => ({
  //     ...prevState,
  //     images: [...prevState.images, ""],
  //   }));
  // };
  const handleEdit1 = (index) => {
    setEditingIndex(index);
  };

  const handleRemoveImage = (index) => {
    setFormState((prevState) => {
      const newImages = [...prevState.images];
      newImages.splice(index, 1);
      return { ...prevState, images: newImages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormState = {
      ...formState,
      info: infoArray,
      features: features,
    };
    // console.log("result", updatedFormState)
    try {
      if (editingId) {
        console.log("editingId ", `${baseUrl}/update/${editingId}`);
        await axios.patch(`${baseUrl}/update/${editingId}`, updatedFormState);
        toast.success("Entry updated successfully");
      } else {
        await axios.post(baseUrl, updatedFormState);
        toast.success("Entry created successfully");
      }
      setFormState({
        title: "",
        background: "",
        heading: "",
        info: [""],
        images: [""],
      });
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.log(`Error while submitting: ${error}`);
      toast.error("Error submitting form");
    }
  };

  const handleEdit = (entry) => {
    // setFormState({
    //   title: entry.title,
    //   background: entry.bgimage,
    //   heading: entry.info?.heading,
    //   paragraph: entry.para,
    //   points: entry.info?.points || [""],
    //   images: entry.images || [""],
    // });
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

  const handleUpdateChange = (e, field, index, pointIndex = null) => {
    const updatedArray = [...infoArray];
    if (field === "heading") {
      updatedArray[index].heading = e.target.value;
    } else if (field === "points" && pointIndex !== null) {
      updatedArray[index].points[pointIndex] = e.target.value;
    }
    setInfoArray(updatedArray);
  };

  const handleSave = async (i) => {
    const updatedObject = infoArray[i];
    const updatedArray = infoArray.map((item, index) =>
      index === i ? updatedObject : item
    );

    const dispatch = {
      ...formState,
      info: updatedArray,
      features: features,
    };

    try {
      await axios.patch(`${baseUrl}/update/${formState._id}`, dispatch);
      toast.success("Update successful!");
    } catch (error) {
      console.error("Error updating object:", error);
    }

    setEditingIndex(null);
    fetchData();
  };

  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };

  const handleInputChangeFeatues = (e, id) => {
    const { name, value } = e.target;
    const updatedArray = features.map((item) =>
      item._id === id ? { ...item, [name]: value } : item
    );

    setFeatures(updatedArray);
  };
  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    const updatedArray = infoArray.map((item) =>
      item._id === id ? { ...item, [name]: value } : item
    );

    setInfoArray(updatedArray);
  };
  // console.log("appy", formState);

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

      <div className="max-w-4xl p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Skyace</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              value={formState?.title || ""}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFormState({ ...formState, title: e.target.value })
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
            {formState.background && (
              <img
                src={formState.background}
                alt="Background"
                className="mt-4"
              />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Heading
            </label>
            <input
              type="text"
              value={formState?.heading || ""}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFormState({ ...formState, heading: e.target.value })
              }
            />
          </div>

          {/* <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Paragraph
            </label>
            <textarea
              value={formState?.info?.para || ""}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setFormState({ ...formState, para: e.target.value })
              }
            />
          </div>  */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Paragraph
            </label>

            {/* here is infoArray code start  */}
            <div className="info-list">
              {infoArray.length > 0 &&
                infoArray.map((item) => (
                  <div key={item._id} className="info-item mb-4">
                    {/* Input for editing the title */}
                    <input
                      type="text"
                      name="title"
                      value={item.title}
                      onChange={(e) => handleInputChange(e, item._id)}
                      className="font-semibold text-gray-800 border border-gray-300 p-2 rounded mb-2"
                    />
                    {/* Input for editing the description */}
                    <textarea
                      type="text"
                      name="description"
                      value={item.description}
                      onChange={(e) => handleInputChange(e, item._id)}
                      className="text-gray-600 border border-gray-300 p-2 rounded"
                    />
                  </div>
                ))}
            </div>
            {/* here is infoArray code end  */}
            <label className="block text-gray-700 font-medium mb-1">
              Features
            </label>
            <div className="info-list">
              {features.length > 0 &&
                features.map((item) => (
                  <div key={item._id} className="info-item mb-4">
                    {/* Input for editing the title */}
                    <input
                      type="text"
                      name="title"
                      value={item.title}
                      onChange={(e) => handleInputChangeFeatues(e, item._id)}
                      className="font-semibold text-gray-800 border border-gray-300 p-2 rounded mb-2"
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Images
            </label>
            {formState?.images && formState.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                {formState.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Skyace Image ${index + 1}`}
                      className="mb-4"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => handleRemoveImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleFileChange(e, "images")}
            />
          </div>
          {/* 
          {Array.isArray(infoArray) && infoArray.length > 0 ? (
            infoArray.map((info, index) => (
              <div key={index}>
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
            ))
          ) : (
            <p>No data available</p>
          )} */}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            {editingId ? "Update" : "Create"} Skyace Entry
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800">Existing Entries</h2>
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <div
                key={index}
                className="mt-4 border border-gray-300 p-4 rounded-lg"
              >
                <h3 className="text-lg font-bold text-gray-700">
                  {entry.title}
                </h3>
                <img
                  src={entry.bgimage}
                  alt="Entry Background"
                  className="mt-2"
                />

                <p className="mt-2">{entry.para}</p>

                {entry.images && entry.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {entry.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image}
                        alt={`Skyace Image ${imgIndex + 1}`}
                      />
                    ))}
                  </div>
                )}

                <div className="mt-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleEdit(entry)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(entry._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No entries found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skyace;
