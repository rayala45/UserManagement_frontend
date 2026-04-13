import Sidebar from "../UIComponents/Sidebar";
import Topbar from "../UIComponents/Topbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="h-screen bg-slate-100 flex flex-col overflow-hidden">
      {/* TOPBAR */}
      <Topbar />

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <main
          className="
            flex-1
            p-4 sm:p-6
            overflow-y-auto
            overflow-x-hidden
            h-full
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
