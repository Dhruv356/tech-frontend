import React, { useState } from "react";
import axios from "axios";
import "./addproduct.css";
const AddProduct = () => {
  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !price || !description || !category) {
      alert("Please fill in all fields.");
      return;
    }

    const productData = new FormData();
    productData.append("productName", productName);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("category", category);
    if (file) {
      productData.append("file", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/add-product",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Product added successfully:", response.data);
      alert("Product added successfully!");

      setProductName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setFile(null);
    } catch (error) {
      console.error("❌ Error adding product:", error.response?.data || error.message);
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
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
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
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select category</option>
              <option value="mobile">Mobile</option>
              <option value="laptop">Laptop</option>
              <option value="VR-Headset">VR Headset</option>
              <option value="watch">Watch</option>
              <option value="wireless">Wireless</option>
            </select>
          </div>

          <button type="submit" className="addproduct-button">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
