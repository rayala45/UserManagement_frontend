import Sidebar from "../UIComponents/Sidebar";
import Topbar from "../UIComponents/Topbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* TOPBAR */}
      <Topbar />

      {/* BODY */}
      <div className="flex flex-1">
        {/* SIDEBAR (handles its own mobile logic) */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <main
          className="
          flex-1 
          p-4 sm:p-6 
          w-full 
          overflow-x-hidden
        "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
