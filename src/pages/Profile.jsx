import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../pages/profile.css";
import { toast } from 'react-toastify';

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data);
        setImage(response.data.profileImage || null);
        setAddress(response.data.address || "");
        setPhoneNumber(response.data.phoneNumber || "");
        setShippingAddress(response.data.shippingAddress || "");
        setOrderHistory(response.data.orderHistory || []);
      } catch (error) {
        console.error("Error fetching profile", error);
        alert("Failed to fetch profile");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Just redirect without using setUser
  };
  

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.post(
          "http://localhost:5000/api/upload-profile-image",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setImage(response.data.profileImage);
        alert("Profile image updated successfully!");
      } catch (error) {
        console.error("Error uploading image", error);
        alert("Failed to upload image");
      }
    }
  };

 const handleSaveChanges = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  try {
    setIsLoading(true);
    await axios.post(
      "http://localhost:5000/api/profile", // ✅ FIXED: Changed from `/update-profile` to `/profile`
      { address, phoneNumber, shippingAddress },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Profile updated successfully!");
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile");
  } finally {
    setIsLoading(false);
  }
};

// const requestSeller = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     await axios.post('http://localhost:5000/api/request-seller', {}, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     toast.success('Seller request sent!');
//   } catch (error) {
//     toast.error(error.response.data.message);
//   }
// };

// ✅ Request to Become a Seller
const requestSeller = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/request-seller", {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    toast.success("Seller request sent!");
    setProfile({ ...profile, sellerRequest: true }); // Update state
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to send request.");
  }
};

  return (
<div className="profile-page">
  <div className="profile-container">
    {/* Left Sidebar */}
    <div className="profile-sidebar">
      <div className="profile-image">
        {image ? (
          <img src={`http://localhost:5000${image}`} alt="Profile" />
        ) : (
          <span>No Image</span>
        )}
      </div>
      <h3>{profile?.name}</h3>
      <p>{profile?.email}</p>
      <label className="upload-btn">
        Upload Image
        <input type="file" onChange={handleImageUpload} />
      </label>
    </div>

    {/* Right Content */}
    <div className="profile-content">
      <h1>Your Profile</h1>
      <p>Your profile preferences help us personalize recommendations for you.</p>

      {/* About You Section */}
      <div className="profile-section">
        <h2>About you</h2>

        <div className="profile-row">
          <span>Delivery Address</span>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="profile-row">
          <span>Phone Number</span>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>

        <div className="profile-row">
          <span>Shipping Address</span>
          <input type="text" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} />
        </div>

        <button className="submit-btn" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>

   
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
     {/* ✅ FIX: Only access profile.role if profile is not null */}
     {profile && profile.role === "user" && !profile.sellerRequest && (
          <button className="submit-btn" onClick={requestSeller}>
            Become a Seller
          </button>
        )}

        {profile && profile.sellerRequest && <p>Seller request pending approval.</p>}
      
    </div>
  </div>
</div>

  );
};

export default Profile;
