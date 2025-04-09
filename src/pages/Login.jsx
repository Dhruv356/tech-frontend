import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before new request
  
    try {
      localStorage.removeItem("cartItems"); // ✅ Clear cart on login
  
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
        role,
      });
  
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", response.data.userName);
  
      // ✅ Decode the JWT token to get userId
      const decoded = jwtDecode(token);
      localStorage.setItem("userId", decoded.userId); // ✅ Store userId for future use
  
      alert("Login successful!");
      navigate("/");
      window.location.reload(); // Refresh the page
    } catch (err) {
      if (!err.response) {
        setError("Server is unreachable. Please check backend connection.");
      } else {
        setError(err.response.data.message || "Login failed. Please try again.");
      }
    }
  };
  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="dropdown">
            <label>Select Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="seller">seller</option>
            </select>
          </div>
          <div className="form-group">
            <label>Email</label>  
          <input
          type="email"
          placeholder=" Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <div className="form-group">
          <label>Password</label> 
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
