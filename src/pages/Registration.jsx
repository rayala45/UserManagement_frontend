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

      const loginRes = await axios.post(
        "https://usermanagementsystem1-production.up.railway.app/auth/login",
        {
          username: form.username,
          password: form.password,
        },
      );

      const token = loginRes.data.token;
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
      localStorage.setItem("user", JSON.stringify(user));

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
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md bg-white rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center">
          Create Account
        </h2>

        <p className="text-slate-500 text-center mt-2 mb-6 text-sm md:text-base">
          Register to continue
        </p>

        <div className="space-y-3 md:space-y-4">
          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className="w-full border rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base"
          />

          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className="w-full border rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base"
          />

          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full border rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full border rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm md:text-base"
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full mt-5 md:mt-6 bg-slate-900 text-white py-2 md:py-3 rounded-xl hover:bg-slate-800 text-sm md:text-base"
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
