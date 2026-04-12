import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // all users (you can remove later if not needed)
      const res = await api.get("/api/users/allUsers");

      const data = res.data?.data || res.data || [];
      setUsers(Array.isArray(data) ? data : []);

      // logged-in user from localStorage
      const loggedUser = JSON.parse(localStorage.getItem("user"));
      setUser(loggedUser);
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  const safeUsers = users.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold text-slate-800">
          Welcome {user?.username || "User"} 👋
        </h2>
        <p className="text-slate-500 mt-1">Your personal dashboard overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-sm opacity-80">Your Role</p>
          <h3 className="text-3xl font-bold mt-2">{user?.role || "USER"}</h3>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-sm opacity-80">System Users</p>
          <h3 className="text-3xl font-bold mt-2">{users.length}</h3>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-sm opacity-80">Access Level</p>
          <h3 className="text-3xl font-bold mt-2">LIMITED</h3>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold text-slate-700">
            Recent Users (Read Only)
          </h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-600 text-sm">
              <tr>
                <th className="p-4">ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {safeUsers.map((u) => (
                <tr
                  key={u.id || u.username}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="p-4">{u.id}</td>
                  <td className="font-medium">{u.username}</td>
                  <td className="text-slate-600">{u.email}</td>
                  <td>
                    <span className="px-3 py-1 text-xs rounded-full bg-slate-200">
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
