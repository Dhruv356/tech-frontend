import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import "../Admin/mainadmin.css"; // External CSS

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Maindashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    totalSales: 0,
    monthlySales: [],
    monthlyRevenue: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin-dashboard", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setError("Failed to load stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Generate month names for charts
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const salesData = new Array(12).fill(0);
  const revenueData = new Array(12).fill(0);

  stats.monthlySales.forEach((sale) => {
    salesData[sale._id - 1] = sale.totalSales;
  });

  stats.monthlyRevenue.forEach((revenue) => {
    revenueData[revenue._id - 1] = revenue.revenue;
  });

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Revenue (₹)",
        data: revenueData,
        backgroundColor: "#F84040",
        borderRadius: 5
      }
    ]
  };

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Sales",
        data: salesData,
        borderColor: "#222831",
        backgroundColor: "rgba(34, 40, 49, 0.1)",
        fill: true
      }
    ]
  };

  if (loading) return <h2>Loading dashboard...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title"></h1>

      <div className="analytics-cards">
        <motion.div className="card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <h3>Total Users</h3>
          <h2>{stats.totalUsers}</h2>
          <p>+15% this month</p>
        </motion.div>
        <motion.div className="card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <h3>Total Revenue</h3>
          <h2>₹{stats.totalRevenue}</h2>
          <p>+10% this month</p>
        </motion.div>
        <motion.div className="card" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <h3>Total Sales</h3>
          <h2>{stats.totalSales}</h2>
          <p>+8% this month</p>
        </motion.div>
      </div>

      <div className="charts">
        <div className="chart">
          <h3>Revenue Growth</h3>
          <Bar data={barData} />
        </div>
        <div className="chart">
          <h3>Sales Overview</h3>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default Maindashboard;
