import React, { useState } from "react";


export const Manageuser = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");

  const handleAddUser = () => {
    if (!name || !email) {
      alert("Please enter both name and email.");
      return;
    }

    const newUser = {
      id: users.length + 1,
      name,
      email,
      role,
    };

    setUsers([...users, newUser]);
    setName("");
    setEmail("");
    setRole("User");
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="manage-users">
      {/* Add User Section */}
      <div className="user-card">
        <h2>Add User</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
        </div>
        <button className="add-user-button" onClick={handleAddUser}>
          Add User
        </button>
      </div>

      {/* User List Section */}
      <div className="user-list">
        <h3>User List</h3>
        {users.length > 0 ? (
          users.map((user) => (
            <div className="user-item" key={user.id}>
              <span>{user.name} ({user.role})</span>
              <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No users added yet.</p>
        )}
      </div>
    </div>
  );
};
