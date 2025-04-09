import { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./slidercard.css";

gsap.registerPlugin(ScrollTrigger);

const SlideCard = ({ title, desc, cover }) => {
  const navigate = useNavigate();

  // ✅ Refs for Animation Targets
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    // ✅ Animate SlideCard Container (Fade-in & Slight Scale)
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%", // Trigger earlier
          toggleActions: "play none none none",
        },
      }
    );

    // ✅ Animate Text Content (Slide-up & Fade-in)
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 95%", // Trigger earlier
          toggleActions: "play none none none",
        },
      }
    );

    // ✅ Animate Image (Subtle Scale-in)
    gsap.fromTo(
      imgRef.current,
      { opacity: 0, scale: 1.1 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      }
    );

    // ✅ Animate Button (Bounce Effect)
    gsap.fromTo(
      btnRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: btnRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <Container className="box" ref={cardRef}>
      <Row>
        <Col md={6}>
          <div ref={textRef}>
            <h1 className="slide-title">{title}</h1>
            <p className="slide-desc">{desc}</p>
          </div>
          {/* Animated Button */}
          <button className="shop-btn" ref={btnRef} onClick={() => navigate("/shop")}>
            Explore More
          </button>
        </Col>
        <Col md={6}>
          <img ref={imgRef} src={cover} alt="Product Cover" className="slide-img" />
        </Col>
      </Row>
    </Container>
  );
};

export default SlideCard;
