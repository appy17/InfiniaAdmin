import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Ecomagix() {
  const [ecomagix, setEcomagix] = useState([]);
  const baseUrl = "http://localhost:8080";

  // Handle changes in the form inputs
  const handleEcomagixChange = (e, id) => {
    const { name, value, dataset } = e.target;
    setEcomagix((prevEcomagix) =>
      prevEcomagix.map((item) =>
        item._id === id
          ? {
              ...item,
              [name]:
                name === "points"
                  ? item[name].map((point, index) =>
                      index === parseInt(dataset.index) ? value : point
                    )
                  : value,
            }
          : item
      )
    );
  };

  // Handle changes for image description
  const handleImageDescriptionChange = (e, id, index) => {
    const { value } = e.target;
    setEcomagix((prevEcomagix) =>
      prevEcomagix.map((item) =>
        item._id === id
          ? {
              ...item,
              images: item.images.map((image, imgIndex) =>
                imgIndex === index ? { ...image, description: value } : image
              ),
            }
          : item
      )
    );
  };

  // Upload file to Cloudinary
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
      console.error("Error uploading to Cloudinary: ", error);
      toast.error("Error uploading file");
      return null;
    }
  };

  // Handle file input change
  const handleFileChange = async (e, id, index) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      if (url) {
        setEcomagix((prevEcomagix) =>
          prevEcomagix.map((item) =>
            item._id === id
              ? {
                  ...item,
                  images: item.images.map((image, imgIndex) =>
                    imgIndex === index ? { ...image, url } : image
                  ),
                }
              : item
          )
        );
      }
    }
  };

  // Fetch ecomagix data
  const fetchEcomagix = async () => {
    try {
      const response = await axios.get(`${baseUrl}/ecomagix`);
      const data = response.data.data.map((item) => ({
        ...item,
        images: item.images.map((image) => ({ url: image, description: "" })),
      }));
      console.log('Data ', data);
      setEcomagix(data);
    } catch (error) {
      console.error("Error fetching ecomagix: ", error);
    }
  };

  useEffect(() => {
    fetchEcomagix();
  }, []);

  // Handle update action
  const handleUpdate = async (id) => {
    const itemToUpdate = ecomagix.find((item) => item._id === id);
    if (!itemToUpdate) {
      toast.error("Ecomagix not found");
      return;
    }
    console.log("Delivery data ", itemToUpdate);
    try {
      await axios.patch(`${baseUrl}/ecomagix/update/${id}`, itemToUpdate);
      toast.success("Data Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(`Error occurred while updating data: ${error}`);
    }
  };

  return (
    <div className="border-2 m-[100px]">
      <h2 className="text-center p-3">ECOMAGIX SECTION</h2>
      <table className="table table-zebra w-[1200px]">
        <thead className="bg-gray-800 text-white w-full">
          <tr>
            <th>NAME</th>
            <th>IMAGES</th>
            <th>POINTS</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ecomagix.map((item) => (
            <tr key={item._id}>
              <td className="w-[20%]">
                <input
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="name"
                  type="text"
                  value={item.name}
                  onChange={(e) => handleEcomagixChange(e, item._id)}
                />
              </td>

              <td className="w-[20%]">
                {item.images.map((image, index) => (
                  <div key={index} className="mt-2">
                    <input
                      className="p-2 border-2 border-gray-700 w-full resize mb-1"
                      type="file"
                      onChange={(e) => handleFileChange(e, item._id, index)}
                    />
                    <a
                      href={image.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Image
                    </a>
                    <img
                      src={image.url}
                      alt={`Uploaded ${index}`}
                      className="mt-2"
                      style={{ width: "100px", height: "100px" }}
                    />
                  
                  </div>
                ))}
              </td>

              <td className="w-[20%]">
                {item.points.map((point, index) => (
                  <input
                    key={index}
                    className="p-2 border-2 border-gray-700 w-full resize mb-1"
                    name="points"
                    data-index={index}
                    value={point}
                    onChange={(e) => handleEcomagixChange(e, item._id)}
                  />
                ))}
              </td>

              <td>
                <button
                  className="btn btn-success text-white btn-sm items-center"
                  onClick={() => handleUpdate(item._id)}
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
