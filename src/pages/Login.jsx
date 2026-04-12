import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // 1. LOGIN API
      const res = await axios.post("http://localhost:8080/auth/login", form);

      const token = res.data.token;

      // STORE TOKEN
      localStorage.setItem("token", token);

      // 2. FETCH LOGGED IN USER
      const meRes = await axios.get("http://localhost:8080/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = meRes.data;

      // extract permissions
      const permissions = user?.userPermissions;

      // remove permissions from user object
      const { userPermissions, ...userWithoutPermissions } = user;

      // store user without permissions
      localStorage.setItem("user", JSON.stringify(userWithoutPermissions));

      // store permissions separately
      localStorage.setItem("permissions", JSON.stringify(permissions));

      // ROLE BASED NAVIGATION
      if (user.role === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/userdashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* HEADER */}
        <h2 className="text-3xl font-bold mb-2 text-center text-slate-800">
          Welcome Back
        </h2>

        <p className="text-center text-slate-500 mb-6">
          Login to continue to your account
        </p>

        {/* FORM */}
        <input
          className="w-full border border-slate-300 px-4 py-3 mb-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          className="w-full border border-slate-300 px-4 py-3 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold transition"
        >
          Login
        </button>

        {/* REGISTER LINK */}
        <p className="text-center text-sm text-slate-500 mt-5">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
