import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Product() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:8080/product");
      setProducts(response.data.data);
    } catch (error) {
      console.log(`Something went wrong ${error}`);
    }
  };

  const handleUpdateProduct = (product) => {
    if (product) {
      navigate("/productedit", { state: { product } });
    } else {
      toast.error(`Product transfer failed`);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="m-[200px]" style={styles.container}>
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
