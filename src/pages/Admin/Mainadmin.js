import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUsers, FiShoppingCart, FiSettings, FiPackage,FiBarChart2} from "react-icons/fi";
import Manageuser from "./Manageproducts";
import ManageProduct from "./Manageproducts";
import "./mainadmin.css";
import Maindashboard from "./Maindashbord";
import ManageUsers from "./Manageusers";
import Manageproducts from "./Manageproducts";
import AdminOrders from "./AdminOrders";
import Addproduct from "./Addproduct";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          alert("Authentication failed! Please log in again.");
          return;
        }
  
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Failed to fetch users.");
      }
    };
  
    fetchUsers();
  }, []);
  

  return (
    <div className="admin-dashboard">
    
      <motion.div
        className="admin-sidebar"
        initial={{ x: -250, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <Link to="/superadmin/dashboard" className="nav-link">
            <li>
              <FiBarChart2 className="icon" /> Dashboard
            </li>
          </Link>
          <Link to="/superadmin/manageusers" className="nav-link">
            <li>
              <FiUsers className="icon" /> Manage Users
            </li>
          </Link>
          <Link to="/superadmin/Add-products" className="nav-link">
            <li>
              <FiPackage className="icon" /> Add Products
            </li> 
            </Link>
          <Link to="/superadmin/manage-products" className="nav-link">
            <li>
              <FiShoppingCart className="icon" /> Manage Products
            </li>
          </Link>
          <Link to="/superadmin/orders" className="nav-link">
            <li>
              <FiPackage className="icon" /> Manage Orders
            </li>
          </Link>
          <li>
            <FiSettings className="icon" /> Settings
          </li>
          
        </ul>
      </motion.div>


      <motion.div
        className="admin-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Admin Dashboard</h1>
        <Routes>
          <Route path="dashboard" element={<Maindashboard />} />
          <Route path="manageusers" element={<ManageUsers />} />
          <Route path="Add-products" element={<Addproduct/>} />
          <Route path="manage-products" element={<Manageproducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="/" element={<Navigate to="dashboard" />} />
        </Routes>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
