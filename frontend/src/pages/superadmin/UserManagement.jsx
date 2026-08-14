import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserManagement() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users");
      setUsers(res.data.users || []);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/auth/users/${id}`
      );

      loadUsers();
    } catch (err) {
      alert("Delete Failed");
    }
  };

  const filteredUsers = users.filter((u) =>
    (
      (u.fullName || "") +
      (u.email || "") +
      (u.role || "") +
      (u.employeeId || "")
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={{ color: "white" }}>
      <h1 style={{ color: "#22c55e" }}>
        👥 User Management
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0",
        }}
      >
        <button
          style={addBtn}
          onClick={() => navigate("/super-admin/add-user")}
        >
          + Add User
        </button>

        <input
          type="text"
          placeholder="Search User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchBox}
        />
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Train</th>
            <th>Zone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.employeeId}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.trainNumber}</td>
              <td>{user.zoneDivision}</td>

              <td>
                <button
                  style={editBtn}
                  onClick={() =>
                    navigate(
                      `/super-admin/edit-user/${user._id}`
                    )
                  }
                >
                  Edit
                </button>

                <button
                  style={deleteBtn}
                  onClick={() =>
                    deleteUser(user._id)
                  }
                >
                  Delete
                </button>

                <button
                  style={resetBtn}
                  onClick={() =>
                    alert(
                      "Reset Password feature coming next."
                    )
                  }
                >
                  Reset
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const table = {
  width: "100%",
  background: "#1f2937",
  borderCollapse: "collapse",
};

const searchBox = {
  width: "250px",
  padding: "10px",
  borderRadius: "5px",
};

const addBtn = {
  background: "#22c55e",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "5px",
  cursor: "pointer",
};

const editBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "6px 12px",
  margin: "2px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "6px 12px",
  margin: "2px",
  cursor: "pointer",
};

const resetBtn = {
  background: "#f59e0b",
  color: "white",
  border: "none",
  padding: "6px 12px",
  margin: "2px",
  cursor: "pointer",
};

export default UserManagement;