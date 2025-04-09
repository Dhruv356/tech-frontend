import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/admin-login', {
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.role);
      toast.success("Admin login successful!");
      navigate('/superadmin');
    } catch (err) {
      toast.error("Invalid admin credentials");
    }
  };

  return (
    <div className="admin-login-wrapper">
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
  );
};

export default AdminLogin;
