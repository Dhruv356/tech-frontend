import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./manageproduct.css";

const Manageproducts = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      alert("Failed to load products.");
    }
  };

  // ✅ Delete Product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Product deleted successfully!");
        fetchProducts(); // Refresh product list
      } catch (error) {
        alert("Failed to delete product.");
      }
    }
  };

  // ✅ Open Edit Modal
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };

  // ✅ Save Edited Product
  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/products/${currentProduct._id}`,
        {
          productName: currentProduct.productName,
          price: currentProduct.price,
          category: currentProduct.category,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Product updated successfully!");
      setShowEditModal(false);
      fetchProducts(); // Refresh the list
    } catch (error) {
      alert("Failed to update product.");
    }
  };

  return (
    <div className="manage-products-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="page-title"
      >
        🛍 Manage Products
      </motion.h1>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* <button className="add-product-btn">➕ Add New Product</button> */}

      <div className="admin_table-container">
  <table className="product-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Image</th>
        <th>Product Name</th>
        <th>Price</th>
        <th>Category</th>
        <th>Seller</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product, index) => (
        <tr key={product._id}>
          <td>{index + 1}</td>
          <td>
            {product.imageUrl ? (
              <img
                src={`http://localhost:5000${product.imageUrl}`}
                alt={product.productName}
                className="product-image"
              />
            ) : (
              "No Image"
            )}
          </td>
          <td>{product.productName}</td>
          <td>₹{product.price}</td>
          <td>{product.category}</td>
          <td>
            {product.sellerId ? (
              <>
                <strong>{product.sellerId.name}</strong> <br />
                <small>{product.sellerId.email}</small>
              </>
            ) : (
              "Unknown Seller"
            )}
          </td>
          <td className="actions">
            <button className="edit-btn" onClick={() => handleEdit(product)}>✏️ Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(product._id)}>🗑 Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


     {/* 📝 Edit Product Modal */}
{showEditModal && (
  <div className="modal">
    <div className="modal-content-admin">
      <h2>Edit Product</h2>

      {/* Product Name */}
      <input
        type="text"
        value={currentProduct.productName}
        onChange={(e) => setCurrentProduct({ ...currentProduct, productName: e.target.value })}
        className="form-control"
        placeholder="Product Name"
      />

      {/* Description */}
      <textarea
        value={currentProduct.description}
        onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
        className="form-control"
        placeholder="Product Description"
      ></textarea>

      {/* Price */}
      <input
        type="number"
        value={currentProduct.price}
        onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
        className="form-control"
        placeholder="Price"
      />

      {/* Stock */}
      <input
        type="number"
        value={currentProduct.stock}
        onChange={(e) => setCurrentProduct({ ...currentProduct, stock: e.target.value })}
        className="form-control"
        placeholder="Stock Quantity"
      />

      {/* Discount */}
      <input
        type="number"
        value={currentProduct.discount}
        onChange={(e) => setCurrentProduct({ ...currentProduct, discount: e.target.value })}
        className="form-control"
        placeholder="Discount (%)"
      />

      {/* Category */}
      <input
        type="text"
        value={currentProduct.category}
        onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
        className="form-control"
        placeholder="Category"
      />

      {/* Color */}
      <input
        type="text"
        value={currentProduct.color}
        onChange={(e) => setCurrentProduct({ ...currentProduct, color: e.target.value })}
        className="form-control"
        placeholder="Color"
      />

      {/* Size */}
      <input
        type="text"
        value={currentProduct.size}
        onChange={(e) => setCurrentProduct({ ...currentProduct, size: e.target.value })}
        className="form-control"
        placeholder="Size (if applicable)"
      />

      {/* Save and Cancel Buttons */}
      <button className="edit-btn" onClick={handleSaveEdit}>Save</button>
      <button className="delete-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
    </div>
  </div>
)}

    </div>
  );
};

export default Manageproducts;
