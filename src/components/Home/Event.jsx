import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Event() {
  const [event, setEvent] = useState({
    title: "",
    events: [
      {
        description: "",
        image: "",
        date: "",
      },
    ],
  });

  const baseUrl = "http://localhost:8080";

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("events[0].")) {
      const key = name.slice(9);
      setEvent((prevEvent) => ({
        ...prevEvent,
        events: [
          {
            ...prevEvent.events[0],
            [key]: value,
          },
        ],
      }));
    } else {
      setEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
      }));
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      if (url) {
        setEvent((prevEvent) => ({
          ...prevEvent,
          events: [
            {
              ...prevEvent.events[0],
              image: url,
            },
          ],
        }));
      }
    }
  };

  const fetchEvent = async () => {
    try {
      const response = await axios.get(baseUrl + "/events");
      setEvent(response.data.data[0]);
      console.log("Event ", response.data.data);
    } catch (error) {
      console.error("Error fetching event: ", error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const handleUpdate = async () => {
    if (!event) {
      toast.error("Event not found");
      return;
    } else {
      try {
        console.log("Updated data ", event.image);
        const response = await axios.patch(
          `${baseUrl}/events/update/${event._id}`,
          event
        );
        toast.success("Data Updated Successfully");
      } catch (error) {
        toast.error("Something went wrong");
        console.error(`Error occurred while updating data: ${error}`);
      }
    }
  };

  return (
    <div className="w-[1300px] border-2 mb-5">
      <h2 className="text-center p-3">EVENT SECTION</h2>
      <table className="table table-zebra w-full">
        <thead className="bg-gray-800 text-white w-full">
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="w-[20%]">
              <input
                className="p-2 border-2 border-gray-700 w-full resize"
                name="title"
                type="text"
                value={event.title}
                onChange={handleEventChange}
              />
            </td>
            <td className="w-[20%]">
              <img src={event.events[0].image} className="h-12" />
              <a href={event.events[0].image}>View</a>
              <input
                className="p-2 border-2 border-gray-700 w-full resize"
                name="image"
                type="file"
                onChange={handleFileChange}
              />
            </td>
            <td className="w-[20%]">
              <textarea
                className="p-2 border-2 border-gray-700 w-full resize"
                name="events[0].description"
                type="text"
                value={event.events[0].description}
                onChange={handleEventChange}
              />
            </td>
            <td className="w-[20%]">
              <input
                className="p-2 border-2 border-gray-700 w-full resize"
                name="events[0].date"
                type="date"
                value={event.events[0].date}
                onChange={handleEventChange}
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
