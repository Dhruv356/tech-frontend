import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaStar, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../app/features/cart/cartSlice";
import axios from "axios";
import "./product-details.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);

  // ✅ Fetch product details when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        const data = response.data;

        setProduct(data.product);
        setRelatedProducts(data.relatedProducts || []);

        // ✅ Set selected color dynamically
        setSelectedColor(data.product?.color || (data.relatedProducts[0]?.color || "Unknown"));
      } catch (err) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Handle thumbnail cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveThumbnailIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Add product to cart
  const handleAdd = (productItem) => {
    if (!productItem) {
      toast.error("Product details are missing!");
      return;
    }
  
    dispatch(addToCart({ product: productItem, num: quantity })); // Using selected quantity
    toast.success(`${productItem.productName} has been added to cart!`);
  };
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
  
    // ✅ Ensure value is a number and at least 1
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };
  
  if (loading) return <h2 className="loading">Loading...</h2>;
  if (error) return <h2 className="error">{error}</h2>;
  if (!product) return <h2 className="not-found">Product not found!</h2>;
  const getImageUrl = (url) => {
    return  product?.imageUrl?.startsWith("/uploads")
    ? `http://localhost:5000${product.imageUrl}`
    : product?.imgUrl || "/fallback-image.jpg"
  };
  return (
    <Container className="product-page">
      <Row className="product-wrapper">
        <Col md={6} className="image-section">
          <img
            loading="lazy"
            src={
              product?.imageUrl?.startsWith("/uploads")
                ? `http://localhost:5000${product.imageUrl}`
                : product?.imgUrl || "/fallback-image.jpg"
            }
            alt={product?.productName || "Product Image"}
            className="main-image"
          />

          <div className="thumbnail-container">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                className={`thumbnail ${i === activeThumbnailIndex ? "active" : ""}`}
                src={
                  product.imageUrl?.startsWith("/uploads")
                    ? `http://localhost:5000${product.imageUrl}`
                    : product.imgUrl || "/fallback-image.jpg"
                }
                alt={`Thumbnail ${i}`}
              />
            ))}
          </div>
        </Col>

        {/* Product Details Section */}
        <Col md={6} className="details-section">
          <h2 className="product-title">{product.productName}</h2>

          <div className="rate">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} color="#ffcd4e" size={16} />
            ))}
            <span>{product.avgRating || "No Ratings"}</span>
          </div>

          <div className="info">
            <span className="discounted-price">₹{product.price}</span>
          </div>

          <p className="description">{product.description}</p>

          {/* ✅ Color Selection */}
          {relatedProducts.length > 0 && (
            <div className="color-card">
              <h4 className="color-title">
                Colour: <b>{selectedColor}</b>
              </h4>

              <div className="color-options">
                {relatedProducts.map((variant) => (
                  <div
                    key={variant._id}
                    className={`color-option ${selectedColor === variant.color ? "selected" : ""}`}
                    onClick={() => navigate(`/product/${variant._id}`)}
                  >
                    {/* Product Image */}
                    <img
                      className="color-image"
                      src={
                        variant.imageUrl?.startsWith("/uploads")
                          ? `http://localhost:5000${variant.imageUrl}`
                          : variant.imgUrl || "/fallback.jpg"
                      }
                      alt={variant.productName}
                    />

                    {/* Product Price */}
                    <p className="product-price">₹{variant.price}</p>

                    {/* Strike-through Original Price (if available) */}
                    {variant.originalPrice && <p className="original-price">₹{variant.originalPrice}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="quantity-controls">
  <button className="qty-btn" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
    <FaMinus />
  </button>

  <input
    className="qty-input"
    type="number"
    value={quantity}
    min="1"
    onChange={handleQuantityChange} // ✅ Allow manual input
  />

  <button className="qty-btn" onClick={() => setQuantity((prev) => prev + 1)}>
    <FaPlus />
  </button>
</div>

          {/* Buttons */}
          <div className="button-group">
          <button className="add-to-cart" onClick={() => handleAdd(product)}>
  <FaShoppingCart /> Add To Cart
</button>

<button
              className="buy-now"
              onClick={() => navigate("/checkout", { 
                state: { 
                  orderItems: [{ 
                    productId: product._id, 
                    qty: quantity, 
                    name: product.productName, 
                    price: product.price,
                    imageUrl: getImageUrl(product?.imageUrl)
                  }] 
                } 
              })}
            >
              Buy Now
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
