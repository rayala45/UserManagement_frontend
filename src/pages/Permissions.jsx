import { useEffect, useState } from "react";
import { Users, Settings, FileText } from "lucide-react";
import api from "../api/axiosInstance";

export default function Permissions() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [permissions, setPermissions] = useState(null);

  const permissionGroups = {
    "User Management": {
      icon: <Users size={20} />,
      fields: [
        "canViewUsers",
        "canCreateUsers",
        "canEditUsers",
        "canDeleteUsers",
      ],
    },

    "System Access": {
      icon: <Settings size={20} />,
      fields: [
        "canViewAdmins",
        "canManageRoles",
        "canManagePermissions",
        "canManageSettings",
      ],
    },

    Reports: {
      icon: <FileText size={20} />,
      fields: ["canViewAuditLogs", "canExportReports"],
    },
  };

  const permissionLabels = {
    canViewUsers: "View Users",
    canCreateUsers: "Create Users",
    canEditUsers: "Edit Users",
    canDeleteUsers: "Delete Users",
    canViewAdmins: "View Admin Accounts",
    canManageRoles: "Manage Roles",
    canManagePermissions: "Manage Permissions",
    canManageSettings: "Manage Settings",
    canViewAuditLogs: "View Audit Logs",
    canExportReports: "Export Reports",
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/api/users/UsersMS");
      setUsers(res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadPermissions = async (userId) => {
    try {
      setSelectedUserId(userId);
      const res = await api.get(`/api/permissions/${userId}`);
      setPermissions(res.data.data || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = (field) => {
    setPermissions((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const toggleGroup = (fields, value) => {
    setPermissions((prev) => {
      const updated = { ...prev };
      fields.forEach((field) => {
        updated[field] = value;
      });
      return updated;
    });
  };

  const savePermissions = async () => {
    try {
      await api.put(`/api/permissions/update/${selectedUserId}`, permissions);
      alert("Permissions Updated Successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to Update Permissions");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-3 md:px-0">
      {/* HEADER */}
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          Permission Management
        </h2>
        <p className="text-slate-500 mt-1 text-sm md:text-base">
          Assign and update user permissions
        </p>
      </div>

      {/* USER SELECT */}
      <div className="bg-white rounded-2xl shadow-sm border p-4 md:p-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Select User
        </label>

        <select
          value={selectedUserId}
          onChange={(e) => loadPermissions(e.target.value)}
          className="w-full border rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base"
        >
          <option value="">Choose User</option>

          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>
      </div>

      {/* PERMISSIONS */}
      {permissions && (
        <div className="space-y-4 md:space-y-6">
          {Object.entries(permissionGroups).map(([groupName, group]) => (
            <div
              key={groupName}
              className="bg-white rounded-2xl shadow-sm border overflow-hidden"
            >
              {/* GROUP HEADER */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-6 py-4 border-b bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="text-slate-700">{group.icon}</div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800">
                    {groupName}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => toggleGroup(group.fields, true)}
                    className="px-2 md:px-3 py-1 text-xs md:text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                  >
                    Enable All
                  </button>

                  <button
                    onClick={() => toggleGroup(group.fields, false)}
                    className="px-2 md:px-3 py-1 text-xs md:text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  >
                    Disable All
                  </button>
                </div>
              </div>

              {/* PERMISSIONS GRID */}
              <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {group.fields.map((field) => (
                  <div
                    key={field}
                    className="flex items-center justify-between border rounded-xl px-3 md:px-4 py-3 md:py-4 hover:bg-slate-50 transition"
                  >
                    <span className="font-medium text-slate-700 text-sm md:text-base">
                      {permissionLabels[field]}
                    </span>

                    {/* TOGGLE */}
                    <button
                      onClick={() => handleToggle(field)}
                      className={`relative inline-flex h-5 md:h-6 w-10 md:w-11 items-center rounded-full transition ${
                        permissions[field] ? "bg-slate-900" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          permissions[field]
                            ? "translate-x-5 md:translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* SAVE BUTTON */}
          <button
            onClick={savePermissions}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base"
          >
            Save Permissions
          </button>
        </div>
      )}
    </div>
  );
}
