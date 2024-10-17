import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Product() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        "https://infiniaback.onrender.com/product"
      ); // Fetch all products
      setProducts(response.data.data);
    } catch (error) {
      console.error(
        `Something went wrong while fetching products from backend: ${error}`
      );
      toast.error("Failed to fetch products");
    }
  };

  const handleUpdateProduct = (product) => {
    if (product) {
      navigate("/productedit", { state: { product } });
    } else {
      toast.error("Product transfer failed");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="ml-[350px] mt-[50px]" style={styles.container}>
      <h1 style={styles.header}>Product Title</h1>
      <div style={styles.productList}>
        {Array.isArray(products) &&
          products.map((item) => (
            <ul key={item._id} style={styles.productItem}>
              <li
                className="cursor-pointer"
                onClick={() => handleUpdateProduct(item)}
                style={styles.productTitle}
              >
                {item.title}
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  productList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  productItem: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  productTitle: {
    fontSize: "16px",
    fontWeight: "bold",
  },
};
