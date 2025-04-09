import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import "./style.css";
import logo from "../../Images/logo1.png";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-row">
          {/* Logo and About Section */}
          <Col lg={4} md={6} sm={12} className="footer-box">
            <div className="footer-logo">
              <img src={logo} alt="TechTrove Logo" className="footer-logo-img" />
              <h1 className="footer-title">TechTrove</h1>
            </div>
            <p className="footer-description">
              TechTrove is your ultimate destination for high-quality electronics and cutting-edge gadgets. 
              Our mission is to bring you the latest technology at unbeatable prices, backed by excellent customer service.
            </p>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} sm={12} className="footer-box">
            <h2 className="footer-heading">About Us</h2>
            <ul className="footer-list">
              <li><a href="#">Careers</a></li>
              <li><a href="#">Our Stores</a></li>
              <li><a href="#">Our Cares</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </Col>

          {/* Customer Care */}
          <Col lg={2} md={6} sm={12} className="footer-box">
            <h2 className="footer-heading">Customer Care</h2>
            <ul className="footer-list">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">How to Buy</a></li>
              <li><a href="#">Track Your Order</a></li>
              <li><a href="#">Bulk Purchasing</a></li>
              <li><a href="#">Returns & Refunds</a></li>
            </ul>
          </Col>

          {/* Contact Section */}
          <Col lg={4} md={6} sm={12} className="footer-box">
            <h2 className="footer-heading">Contact Us</h2>
            <ul className="footer-list">
              <li><strong>Address:</strong> </li>
              <li><strong>Email:</strong> <a href="mailto:dhruvdalwadi05@gmail.com">dhruvdalwadi05@gmail.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:+919409584248">+91-9409584248</a></li>
            </ul>
            
            {/* Social Media Links */}
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
            </div>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} TechTrove. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
