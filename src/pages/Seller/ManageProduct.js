import React, { useState } from "react";
import axios from "axios";
import"./admin.css";

export const ManageProduct = () => {
  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [modelNumber, setModelNumber] = useState(""); // ✅ New Field
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState(""); // ✅ New Field
  const [size, setSize] = useState(""); // ✅ New Field

  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in. Please login first.");
    return;
  }

  // Decode JWT Token to Check Role (Debugging Purpose)
  const base64Payload = token.split(".")[1];
  const decodedPayload = JSON.parse(atob(base64Payload));

  console.log("Decoded Token Payload:", decodedPayload);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !price || !description || !category || !modelNumber || !color) {
      alert("Please fill in all required fields.");
      return;
    }

    const productData = new FormData();
    productData.append("productName", productName);
    productData.append("modelNumber", modelNumber); // ✅ Added
    productData.append("description", description);
    productData.append("price", price);
    productData.append("category", category);
    productData.append("color", color); // ✅ Added
    productData.append("size", size); // ✅ Added (Optional)
    if (file) {
      productData.append("file", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Product added successfully:", response.data);
      alert("Product added successfully!");

      setProductName("");
      setModelNumber("");
      setDescription("");
      setPrice("");
      setCategory("");
      setColor("");
      setSize("");
      setFile(null);
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert(`Failed to add product: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  return (
    <div className="add-product">
      <div className="form-container">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label>Product Name:</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>

          {/* ✅ New Field for Model Number */}
          <div className="form-group">
            <label>Model Number:</label>
            <input
              type="text"
              value={modelNumber}
              onChange={(e) => setModelNumber(e.target.value)}
              placeholder="Enter model number"
              required
            />
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter brief description"
              required
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              <option value="mobile">Mobile</option>
              <option value="laptop">Laptop</option>
              <option value="VR-Headset">VR Headset</option>
              <option value="watch">Watch</option>
              <option value="wireless">Wireless</option>
            </select>
          </div>

          {/* ✅ New Field for Color */}
          <div className="form-group">
            <label>Color:</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Enter color"
              required
            />
          </div>

          {/* ✅ New Field for Size */}
          <div className="form-group">
            <label>Size:</label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="Enter size (Optional)"
            />
          </div>

          <button type="submit" className="addproduct-button">Add Product</button>
        </form>
      </div>
    </div>
  );
};
