import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export default function Profile() {
  const localUser = JSON.parse(localStorage.getItem("user"));

  const [userInfo, setUserInfo] = useState({});
  const [form, setForm] = useState({
    bio: "",
    designation: "",
    department: "",
    address: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get(`/api/users/${localUser.id}`);
      const userData = res.data.data || res.data;

      setUserInfo(userData);

      if (userData.userProfile) {
        setProfileExists(true);

        setForm({
          bio: userData.userProfile.bio || "",
          designation: userData.userProfile.designation || "",
          department: userData.userProfile.department || "",
          address: userData.userProfile.address || "",
        });

        if (userData.userProfile.profileImage) {
          setPreview(
            `data:image/jpeg;base64,${userData.userProfile.profileImage}`,
          );
        }
      }
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("userId", localUser.id);
      formData.append("bio", form.bio);
      formData.append("designation", form.designation);
      formData.append("department", form.department);
      formData.append("address", form.address);

      if (image) {
        formData.append("image", image);
      }

      const endpoint = profileExists
        ? "/api/profile/update"
        : "/api/profile/save";

      const method = profileExists ? api.put : api.post;

      await method(endpoint, formData);

      alert(
        profileExists
          ? "Profile Updated Successfully"
          : "Profile Saved Successfully",
      );

      setProfileExists(true);
      loadProfile();
    } catch (err) {
      console.error(err);
      alert("Operation Failed");
    }
  };

  if (loading) {
    return <p className="p-6 text-center">Loading Profile...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-4xl font-bold text-slate-800">My Profile</h2>
        <p className="text-slate-500 mt-1">
          View your account details and manage profile information
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-slate-200 shadow">
            {preview ? (
              <img
                src={preview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                No Image
              </div>
            )}
          </div>

          {/* CUSTOM FILE BUTTON */}
          <label className="mt-4 cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            Choose Profile Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <div className="mt-6 text-center">
            <h3 className="text-xl font-bold text-slate-800">
              {userInfo.firstName} {userInfo.lastName}
            </h3>
            <p className="text-slate-500">{userInfo.role}</p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 space-y-8">
          {/* ACCOUNT INFO */}
          <div>
            <h3 className="text-xl font-semibold text-slate-700 mb-4">
              Account Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Username
                </label>
                <input
                  value={userInfo.username || ""}
                  readOnly
                  className="w-full mt-1 bg-slate-100 border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Email
                </label>
                <input
                  value={userInfo.email || ""}
                  readOnly
                  className="w-full mt-1 bg-slate-100 border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Phone
                </label>
                <input
                  value={userInfo.phone || ""}
                  readOnly
                  className="w-full mt-1 bg-slate-100 border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Joined On
                </label>
                <input
                  value={userInfo.createdAt || ""}
                  readOnly
                  className="w-full mt-1 bg-slate-100 border rounded-lg px-4 py-3"
                />
              </div>
            </div>
          </div>

          {/* PROFILE DETAILS */}
          <div>
            <h3 className="text-xl font-semibold text-slate-700 mb-4">
              Profile Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600">
                  Designation
                </label>
                <input
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Department
                </label>
                <input
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows="4"
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">
                  Address
                </label>
                <textarea
                  name="address"
                  rows="3"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-4 py-3"
                />
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold transition"
          >
            {profileExists ? "Update Profile" : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
