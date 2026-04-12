import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser?.id) {
      loadPermissions(storedUser.id);
    }
  }, []);

  const loadPermissions = async (userId) => {
    try {
      const res = await api.get(`/api/permissions/${userId}`);
      setPermissions(res.data.data || res.data);
    } catch (err) {
      console.error("Failed to load permissions", err);
    }
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

  return (
    <div className="space-y-6 px-3 md:px-0">
      {/* HEADER */}
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-800">
          Settings
        </h2>
        <p className="text-slate-500 mt-1 text-sm md:text-base">
          View your account and system configuration
        </p>
      </div>

      {/* USER INFO */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold mb-4">
          Account Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="p-3 md:p-4 bg-slate-50 rounded-xl">
            <p className="text-xs md:text-sm text-slate-500">Username</p>
            <p className="font-semibold text-sm md:text-base break-all">
              {user?.username}
            </p>
          </div>

          <div className="p-3 md:p-4 bg-slate-50 rounded-xl">
            <p className="text-xs md:text-sm text-slate-500">Role</p>
            <p className="font-semibold text-sm md:text-base">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* PERMISSIONS VIEW ONLY */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold mb-4">
          My Permissions (Read Only)
        </h3>

        {permissions ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {Object.entries(permissionLabels).map(([key, label]) => (
              <div
                key={key}
                className="flex items-center justify-between bg-slate-50 p-3 md:p-4 rounded-xl gap-3"
              >
                <span className="font-medium text-slate-700 text-sm md:text-base">
                  {label}
                </span>

                {/* TOGGLE */}
                <div
                  className={`w-10 md:w-11 h-5 md:h-6 flex items-center rounded-full p-1 transition ${
                    permissions[key] ? "bg-green-500" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                      permissions[key] ? "translate-x-4 md:translate-x-5" : ""
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm md:text-base">
            Loading permissions...
          </p>
        )}
      </div>

      {/* SYSTEM SETTINGS */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold mb-4">
          System Settings
        </h3>

        <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-slate-600">
          <p>• JWT Authentication enabled</p>
          <p>• Stateless session management</p>
          <p>• BCrypt password encryption</p>
          <p>• Role-based access control active</p>
        </div>
      </div>
    </div>
  );
}
