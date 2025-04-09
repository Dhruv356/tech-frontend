  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import "../pages/Signup.css";

  const Signup = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user", // Default role set to "user"
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/api/signup", formData);
        localStorage.setItem("token", response.data.token);

        setSuccess("Signup successful! Redirecting to login...");
        setError("");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        setError(err.response?.data?.message || "Error during signup. Please try again.");
      }
    };

    return (
      <div className="signup-container">
        <div className="signup-box">
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange}   pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    title="Please enter a valid email address"
  required />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            {/* <div className="dropdown">
              <label>Select Role</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="seller">seller</option>
              </select>
            </div> */}
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <div className="signup-link">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
    );
  };

  export default Signup;
