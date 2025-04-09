import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; //Import useNavigate
import axios from "axios";
import Slider from "react-slick"; //  Import react-slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

import SliderHome from "../components/Slider";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Home = () => {
  const navigate = useNavigate(); //  Initialize navigate function

  const [newProducts, setNewProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useWindowScrollToTop();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        const allProducts = Array.isArray(response.data) ? response.data : []; //  Ensure it's an array

        console.log("Fetched Products:", allProducts); // Debugging

        //  Sort by newest
        const sortedProducts = [...allProducts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNewProducts(sortedProducts.slice(0, 6)); // Show latest 6 products

        // Get 6 Random Products
        setRandomProducts(getRandomProducts(allProducts, 6));
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  //  Function to Get Random Products
  const getRandomProducts = (products, count) => {
    return [...products].sort(() => 0.5 - Math.random()).slice(0, count);
  };

  //  Slick Slider Settings
  const sliderSettings = {
    dots: true,  // Show navigation dots
    infinite: true,  // Enable infinite loop
    speed: 800,  // Smooth transition speed
    slidesToShow: 4,  // Show 3 slides at a time
    slidesToScroll: 3,  
    autoplay: true,  // Enable autoplay
    autoplaySpeed: 3000,  // Smooth autoplay speed
    pauseOnHover: true,  // Pause when hovered
    swipeToSlide: true,  // Enable swipe gestures
    cssEase: "cubic-bezier(0.25, 1, 0.5, 1)", // Smooth easing animation
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Fragment>
      <SliderHome />
      <Wrapper />

      {/*  Loading & Error Messages */}
      {loading && <h2 className="loading-text">Loading products...</h2>}
      {error && <h2 className="error-text">{error}</h2>}

      {!loading && !error && (
        <>
          {/* Featured Picks Slider (Now More Realistic) */}
          <section className="featured-picks">
            <h2 className="section-title">✨ Featured Picks</h2>
            <Slider {...sliderSettings}>
              {(randomProducts || []).map((product) => (
                <div 
                  key={product._id} 
                  className="product-slide" 
                  onClick={() => navigate(`/product/${product._id}`)} //  Navigate on Click
                  style={{ cursor: "pointer" }} //  Indicate it's clickable
                >
                  <img 
                    src={product.imageUrl ? `http://localhost:5000${product.imageUrl}` : "/default-image.jpg"} 
                    alt={product.productName || "Product"} 
                    className="product-image" 
                  />
                  <h3>{product.productName || "Unknown Product"}</h3>
                  <p>₹{product.price ?? "N/A"}</p>
                </div>
              ))}
            </Slider>
          </section>

          {/* Video Banner */}
          <section className="video-banner">
            <video autoPlay loop muted playsInline>
              <source src="/videoplayback3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </section>

          {/*  Latest Products */}
          <Section title="🆕 New Arrivals" bgColor="white" productItems={newProducts || []} />
        </>
      )}
    </Fragment>
  );
};

export default Home;
