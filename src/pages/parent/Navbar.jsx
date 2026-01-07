import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaTasks } from "react-icons/fa";
import { MdGrade } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import ChangePasswordModal from "../../modals/ChangePassword";
import EditProfileModal from "../../modals/EditProfileModal";
import { changePassword, logout } from "../../services/auth";
import { formatTaskDate } from "../../utils/formatDate";
import { LogOut, KeyRound, MessageSquare } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const storedParent = JSON.parse(localStorage.getItem("parent"));
  const user = {
    name: storedParent?.parentName || storedParent?.email,
    code: storedParent?.code || "P12345",
    email: storedParent?.email || "email@example.com",
    school: storedParent?.school || "None",
    teacher: storedParent?.teacher || "None",
  };

  const role = "parent";

  /* ---------- MODAL STATE ---------- */
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------- PASSWORD STATE ---------- */
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

  /* ---------- HANDLERS ---------- */
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((p) => ({ ...p, [name]: value }));
  };

  const handlePasswordSave = async () => {
    if (
      !passwords.current ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    )
      return alert("Fill all fields");

    if (passwords.newPassword !== passwords.confirmPassword)
      return alert("Passwords do not match");

    setLoading(true);
    try {
      await changePassword({
        code: user.id,
        oldPassword: passwords.current,
        newPassword: passwords.newPassword,
      });

      alert("Password changed successfully");
      await logout(role);
      navigate("/login");
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
      setShowPasswordModal(false);
    }
  };

  const handleLogout = async () => {
    await logout(role);
    navigate("/login");
  };

  return (
    <div className="sticky top-0  z-50">
      <nav className="w-full bg-blue-50 border border-blue-300 shadow-sm px-6 py-4 flex items-center justify-between rounded-3xl mb-3">
        {/* Left tabs (first two) */}

        <Link to={"/parent/dashboard"}>
          <h1 className="text-xl font-bold text-gray-800">Parent Dashboard</h1>
        </Link>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-2 px-4 py-2 rounded-full  hover:bg-gray-200 transition"
          >
            <IoPersonSharp className="text-xl" />
            <span className="font-medium">Profile</span>
          </div>

          <div
            tabIndex={0}
            className="dropdown-content mt-3 w-80 rounded-3xl bg-white shadow-xl border border-gray-100 p-4"
          >
            {/* Profile header */}
            <div className="flex items-center gap-4 border-b pb-4">
              <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">
                {user.name?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user.name}</p>

                <p className="text-gray-500 text-sm mt-1">
                  Joined:{" "}
                  <span className="text-gray-500">
                    {formatTaskDate(storedParent.createdAt)}
                  </span>
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="py-4 space-y-1 text-sm text-gray-700">
              <p>
                <b>ID:</b> {user.code}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>School:</b> {user.school}
              </p>
              <p>
                <b>Teacher:</b> {user.teacher || "—"}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100"
              >
                <KeyRound size={16} />
                Change Password
              </button>
              <Link
                to={"/feedback"}
                className="w-full flex  items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100"
              >
                <MessageSquare size={16} />
                Feedback
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MODALS */}
      <ChangePasswordModal
        open={showPasswordModal}
        loading={loading}
        passwords={passwords}
        onChange={handlePasswordChange}
        onClose={() => setShowPasswordModal(false)}
        onSave={handlePasswordSave}
      />
    </div>
  );
}
