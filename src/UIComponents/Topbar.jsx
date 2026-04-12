import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const initials = `${user?.username?.charAt(0) || "U"}`.toUpperCase();

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-md">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between">
        {/* LEFT */}
        <div className="min-w-0">
          <h1 className="text-lg md:text-xl font-bold text-white truncate">
            User Management
          </h1>
          <p className="text-[10px] md:text-xs text-slate-400 truncate">
            Welcome back,{" "}
            <span className="text-slate-200 font-medium">{user?.username}</span>
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* SEARCH (hidden on mobile) */}
          <div className="hidden md:flex items-center bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 w-64">
            <span className="text-slate-400 text-sm mr-2">🔍</span>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm text-white placeholder:text-slate-400 w-full"
            />
          </div>

          {/* NOTIFICATION */}
          <button className="relative w-9 h-9 md:w-10 md:h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition">
            <span className="text-white text-base">🔔</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
          </button>

          {/* USER MENU */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800 transition"
            >
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-semibold text-sm shadow">
                {initials}
              </div>

              {/* hide text on small screens */}
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white leading-none">
                  {user?.username}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">{user?.role}</p>
              </div>

              <span className="text-slate-400 text-xs">▼</span>
            </button>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-3 w-52 md:w-56 bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
                <div className="px-4 py-3 bg-slate-50 border-b">
                  <p className="font-semibold text-slate-800">
                    {user?.username}
                  </p>
                  <p className="text-xs text-slate-500">{user?.role}</p>
                </div>

                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm"
                >
                  My Profile
                </button>

                <button
                  onClick={() => navigate("/settings")}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm"
                >
                  Settings
                </button>

                <div className="border-t" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
