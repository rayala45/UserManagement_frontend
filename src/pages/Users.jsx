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
        params: { page, size, search, sortBy },
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
    await api.delete(`/api/users/${id}`);
    loadUsers();
  };

  const handleUpdate = (id) => {
    alert(`Open update form for user ID: ${id}`);
  };

  return (
    <div className="space-y-4">
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
          className="px-3 py-1 bg-slate-200 rounded text-sm"
        >
          Sort ID
        </button>
        <button
          onClick={() => setSortBy("username")}
          className="px-3 py-1 bg-slate-200 rounded text-sm"
        >
          Sort Name
        </button>
        <button
          onClick={() => setSortBy("email")}
          className="px-3 py-1 bg-slate-200 rounded text-sm"
        >
          Sort Email
        </button>
      </div>

      {/* TABLE CARD (mobile friendly) */}
      <div className="bg-white rounded-xl shadow p-3 md:p-4">
        {loading ? (
          <p className="text-center p-6">Loading users...</p>
        ) : (
          <>
            {/* MOBILE CARD VIEW */}
            <div className="md:hidden space-y-3">
              {users.map((u) => (
                <div key={u.id} className="border rounded-lg p-3 space-y-1">
                  <p>
                    <b>ID:</b> {u.id}
                  </p>
                  <p>
                    <b>Name:</b> {u.username}
                  </p>
                  <p className="break-all">
                    <b>Email:</b> {u.email}
                  </p>
                  <p>
                    <b>Role:</b> {u.role}
                  </p>

                  <div className="flex gap-2 pt-2">
                    {permissions.canEditUsers && (
                      <button
                        onClick={() => handleUpdate(u.id)}
                        className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>
                    )}

                    {permissions.canDeleteUsers && (
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b text-slate-500">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b hover:bg-slate-50">
                      <td>{u.id}</td>
                      <td>{u.username}</td>
                      <td className="break-all">{u.email}</td>
                      <td>{u.role}</td>

                      <td className="text-center">
                        <div className="flex justify-center gap-2">
                          {permissions.canEditUsers && (
                            <button
                              onClick={() => handleUpdate(u.id)}
                              className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
                            >
                              Edit
                            </button>
                          )}

                          {permissions.canDeleteUsers && (
                            <button
                              onClick={() => handleDelete(u.id)}
                              className="px-2 py-1 text-xs bg-red-500 text-white rounded"
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
          </>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-slate-900 text-white rounded w-full md:w-auto"
        >
          Prev
        </button>

        <p>
          Page {page + 1} of {totalPages}
        </p>

        <button
          disabled={page + 1 === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-slate-900 text-white rounded w-full md:w-auto"
        >
          Next
        </button>
      </div>
    </div>
  );
}
