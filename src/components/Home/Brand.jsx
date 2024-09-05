// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";

// export default function Brand() {
//   const [data, setData] = useState([
//     {
//       title: "",
//       subtitle: "",
//       description: "",
//       features: [{ name: "", descriptions: [""] }],
//       images: [{ src: "" }],
//     },
//   ]);

//   const fetchBrandData = () => {
//     axios
//       .get("http://localhost:8080/brands")
//       .then((res) => {
//         setData(res.data.data); // Assuming res.data.data is an array of objects
//         console.log("Data", res.data.data);
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   };

//   const handleChange = (index, e) => {
//     const { name, value } = e.target;
//     setData((prevData) =>
//       prevData.map((item, i) =>
//         i === index ? { ...item, [name]: value } : item
//       )
//     );
//   };

//   const handleFeatureChange = (dataIndex, featureIndex, key, value) => {
//     const updatedData = data.map((item, i) =>
//       i === dataIndex
//         ? {
//             ...item,
//             features: item.features.map((feature, j) =>
//               j === featureIndex ? { ...feature, [key]: value } : feature
//             ),
//           }
//         : item
//     );
//     setData(updatedData);
//   };

//   const handleDescriptionChange = (
//     dataIndex,
//     featureIndex,
//     descIndex,
//     value
//   ) => {
//     const updatedData = data.map((item, i) =>
//       i === dataIndex
//         ? {
//             ...item,
//             features: item.features.map((feature, j) =>
//               j === featureIndex
//                 ? {
//                     ...feature,
//                     descriptions: feature.descriptions.map((desc, k) =>
//                       k === descIndex ? value : desc
//                     ),
//                   }
//                 : feature
//             ),
//           }
//         : item
//     );
//     setData(updatedData);
//   };

//   const handleImageChange = async (dataIndex, imageIndex, file) => {
//     const url = await uploadToCloudinary(file);
//     if (url) {
//       const updatedData = data.map((item, i) =>
//         i === dataIndex
//           ? {
//               ...item,
//               images: item.images.map((image, j) =>
//                 j === imageIndex ? { ...image, src: url } : image
//               ),
//             }
//           : item
//       );
//       setData(updatedData);
//     }
//   };

//   const uploadToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "myCloud");
//     formData.append("cloud_name", "dnevtbn0x");

//     try {
//       const response = await axios.post(
//         "https://api.cloudinary.com/v1_1/dnevtbn0x/image/upload",
//         formData
//       );
//       return response.data.secure_url;
//     } catch (error) {
//       console.error("Error uploading to Cloudinary: ", error);
//       toast.error("Error uploading file");
//       return null;
//     }
//   };

//   const handleUpdate = (index) => {
//     axios
//       .put(
//         `http://localhost:8080/brands/update/${data[index]._id}`,
//         data[index]
//       )
//       .then(() => {
//         toast.success("Data updated successfully");
//       })
//       .catch((error) => {
//         toast.error("Something went wrong");
//         console.error(error.message);
//       });
//   };

//   useEffect(() => {
//     fetchBrandData();
//   }, []);

//   return (
//     <>
//       <div className="container mx-auto p-5">
//         <h2 className="text-center text-2xl font-bold mb-5">Brand Section</h2>
//         {data.map((item, dataIndex) => (
//           <div
//             key={dataIndex}
//             className="bg-white shadow-md rounded-lg p-6 mb-6"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label className="block text-gray-700">Title</label>
//                 <input
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                   name="title"
//                   type="text"
//                   onChange={(e) => handleChange(dataIndex, e)}
//                   value={item.title || ""}
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Subtitle</label>
//                 <input
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                   name="subtitle"
//                   type="text"
//                   onChange={(e) => handleChange(dataIndex, e)}
//                   value={item.subtitle || ""}
//                 />
//               </div>
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700">Description</label>
//               <textarea
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 name="description"
//                 onChange={(e) => handleChange(dataIndex, e)}
//                 value={item.description || ""}
//               />
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700">Features</label>
//               {item.features.map((feature, featureIndex) => (
//                 <div key={featureIndex} className="mb-4">
//                   <input
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md mb-2"
//                     placeholder="Feature Name"
//                     value={feature.name}
//                     onChange={(e) =>
//                       handleFeatureChange(
//                         dataIndex,
//                         featureIndex,
//                         "name",
//                         e.target.value
//                       )
//                     }
//                   />
//                   {feature.descriptions.map((desc, descIndex) => (
//                     <textarea
//                       key={descIndex}
//                       className="mt-1 block w-full p-2 border border-gray-300 rounded-md mb-2"
//                       placeholder="Feature Description"
//                       value={desc}
//                       onChange={(e) =>
//                         handleDescriptionChange(
//                           dataIndex,
//                           featureIndex,
//                           descIndex,
//                           e.target.value
//                         )
//                       }
//                     />
//                   ))}
//                 </div>
//               ))}
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-700">Images</label>
//               {item.images.map((image, imageIndex) => (
//                 <div key={imageIndex} className="mb-4">
//                   {image.src && (
//                     <img
//                       className="h-20 w-30 mb-2 cursor-pointer rounded-md"
//                       src={image.src}
//                       alt={`img-${imageIndex}`}
//                     />
//                   )}
//                   <input
//                     type="file"
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                     onChange={(e) =>
//                       handleImageChange(
//                         dataIndex,
//                         imageIndex,
//                         e.target.files[0]
//                       )
//                     }
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="text-center">
//               <button
//                 className="bg-blue-500 text-white p-2 rounded-md"
//                 onClick={() => handleUpdate(dataIndex)}
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <Toaster />
//     </>
//   );
// }
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Brand() {

  const navigate=useNavigate()

  const handleEcomagix = () => {
    navigate('/ecomagix')
  }
  const handleClaymagix = () => {
    alert('hi')
    navigate('/claymagix')
  }

  return (
    <div className="flex justify-center items-center mt-[-100px] ml-[250px] min-h-screen">
      <div className="flex gap-10 justify-center items-center">
        <div className="max-w-32 bg-transparent items-center justify-center flex border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
          <button onClick={handleEcomagix} className="px-5 py-2">
            Ecomagix
          </button>
        </div>
        <div className="max-w-32 bg-transparent items-center justify-center flex border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
          <button onClick={handleClaymagix} className="px-5 py-2">
            Claymagix
          </button>
        </div>
        <div className="max-w-32 bg-transparent items-center justify-center flex border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
          <button className="px-5 py-2">Woodmagix</button>
        </div>
        <div className="max-w-32 bg-transparent items-center justify-center flex border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
          <button className="px-5 py-2">Skyace</button>
        </div>
      </div>
    </div>
  );
}
