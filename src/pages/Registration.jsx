import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      // 1. REGISTER USER
      await axios.post(
        "https://usermanagementsystem1-production.up.railway.app/api/users/save",
        {
          firstName: form.firstName,
          lastName: form.lastName,
          username: form.username,
          email: form.email,
          password: form.password,
          role: "USER",
        },
      );

      // 2. AUTO LOGIN
      const loginRes = await axios.post(
        "https://usermanagementsystem1-production.up.railway.app/auth/login",
        {
          username: form.username,
          password: form.password,
        },
      );

      const token = loginRes.data.token;

      localStorage.setItem("token", token);

      // 3. FETCH LOGGED IN USER
      const meRes = await axios.get(
        "https://usermanagementsystem1-production.up.railway.app/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const user = meRes.data;

      localStorage.setItem("user", JSON.stringify(user));

      // 4. NAVIGATE SAME AS LOGIN FLOW
      if (user.role === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/userdashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-slate-800 text-center">
          Create Account
        </h2>

        <p className="text-slate-500 text-center mt-2 mb-6">
          Register to continue
        </p>

        <div className="space-y-4">
          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full mt-6 bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800"
        >
          Register
        </button>

        <p className="text-sm text-center mt-4 text-slate-500">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
