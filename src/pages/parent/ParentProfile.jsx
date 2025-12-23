import React, { useState } from "react";
import { logout, changePassword } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { formatTaskDate } from "../../utils/formatDate";

export default function ParentProfile() {
  const navigate = useNavigate();

  const storedParent = JSON.parse(localStorage.getItem("parent"));
  const parent = {
    name: storedParent?.parentName || storedParent?.email,
    code: storedParent?.code || "P12345",
    email: storedParent?.email || "email@example.com",
    school: storedParent?.school || "None",
    teacher: storedParent?.teacher || "None",
  };

  console.log(storedParent);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSave = async () => {
    if (
      !passwords.current ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      alert("Please fill all fields!");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await changePassword({
        code: parent.code,
        oldPassword: passwords.current,
        newPassword: passwords.newPassword,
      });
      alert(res.message);
      setPasswords({ current: "", newPassword: "", confirmPassword: "" });
      setShowPasswordModal(false);

      logout("parent");
      navigate("/login");
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-3xl shadow-md mt-10 space-y-6 font-sans">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Parent Profile
      </h1>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 bg-white p-6 rounded-2xl shadow-sm">
        {/* Initials Avatar */}
        <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 text-3xl font-semibold">
          {getInitials(parent.name)}
        </div>

        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-semibold text-gray-900">
            {parent.name}
          </h2>
          <p className="text-gray-500 mt-1">{parent.code}</p>

          <p className="text-gray-400 text-sm mt-1">
            Joined:{" "}
            <span className="text-gray-700">
              {formatTaskDate(storedParent.createdAt)}
            </span>
          </p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-500 font-medium mb-1">Code</h3>
          <p className="text-gray-900">{parent.code}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-500 font-medium mb-1">Email</h3>
          <p className="text-gray-900">{parent.email}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-500 font-medium mb-1">School</h3>
          <p className="text-gray-900">{parent.school}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-500 font-medium mb-1">Teacher</h3>
          <p className="text-gray-900">{parent.teacher}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
        <button
          onClick={() => setShowPasswordModal(true)}
          className="px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition"
        >
          Change Password
        </button>
        <button
          onClick={() => {
            logout("parent");
            navigate("/login");
          }}
          className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-md rounded-2xl shadow-lg space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Change Password
            </h2>

            <div>
              <label className="text-gray-500 text-sm">Current Password</label>
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="text-gray-500 text-sm">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div>
              <label className="text-gray-500 text-sm">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSave}
                className="px-6 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
