import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { useState } from "react";

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const handleClick = () => {
    const productId = productItem?._id || productItem?.id; // Use _id for dynamic, id for static
    if (productId) {
      router(`/shop/${productId}`);
    } else {
      console.error("Product ID is missing!");
    }
  };
  
  const handleAdd = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };

  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
   
  };

  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
      {title === "Big Discount" ? (
        <span className="discount">{productItem.discount}% Off</span>
      ) : null}
      <div >
      <img
        loading="lazy"
        onClick={handleClick}
        src={
          productItem.imageUrl?.startsWith("/uploads")
            ? `http://localhost:5000${productItem.imageUrl}`
            : productItem.imgUrl || "fallback-image.jpg"
        }
        alt={productItem.productName}
        onError={(e) => {
          console.error("Image failed to load:", e.target.src);
          e.target.src = "fallback-image.jpg";
        }}
      />
      </div>
      <div className="product-like" onClick={handleLike}>
        <ion-icon name={liked ? "heart" : "heart-outline"}></ion-icon>
      </div>
      <div className="product-details">
        <h3 onClick={handleClick}>{productItem.productName}</h3>
        <div className="rate">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>
        <div className="price">
          <h4>{productItem.price}₹</h4>
          <button
            aria-label="Add"
            type="button"
            className="add"
            onClick={() => handleAdd(productItem)}
          >
            <ion-icon name="cart"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
