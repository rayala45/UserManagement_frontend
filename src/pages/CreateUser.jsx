import { useState } from "react";
import api from "../api/axiosInstance";

export default function CreateUser() {
  const initialForm = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "USER",
    department: "",
    designation: "",
    active: true,
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setForm((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await api.post("/api/users/Admin/users", form);

      alert("User Created Successfully");
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      alert("Failed to Create User");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-8">
      {/* HEADER */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          Create New User
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-2">
          Add a new user/admin to the system
        </p>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <input
          name="firstName"
          value={form.firstName}
          placeholder="First Name"
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 text-sm md:text-base"
        />

        <input
          name="lastName"
          value={form.lastName}
          placeholder="Last Name"
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 text-sm md:text-base"
        />

        <input
          name="username"
          value={form.username}
          placeholder="Username"
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 text-sm md:text-base"
        />

        <input
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 text-sm md:text-base"
        />

        <input
          name="phone"
          value={form.phone}
          placeholder="Phone"
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 text-sm md:text-base"
        />

        <input
          name="password"
          value={form.password}
          placeholder="Temporary Password"
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 text-sm md:text-base"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 text-sm md:text-base"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <input
          name="department"
          value={form.department}
          placeholder="Department"
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 text-sm md:text-base"
        />

        <input
          name="designation"
          value={form.designation}
          placeholder="Designation"
          onChange={handleChange}
          className="border rounded-xl px-4 py-3 text-sm md:text-base"
        />

        {/* CHECKBOX FULL WIDTH ON MOBILE */}
        <label className="flex items-center gap-3 text-slate-700 md:col-span-2">
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
          />
          Active User
        </label>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        className="w-full mt-6 md:mt-8 bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition"
      >
        Create User
      </button>
    </div>
  );
}
