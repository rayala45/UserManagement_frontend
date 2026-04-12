import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/users/allUsers");

      const data = res.data?.data || res.data || [];
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  const safeUsers = users.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold text-slate-800">Dashboard</h2>
        <p className="text-slate-500 mt-1">
          Welcome back 👋 Here is your system overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-sm opacity-80">Total Users</p>
          <h3 className="text-3xl font-bold mt-2">{users.length}</h3>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-sm opacity-80">Admins</p>
          <h3 className="text-3xl font-bold mt-2">
            {safeUsers.filter((u) => u.role === "ADMIN").length}
          </h3>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <p className="text-sm opacity-80">Active Users</p>
          <h3 className="text-3xl font-bold mt-2">{users.length}</h3>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Table Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h3 className="text-lg font-semibold text-slate-700">Recent Users</h3>

          <input
            type="text"
            placeholder="Search users..."
            className="border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
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
