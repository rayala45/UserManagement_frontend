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
      const res = await api.get("/api/users/allUsers");

      const data = res.data?.data || res.data || [];
      setUsers(Array.isArray(data) ? data : []);

      const loggedUser = JSON.parse(localStorage.getItem("user"));
      setUser(loggedUser);
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  const safeUsers = users.slice(0, 5);

  return (
    <div className="space-y-6 px-3 md:px-0">
      {/* HEADER */}
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-800">
          Welcome {user?.username || "User"} 👋
        </h2>
        <p className="text-slate-500 mt-1 text-sm md:text-base">
          Your personal dashboard overview
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 md:p-6 rounded-2xl shadow-lg">
          <p className="text-xs md:text-sm opacity-80">Your Role</p>
          <h3 className="text-2xl md:text-3xl font-bold mt-2">
            {user?.role || "USER"}
          </h3>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 md:p-6 rounded-2xl shadow-lg">
          <p className="text-xs md:text-sm opacity-80">System Users</p>
          <h3 className="text-2xl md:text-3xl font-bold mt-2">
            {users.length}
          </h3>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 md:p-6 rounded-2xl shadow-lg">
          <p className="text-xs md:text-sm opacity-80">Access Level</p>
          <h3 className="text-2xl md:text-3xl font-bold mt-2">LIMITED</h3>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* HEADER */}
        <div className="p-4 md:p-5 border-b">
          <h3 className="text-base md:text-lg font-semibold text-slate-700">
            Recent Users (Read Only)
          </h3>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-left">
            <thead className="bg-slate-100 text-slate-600 text-xs md:text-sm">
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
                  className="border-b hover:bg-slate-50 transition text-sm md:text-base"
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
