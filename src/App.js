import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/Admin/Adminlogin"; // ✅ Add AdminLogin page
import ProtectedRoute from "./pages/Admin/Protectedroutes"; // ✅ Role protection
import SuperAdmin from "./pages/Admin/Mainadmin"; // ✅ Your superadmin page
import Mainadmin from "./pages/Admin/Mainadmin";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/Myorder";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import AdminDashboard from "./pages/Seller/AdminDashboard";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer position="top-right" autoClose={1000} hideProgressBar />
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Product />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/myorders" element={<MyOrders />} />

          {/* Admin Login */}
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Super Admin Route - Protected */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/superadmin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <SuperAdmin />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard Route */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Extra Superadmin Dashboard (if needed) */}
          <Route
            path="/superadmin/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Mainadmin />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
