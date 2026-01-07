import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  KeyRound,
  UserPlus,
  School,
  X,
  Menu,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import ChangePasswordModal from "../../modals/ChangePassword";
import { changePassword, logout } from "../../services/auth";

export default function Sidebar() {
  const navigate = useNavigate();
  const role = "admin";

  const [open, setOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

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
    { to: "/admin/feedbacks", label: "Feedbacks", icon: MessageCircle },
  ];

  const handleLogout = async () => {
    await logout(role);
    navigate("/login");
  };

  const handlePasswordSave = async () => {
    if (!passwords.current || !passwords.newPassword)
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
      await logout(role);
      navigate("/login");
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
      setShowPasswordModal(false);
    }
  };

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-xl bg-white shadow"
      >
        <Menu size={22} />
      </button>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50 h-full w-64 bg-white border-r
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h1 className="text-lg font-semibold tracking-tight">Admin Panel</h1>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* NAV */}
        <nav className="mt-4 space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `mx-3 flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition
                ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="absolute bottom-0 w-full border-t p-4">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 text-sm"
          >
            <KeyRound size={16} />
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 mt-1"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* MODAL */}
      <ChangePasswordModal
        open={showPasswordModal}
        loading={loading}
        passwords={passwords}
        onChange={(e) =>
          setPasswords((p) => ({ ...p, [e.target.name]: e.target.value }))
        }
        onClose={() => setShowPasswordModal(false)}
        onSave={handlePasswordSave}
      />
    </>
  );
}
