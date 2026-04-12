import { Link, useNavigate, useLocation } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-slate-800 text-white"
      : "text-slate-300 hover:bg-slate-800 hover:text-white";

  const SidebarContent = () => (
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

      {/* NAV */}
      <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
        {/* MAIN */}
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500 px-3 mb-3">
            Main
          </p>

          <div className="space-y-2">
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-xl transition ${isActive("/profile")}`}
            >
              Profile
            </Link>

            <Link
              to={user?.role === "ADMIN" ? "/dashboard" : "/userdashboard"}
              onClick={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-xl transition ${isActive("/users")}`}
            >
              Users
            </Link>

            {user?.role === "ADMIN" && (
              <>
                <Link
                  to="/users/create"
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-xl transition ${isActive("/users/create")}`}
                >
                  Create User
                </Link>

                <Link
                  to="/permissions"
                  onClick={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
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

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between bg-slate-950 text-white px-4 py-3 border-b border-slate-800">
        <h1 className="font-bold">UMS</h1>

        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block">
        <SidebarContent />
      </div>

      {/* MOBILE OVERLAY SIDEBAR */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* BACKDROP */}
          <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />

          {/* SIDEBAR */}
          <div className="w-72 bg-slate-950 h-full relative">
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white"
            >
              <X />
            </button>

            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
