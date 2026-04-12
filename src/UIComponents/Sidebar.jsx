import { Link, useNavigate, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-slate-800 text-white"
      : "text-slate-300 hover:bg-slate-800 hover:text-white";

  return (
    <aside className="w-72 bg-slate-950 text-white min-h-screen flex flex-col border-r border-slate-800">
      {/* BRAND */}
      <div className="px-6 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-wide">
          UMS {user?.role === "ADMIN" && "Admin"}
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Enterprise User Management
        </p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
        {/* MAIN */}
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500 px-3 mb-3">
            Main
          </p>

          <div className="space-y-2">
            <Link
              to="/profile"
              className={`block px-4 py-3 rounded-xl transition ${isActive("/profile")}`}
            >
              Profile
            </Link>

            <Link
              to={user?.role === "ADMIN" ? "/dashboard" : "/userdashboard"}
              className={`block px-4 py-3 rounded-xl transition ${
                isActive("/dashboard") || isActive("/userdashboard")
              }`}
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* USER MANAGEMENT */}
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500 px-3 mb-3">
            User Management
          </p>

          <div className="space-y-2">
            <Link
              to="/users"
              className={`block px-4 py-3 rounded-xl transition ${isActive("/users")}`}
            >
              Users
            </Link>

            {user?.role === "ADMIN" && (
              <>
                <Link
                  to="/users/create"
                  className={`block px-4 py-3 rounded-xl transition ${isActive("/users/create")}`}
                >
                  Create User
                </Link>

                {/* ✅ PERMISSIONS ADDED HERE */}
                <Link
                  to="/permissions"
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition ${isActive(
                    "/permissions",
                  )}`}
                >
                  <Shield size={18} />
                  Permissions
                </Link>
              </>
            )}
          </div>
        </div>

        {/* SYSTEM */}
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500 px-3 mb-3">
            System
          </p>

          <div className="space-y-2">
            <Link
              to="/settings"
              className={`block px-4 py-3 rounded-xl transition ${isActive("/settings")}`}
            >
              Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 px-4 py-3 rounded-xl font-medium transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
