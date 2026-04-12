import Sidebar from "../UIComponents/Sidebar";
import Topbar from "../UIComponents/Topbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* TOPBAR FULL WIDTH */}
      <Topbar />

      {/* BODY */}
      <div className="flex">
        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
