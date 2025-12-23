import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  KeyRound,
  BookCheck,
  UserPlus,
  School,
} from "lucide-react";
import { useState } from "react";
import ChangePasswordModal from "../../modals/ChangePassword";
import { changePassword, logout } from "../../services/auth";

export default function Sidebar() {
  const navigate = useNavigate();
  const role = "admin";

  /* ---------- STATE ---------- */
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
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
        code: "A00000",
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
      setPasswords("");
    }
  };

  const handleLogout = async () => {
    await logout(role);
    navigate("/login");
  };

  /* ---------- LINKS ---------- */
  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/requests", label: "Requests", icon: FileText },
    { to: "/admin/create-teacher", label: "Create Teacher", icon: UserPlus },
    {
      to: "/admin/school-registration",
      label: "Register School",
      icon: School,
    },
    {
      to: "/admin/diagram-questions",
      label: "Diagram Questions",
      icon: BookCheck,
    },
  ];

  return (
    <>
      <aside className="w-64 bg-white border-r flex flex-col">
        {/* Header */}
        <div className="px-6 py-6 border-b">
          <h1 className="text-xl font-semibold tracking-tight">Admin Panel</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4 space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `mx-3 flex items-center gap-3 px-4 py-2.5 rounded-xl text-[15px] font-medium transition
                ${
                  isActive
                    ? "bg-black text-white shadow-sm"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}

        <div className="dropdown dropdown-top w-full border ">
          <div
            tabIndex={0}
            role="button"
            className="w-full flex   items-center gap-3 px-4 py-2.5 pb-10 rounded-xl text-[15px] font-medium hover:bg-neutral-100 transition"
          >
            {" "}
            <Settings size={18} />
            Settings
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 mb-3 rounded-2xl bg-white shadow-xl border p-2"
          >
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100"
            >
              <KeyRound size={16} />
              Change Password
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50"
            >
              <LogOut size={16} />
              Logout
            </button>
          </ul>
        </div>
      </aside>

      {/* MODAL */}
      <ChangePasswordModal
        open={showPasswordModal}
        loading={loading}
        passwords={passwords}
        onChange={handlePasswordChange}
        onClose={() => {
          setShowPasswordModal(false);
          setPasswords("");
        }}
        onSave={handlePasswordSave}
      />
    </>
  );
}
