import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Carousal() {
  const [images, setImages] = useState([]);
  const [newFile, setNewFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [addImage, setAddImage] = useState(false);

  // const baseUrl = "https://infinia-kappa.vercel.app";
  const baseUrl = "http://localhost:8080";

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${baseUrl}/carousal`);
      console.log("Fetched images:", response.data.data);
      setImages(response.data.data);
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error fetching images:", error);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "myCloud");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnevtbn0x/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      toast.error("Error uploading file");
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };

  const handleAddImage = async () => {
    if (newFile) {
      const imageUrl = await uploadToCloudinary(newFile);
      if (imageUrl) {
        try {
          await axios.post(`${baseUrl}/carousal/create`, { imgSrc: imageUrl });
          toast.success("Image added successfully");
          fetchImages(); // Refresh images after addition
        } catch (error) {
          toast.error("Error adding image");
          console.error("Error adding image:", error);
        }
      }
    } else {
      toast.error("No file selected");
    }
  };

  const handleUpdate = async (id) => {
    if (newFile) {
      const imageUrl = await uploadToCloudinary(newFile);
      if (imageUrl) {
        try {
          await axios.patch(`${baseUrl}/carousal/update/${id}`, { imageUrl });
          toast.success("Image updated successfully");
          fetchImages(); // Refresh images after update
        } catch (error) {
          toast.error("Error updating image");
          console.error("Error updating image:", error);
        }
      }
    } else {
      toast.error("No file selected");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/carousal/delete/${id}`);
      toast.success("Image deleted successfully");
      fetchImages();
    } catch (error) {
      toast.error("Error deleting image");
      console.error("Error deleting image:", error);
    }
  };

  const handleView = (image) => {
    setSelectedImage(image);
    console.log("Details ", image);
  };

  const handleImageAddition = () => {
    setAddImage(true);
  };

  return (
    <div className="w-full border-2 mb-5">
      <h2 className="text-center p-3">Image Slider</h2>
      <div className="px-11" title="Add an Image">
        <button
          onClick={handleImageAddition}
          className="bg-gray-600 text-white w-[70px] h-[40px] hover:bg-blue-600 hover:text-white rounded-sm"
        >
          Add
        </button>
        {addImage && (
          <div>
            <input
              type="file"
              onChange={(e) => setNewFile(e.target.files[0])}
            />
            <button
              onClick={handleAddImage}
              className="bg-green-600 text-white w-[70px] h-[40px] hover:bg-blue-600 hover:text-white rounded-sm"
            >
              Save
            </button>
          </div>
        )}
      </div>
      <table className="table table-zebra w-full">
        <tbody>
          {images.map((item) => (
            <div className="flex justify-around" key={item._id}>
              <td>
                <a
                  href={item?.imgSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </td>
              <div>
                <td>
                  <input
                    type="file"
                    onChange={(e) => setNewFile(e.target.files[0])}
                  />
                  <button
                    className="btn btn-success text-white btn-sm"
                    onClick={() => handleUpdate(item._id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </div>
            </div>
          ))}
        </tbody>
      </table>

      {selectedImage && (
        <div className="modal">
          <span className="close" onClick={() => setSelectedImage(null)}>
            &times;
          </span>
          <a
            href={selectedImage.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={selectedImage.imageUrl} alt="Selected" />
          </a>
        </div>
      )}
    </div>
  );
}
