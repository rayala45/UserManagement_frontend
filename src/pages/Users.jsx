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

  // DELETE USER
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/users/${id}`);
      loadUsers();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // UPDATE USER (placeholder)
  const handleUpdate = (id) => {
    alert(`Open update form for user ID: ${id}`);
  };

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users</h2>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setPage(0);
            setSearch(e.target.value);
          }}
          className="border px-3 py-2 rounded-lg"
        />
      </div>

      {/* SORT */}
      <div className="flex gap-2">
        <button
          onClick={() => setSortBy("id")}
          className="px-3 py-1 bg-slate-200 rounded"
        >
          Sort ID
        </button>

        <button
          onClick={() => setSortBy("username")}
          className="px-3 py-1 bg-slate-200 rounded"
        >
          Sort Name
        </button>

        <button
          onClick={() => setSortBy("email")}
          className="px-3 py-1 bg-slate-200 rounded"
        >
          Sort Email
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow p-4">
        {loading ? (
          <p className="text-center p-6">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-slate-500">
                  <th className="py-2">ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-slate-50">
                    <td className="py-2">{u.id}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>

                    {/* ACTIONS */}
                    <td className="text-center">
                      <div className="flex justify-center gap-2">
                        {/* EDIT BUTTON */}
                        {permissions.canEditUsers && (
                          <button
                            onClick={() => handleUpdate(u.id)}
                            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                        )}

                        {/* DELETE BUTTON */}
                        {permissions.canDeleteUsers && (
                          <button
                            onClick={() => handleDelete(u.id)}
                            className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
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
      <div className="flex justify-between items-center">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-slate-900 text-white rounded disabled:opacity-40"
        >
          Prev
        </button>

        <p>
          Page {page + 1} of {totalPages}
        </p>

        <button
          disabled={page + 1 === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-slate-900 text-white rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
