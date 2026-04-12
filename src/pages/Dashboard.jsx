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
    <div className="space-y-6 px-2 md:px-0">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl md:text-4xl font-bold text-slate-800">
          Dashboard
        </h2>
        <p className="text-slate-500 mt-1 text-sm md:text-base">
          Welcome back 👋 Here is your system overview
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-blue-500 text-white p-5 md:p-6 rounded-2xl shadow-lg">
          <p className="text-xs md:text-sm opacity-80">Total Users</p>
          <h3 className="text-2xl md:text-3xl font-bold mt-2">
            {users.length}
          </h3>
        </div>

        <div className="bg-purple-500 text-white p-5 md:p-6 rounded-2xl shadow-lg">
          <p className="text-xs md:text-sm opacity-80">Admins</p>
          <h3 className="text-2xl md:text-3xl font-bold mt-2">
            {safeUsers.filter((u) => u.role === "ADMIN").length}
          </h3>
        </div>

        <div className="bg-green-500 text-white p-5 md:p-6 rounded-2xl shadow-lg">
          <p className="text-xs md:text-sm opacity-80">Active Users</p>
          <h3 className="text-2xl md:text-3xl font-bold mt-2">
            {users.length}
          </h3>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 p-4 md:p-5 border-b">
          <h3 className="text-base md:text-lg font-semibold text-slate-700">
            Recent Users
          </h3>

          <input
            type="text"
            placeholder="Search users..."
            className="border rounded-xl px-3 py-2 text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-left">
            <thead className="bg-slate-100 text-slate-600 text-sm">
              <tr>
                <th className="p-3 md:p-4">ID</th>
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
                  <td className="p-3 md:p-4">{u.id}</td>
                  <td className="font-medium">{u.username}</td>
                  <td className="text-slate-600 break-all">{u.email}</td>
                  <td>
                    <span className="px-2 md:px-3 py-1 text-xs rounded-full bg-slate-200">
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
