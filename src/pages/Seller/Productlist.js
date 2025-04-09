import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./productlist.css";
import "./productlist.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  const fetchSellerProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/products/my-products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      alert("Failed to load products");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      alert("Failed to delete product.");
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };
  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
  
      await axios.put(
        `http://localhost:5000/api/products/${currentProduct._id}`,
        {
          productName: currentProduct.productName,
          price: currentProduct.price,
          category: currentProduct.category,
          description: currentProduct.description,
          modelNumber: currentProduct.modelNumber,
          color: currentProduct.color,
          size: currentProduct.size || "N/A",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      alert("Product updated successfully!");
      setShowEditModal(false);
      fetchSellerProducts(); // Refresh product list
    } catch (error) {
      alert("Failed to update product.");
      console.error("Product update error:", error.response?.data || error.message);
    }
  };
  

  const handleViewDetails = (product) => {
    setCurrentProduct(product);
    setShowDetailsModal(true);
  };

  return (
    
    <div className="product-list-container">
  <h1>Product List</h1>
  {products.length === 0 ? (
    <p className="no-products">No products found.</p>
  ) : (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={`http://localhost:5000${product.imageUrl}`}
                  alt={product.productName}
                  className="product-img"
                  width="50"
                />
              </td>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>
                <div className="button-container">
                  <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
                  <button className="details-btn" onClick={() => handleViewDetails(product)}>Details</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}


      {/* ✅ View Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <>
              <img
                src={`http://localhost:5000${currentProduct.imageUrl}`}
                alt={currentProduct.productName}
                className="modal-product-img"
              />
              <h4>{currentProduct.productName}</h4>
              <p><strong>Category:</strong> {currentProduct.category}</p>
              <p><strong>Price:</strong> ₹{currentProduct.price}</p>
              <p><strong>Description:</strong> {currentProduct.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ✅ Edit Modal */}
    {/* ✅ Edit Product Modal (Without Image, All Fields Included) */}
<Modal show={showEditModal} onHide={() => setShowEditModal(false)} className="edit-modal">
  <Modal.Header closeButton>
    <Modal.Title>Edit Product</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {currentProduct && (
      <>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={currentProduct.productName}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, productName: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={currentProduct.price}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, price: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={currentProduct.category}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, category: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={currentProduct.description}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, description: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Model Number</Form.Label>
          <Form.Control
            type="text"
            value={currentProduct.modelNumber}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, modelNumber: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            value={currentProduct.color}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, color: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Size</Form.Label>
          <Form.Control
            type="text"
            value={currentProduct.size}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, size: e.target.value })
            }
          />
        </Form.Group>
      </>
    )}
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
      Close
    </Button>
    <Button variant="primary" onClick={handleSaveEdit}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  );
};

export default ProductList;
