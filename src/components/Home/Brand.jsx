import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Brand() {
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    description: "",
    features: [{ name: "", descriptions: [""] }],
    images: [{ src: "" }],
  });

  const fetchBrandData = () => {
    axios
      .get("http://localhost:8080/brands")
      .then((res) => {
        setData(res.data.data[0]);
        console.log('Data',res.data.data[0]);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (index, key, value) => {
    const updatedFeatures = data.features.map((feature, i) =>
      i === index ? { ...feature, [key]: value } : feature
    );
    setData({ ...data, features: updatedFeatures });
  };

  const handleDescriptionChange = (featureIndex, descIndex, value) => {
    const updatedFeatures = data.features.map((feature, i) =>
      i === featureIndex
        ? {
            ...feature,
            descriptions: feature.descriptions.map((desc, j) =>
              j === descIndex ? value : desc
            ),
          }
        : feature
    );
    setData({ ...data, features: updatedFeatures });
  };

  const handleImageChange = async (index, file) => {
    const url = await uploadToCloudinary(file);
    if (url) {
      const updatedImages = data.images.map((image, i) =>
        i === index ? { ...image, src: url } : image
      );
      setData({ ...data, images: updatedImages });
    }
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

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8080/brands/update/${data._id}`, data)
      .then(() => {
        toast.success("Data updated successfully");
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.error(error.message);
      });
  };

  useEffect(() => {
    fetchBrandData();
  }, []);

  return (
    <>
      <div className="container mx-auto p-5">
        <h2 className="text-center text-2xl font-bold mb-5">Brand Section</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700">Title</label>
              <input
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                name="title"
                type="text"
                onChange={handleChange}
                value={data.title || ""}
              />
            </div>
            <div>
              <label className="block text-gray-700">Subtitle</label>
              <input
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                name="subtitle"
                type="text"
                onChange={handleChange}
                value={data.subtitle || ""}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              name="description"
              onChange={handleChange}
              value={data.description || ""}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Features</label>
            {data.features.map((feature, index) => (
              <div key={index} className="mb-4">
                <input
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md mb-2"
                  placeholder="Feature Name"
                  value={feature.name}
                  onChange={(e) =>
                    handleFeatureChange(index, "name", e.target.value)
                  }
                />
                {feature.descriptions.map((desc, descIndex) => (
                  <textarea
                    key={descIndex}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md mb-2"
                    placeholder="Feature Description"
                    value={desc}
                    onChange={(e) =>
                      handleDescriptionChange(index, descIndex, e.target.value)
                    }
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Images</label>
            {data.images.map((image, index) => (
              <div key={index} className="mb-4">
                {image.src && (
                  <img
                    className="h-20 w-30 mb-2 cursor-pointer rounded-md"
                    src={image.src}
                    alt={`img-${index}`}
                  />
                )}
                <input
                  type="file"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
