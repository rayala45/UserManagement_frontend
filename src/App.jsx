import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Registration"; // ADD THIS
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./UIComponents/ProtectedRoute";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import CreateUser from "./pages/CreateUser";
import Permissions from "./pages/Permissions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* ADMIN DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* USER DASHBOARD */}
          <Route path="/userdashboard" element={<UserDashboard />} />

          {/* USERS PAGE */}
          <Route path="/users" element={<Users />} />

          {/* SETTINGS */}
          <Route path="/settings" element={<Settings />} />

          {/* PROFILE */}
          <Route path="/profile" element={<Profile />} />

          {/* CREATE USER */}
          <Route path="/users/create" element={<CreateUser />} />

          {/*  USER PERMISSIONS */}
          <Route path="/permissions" element={<Permissions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
