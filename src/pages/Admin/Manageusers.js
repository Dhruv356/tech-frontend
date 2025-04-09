import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./manageusers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [sellerRequests, setSellerRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users.");
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted successfully.");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user.");
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/users/${userId}`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("User role updated.");
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update user role.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchSellerRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5000/api/admin/seller-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSellerRequests(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load seller requests.");
    }
  };

  const handleSellerRequest = async (userId, action) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/admin/approve-seller",
        { userId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`User ${action === "approved" ? "approved" : "rejected"} as seller.`);
      fetchSellerRequests();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to process request.");
    }
  };

  useEffect(() => {
    fetchSellerRequests();
  }, []);

  // ✅ Corrected: Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const name = user.name ? user.name.toLowerCase() : ""; 
    const email = user.email ? user.email.toLowerCase() : "";
    const role = user.role ? user.role.toLowerCase() : "";
  
    return (
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      role.includes(searchTerm.toLowerCase())
    );
  });
  

  return (
    <section className="admin-wrapper">
      {/* ✅ Seller Requests Table */}
      <div className="seller-requests">
        <h2>Seller Requests</h2>
        {sellerRequests.length === 0 ? (
          <p className="no-requests">No pending seller requests.</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellerRequests.map((request) => (
                <tr key={request._id}>
                  <td>{request.name}</td>
                  <td>{request.email}</td>
                  <td>
                    <button className="approve-btn" onClick={() => handleSellerRequest(request._id, "approved")}>
                      Approve
                    </button>
                    <button className="reject-btn" onClick={() => handleSellerRequest(request._id, "rejected")}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <h1 className="admin-title">👥 Manage Users</h1>

      {/* ✅ Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* ✅ Corrected: Use filteredUsers instead of users */}
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user._id, e.target.value)}
                      className="role-select"
                      aria-label="Change User Role"
                    >
                      <option value="user">User</option>
                      <option value="seller">Seller</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button type="button" onClick={() => deleteUser(user._id)} className="delete-button">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageUsers;
