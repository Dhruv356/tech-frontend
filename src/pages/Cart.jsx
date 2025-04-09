import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, decreaseQty, deleteProduct } from "../app/features/cart/cartSlice";
import { toast } from "react-toastify";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import "./cart.css";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calculate total price
  const totalPrice = cartList.reduce((price, item) => price + item.qty * item.price, 0);

  // Handle Checkout
  const handleCheckout = () => {
    if (cartList.length === 0) {
      toast.warning("Your cart is empty! Add products before checkout.");
      return;
    }
    navigate("/checkout", { state: { cartList, totalPrice } });
  };
// Calculate Tax (18% GST Example)
const taxRate = 0.18;
const taxAmount = totalPrice * taxRate;

// Shipping Charge (Free if order > ₹5000)
const shippingCharge = totalPrice > 5000 ? 0 : 100;

// Discount (Example: ₹200 off on orders above ₹3000)
const discount = totalPrice > 3000 ? 200 : 0;

// Calculate Final Total
const finalTotal = totalPrice + taxAmount + shippingCharge - discount;

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          
          {/* Cart Items Section */}
          <Col md={8}>
         
            {cartList.length === 0 ? (
              <h2 className="no-items">No Items in Cart</h2>
              
            ) : (
              
              cartList.map((item) => (
                <div className="cart-list" key={item.id}>
                  <Row className="align-items-center">
                    {/* Product Image */}
                    <Col className="image-holder" sm={4} md={3}>
                    
                    <img
                src={
                  item.imageUrl?.startsWith("/uploads")
                    ? `http://localhost:5000${item.imageUrl}`
                    : item.imgUrl || "https://via.placeholder.com/150"
                }
                alt={item.productName || item.name}
                width="100"
              />
                    </Col>

                    {/* Product Details */}
                    <Col sm={8} md={9}>
                      <Row className="cart-content">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            ₹&nbsp;{item.price}.00 × {item.qty}
                            <span>₹&nbsp;{item.price * item.qty}.00</span>
                          </h4>
                        </Col>

                        {/* Quantity Controls */}
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() => dispatch(addToCart({ product: item, num: 1 }))}
                            aria-label="Increase quantity"
                          >
                            <FaPlus />
                          </button>
                          <button
                            className="desCart"
                            onClick={() => dispatch(decreaseQty(item))}
                            aria-label="Decrease quantity"
                          >
                            <FaMinus />
                          </button>
                          <button
                            className="desCart"
                            onClick={() => dispatch(deleteProduct(item))}
                            aria-label="Remove item"
                          >
                            <FaTrash />
                          </button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
                
              ))
            )}
                    <button
            className="continue-shopping-btn"
            onClick={() => navigate("/shop")}>continue shopping</button>
          </Col>
      

          {/* Cart Summary Section */}
        {/* Cart Summary Section */}
<Col md={4}>
  <div className="cart-total">
    <h2>Cart Summary</h2>

    {/* Subtotal */}
    <div className="d_flex">
      <h4>Subtotal:</h4>
      <h3>₹&nbsp;{totalPrice.toFixed(2)}</h3>
    </div>

    {/* Shipping Charges (Dynamic) */}
    <div className="d_flex">
      <h4>Shipping:</h4>
      <h3>
        ₹&nbsp;
        {totalPrice > 5000 ? "FREE" : shippingCharge.toFixed(2)}
      </h3>
    </div>

    {/* Tax (18% GST/VAT Example) */}
    <div className="d_flex">
      <h4>Tax (18% GST):</h4>
      <h3>₹&nbsp;{taxAmount.toFixed(2)}</h3>
    </div>

    {/* Discount (If applicable) */}
    {discount > 0 && (
      <div className="d_flex">
        <h4>Discount:</h4>
        <h3>- ₹&nbsp;{discount.toFixed(2)}</h3>
      </div>
    )}

    {/* Final Total Amount */}
    <div className="d_flex total-amount">
      <h3>Final Total:</h3>
      <h2>₹&nbsp;{finalTotal.toFixed(2)}</h2>
    </div>

    <button className="check-out-btn" onClick={handleCheckout}>
      Check-Out
    </button>
  </div>
</Col>

        </Row>
      </Container>
    </section>
  );
};

export default Cart;
