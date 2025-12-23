import { useState } from "react";
import { logout, changePassword } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // Get logged-in user info from localStorage
  const role = localStorage.getItem("userType");
  const user = JSON.parse(localStorage.getItem(role) || "{}");
  const code = user?.code || "";

  const profile = {
    name: user?.name || "Admin Name",
    email: user?.email || "admin@email.com",
    phone: user?.phone || "0594826328",
    role: role?.charAt(0).toUpperCase() + role?.slice(1) || "Administrator",
  };

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
        code,
        oldPassword: passwords.current,
        newPassword: passwords.newPassword,
      });

      alert(res.message);
      setPasswords({ current: "", newPassword: "", confirmPassword: "" });
      setShowPasswordModal(false);

      // Log out user automatically after password change
      logout(role);
      navigate("/login");
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-semibold text-gray-800">Settings</h1>

      {/* Profile Display */}
      <div className="bg-white p-6 rounded-2xl shadow border border-gray-200 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Profile</h2>

        <div className="space-y-3">
          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <p className="font-medium">Administrator</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-6 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
          >
            Change Password
          </button>

          <button
            onClick={() => {
              logout(role);
              navigate("/login");
            }}
            className="px-6 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-full max-w-md rounded-2xl shadow space-y-4">
            <h2 className="text-xl font-semibold">Change Password</h2>

            <div>
              <label className="text-gray-500 text-sm">Current Password</label>
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2"
              />
            </div>

            <div>
              <label className="text-gray-500 text-sm">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2"
              />
            </div>

            <div>
              <label className="text-gray-500 text-sm">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-2"
              />
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-6 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                onClick={handlePasswordSave}
                className="px-6 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
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
