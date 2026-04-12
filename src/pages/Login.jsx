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
      const res = await axios.post(
        "https://usermanagementsystem1-production.up.railway.app/auth/login",
        form,
      );

      const token = res.data.token;
      localStorage.setItem("token", token);

      const meRes = await axios.get(
        "https://usermanagementsystem1-production.up.railway.app/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const user = meRes.data;

      const permissions = user?.userPermissions;
      const { userPermissions, ...userWithoutPermissions } = user;

      localStorage.setItem("user", JSON.stringify(userWithoutPermissions));
      localStorage.setItem("permissions", JSON.stringify(permissions));

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
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      {/* CARD */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 md:p-8">
        {/* HEADER */}
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-slate-800">
          Welcome Back
        </h2>

        <p className="text-center text-sm md:text-base text-slate-500 mb-6">
          Login to continue to your account
        </p>

        {/* FORM */}
        <div className="space-y-3">
          <input
            className="w-full border border-slate-300 px-4 py-3 rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            type="password"
            className="w-full border border-slate-300 px-4 py-3 rounded-xl text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full mt-5 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold transition active:scale-[0.98]"
        >
          Login
        </button>

        {/* REGISTER */}
        <p className="text-center text-xs md:text-sm text-slate-500 mt-5">
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
