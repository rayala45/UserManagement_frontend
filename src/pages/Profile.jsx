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
    <div className="max-w-6xl mx-auto space-y-6 px-3 md:px-0">
      {/* HEADER */}
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-4xl font-bold text-slate-800">
          My Profile
        </h2>
        <p className="text-slate-500 mt-1 text-sm md:text-base">
          View your account details and manage profile information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* LEFT CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-200 shadow">
            {preview ? (
              <img
                src={preview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-sm">
                No Image
              </div>
            )}
          </div>

          <label className="mt-4 cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition text-center">
            Choose Profile Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <div className="mt-5 md:mt-6 text-center">
            <h3 className="text-lg md:text-xl font-bold text-slate-800 break-all">
              {userInfo.firstName} {userInfo.lastName}
            </h3>
            <p className="text-slate-500 text-sm md:text-base">
              {userInfo.role}
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-4 md:p-6 space-y-6 md:space-y-8">
          {/* ACCOUNT INFO */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-slate-700 mb-4">
              Account Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {[
                ["Username", userInfo.username],
                ["Email", userInfo.email],
                ["Phone", userInfo.phone],
                ["Joined On", userInfo.createdAt],
              ].map(([label, value]) => (
                <div key={label}>
                  <label className="text-xs md:text-sm font-medium text-slate-600">
                    {label}
                  </label>
                  <input
                    value={value || ""}
                    readOnly
                    className="w-full mt-1 bg-slate-100 border rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* PROFILE DETAILS */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-slate-700 mb-4">
              Profile Details
            </h3>

            <div className="space-y-3 md:space-y-4">
              <input
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="Designation"
                className="w-full border rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base"
              />

              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="Department"
                className="w-full border rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base"
              />

              <textarea
                name="bio"
                rows="3"
                value={form.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="w-full border rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base"
              />

              <textarea
                name="address"
                rows="3"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full border rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base"
          >
            {profileExists ? "Update Profile" : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
