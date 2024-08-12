import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Event() {
  const [events, setEvents] = useState([]);
  const baseUrl = "http://localhost:8080";

  const handleEventChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "date" || name === "image" || name === "description") {
      handleNestedEvent(e, index);
    } else {
      setEvents((prevEvents) =>
        prevEvents.map((event, i) =>
          i === index
            ? {
                ...event,
                [name]: value,
              }
            : event
        )
      );
    }
  };

  const handleNestedEvent = (e, index) => {
    const { name, value } = e.target;
    setEvents((prevEvents) =>
      prevEvents.map((event, i) =>
        i === index
          ? {
              ...event,
              events: {
                ...event.events[0],
                [name]: value,
              },
            }
          : event
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

  const handleFileChange = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      if (url) {
        setEvents((prevEvents) =>
          prevEvents.map((event, i) =>
            i === index
              ? {
                  ...event,
                  events: {
                    ...event.events,
                    image: url,
                  },
                }
              : event
          )
        );
      }
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(baseUrl + "/events");
      setEvents(response.data.data);
      console.log("Events ", response.data.data[0].events[0].Date);
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleUpdate = async (index) => {
    if (!events[index]) {
      toast.error("Event not found");
      return;
    } else {
      try {
        const response = await axios.patch(
          `${baseUrl}/events/update/${events[index]._id}`,
          events[index]
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
          {events.map((event, index) => (
            <tr key={index}>
              <td className="w-[20%]">
                <input
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="title"
                  type="text"
                  value={event.title}
                  onChange={(e) => handleEventChange(e, index)}
                />
              </td>
              <td className="w-[20%]">
                <img src={event.events?.image} alt="Event" />
                <a href={event.events[0]?.image}>View</a>
                <input
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="image"
                  type="file"
                  onChange={(e) => handleFileChange(e, index)}
                />
              </td>
              <td className="w-[20%]">
                <textarea
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="description"
                  type="text"
                  value={event.events[0]?.description}
                  onChange={(e) => handleNestedEvent(e, index)}
                />
              </td>
              <td className="w-[20%]">
                <input
                  className="p-2 border-2 border-gray-700 w-full resize"
                  name="Date"
                  type="date"
                  value={new Date(event.events[0]?.Date).toLocaleDateString(
                    "en-GB"
                  )}
                  // onClick={() => handleconsole(value)}
                  onChange={(e) => handleNestedEvent(e, index)}
                />
              </td>
              <td>
                <button
                  className="btn btn-success text-white btn-sm items-center"
                  onClick={() => handleUpdate(index)}
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
