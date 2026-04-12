import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");

  const permissions = JSON.parse(localStorage.getItem("permissions")) || {};

  useEffect(() => {
    loadUsers();
  }, [page, search, sortBy]);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/users/users", {
        params: {
          page,
          size,
          search,
          sortBy,
        },
      });

      const data = res.data.data?.content || [];
      setUsers(Array.isArray(data) ? data : []);
      setTotalPages(res.data.data?.totalPages || 0);
    } catch (err) {
      console.error("Error loading users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/users/${id}`);
      loadUsers();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleUpdate = (id) => {
    alert(`Open update form for user ID: ${id}`);
  };

  return (
    <div className="space-y-4 px-2 md:px-0">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <h2 className="text-xl md:text-2xl font-bold">Users</h2>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setPage(0);
            setSearch(e.target.value);
          }}
          className="border px-3 py-2 rounded-lg w-full md:w-64"
        />
      </div>

      {/* SORT */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSortBy("id")}
          className="px-3 py-1 bg-slate-200 rounded text-sm md:text-base"
        >
          Sort ID
        </button>

        <button
          onClick={() => setSortBy("username")}
          className="px-3 py-1 bg-slate-200 rounded text-sm md:text-base"
        >
          Sort Name
        </button>

        <button
          onClick={() => setSortBy("email")}
          className="px-3 py-1 bg-slate-200 rounded text-sm md:text-base"
        >
          Sort Email
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow p-2 md:p-4">
        {loading ? (
          <p className="text-center p-6">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left border-collapse">
              <thead>
                <tr className="border-b text-slate-500 text-sm md:text-base">
                  <th className="py-2">ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b hover:bg-slate-50 text-sm md:text-base"
                  >
                    <td className="py-2">{u.id}</td>
                    <td>{u.username}</td>
                    <td className="break-all">{u.email}</td>
                    <td>{u.role}</td>

                    <td className="text-center">
                      <div className="flex flex-col md:flex-row justify-center gap-1 md:gap-2">
                        {permissions.canEditUsers && (
                          <button
                            onClick={() => handleUpdate(u.id)}
                            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 w-full md:w-auto"
                          >
                            Edit
                          </button>
                        )}

                        {permissions.canDeleteUsers && (
                          <button
                            onClick={() => handleDelete(u.id)}
                            className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 w-full md:w-auto"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-slate-900 text-white rounded disabled:opacity-40 w-full md:w-auto"
        >
          Prev
        </button>

        <p className="text-sm md:text-base">
          Page {page + 1} of {totalPages}
        </p>

        <button
          disabled={page + 1 === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-slate-900 text-white rounded disabled:opacity-40 w-full md:w-auto"
        >
          Next
        </button>
      </div>
    </div>
  );
}
