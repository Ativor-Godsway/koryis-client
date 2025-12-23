import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";

const SideBar = () => {
  const navigate = useNavigate();

  const storedTeacher = JSON.parse(localStorage.getItem("teacher"));
  const user = {
    name: storedTeacher?.name || storedTeacher?.email,
    code: storedTeacher?.code || "P12345",
    email: storedTeacher?.email || "email@example.com",
    school: storedTeacher?.school || "None",
  };

  const role = "teacher";

  /* ---------- MODAL STATE ---------- */
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
        code: user.code,
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
    <div className=" w-64 h-screen bg-gray-200 p-2 mr-3 ">
      <nav className="flex flex-col justify-between h-full pb-10">
        <div>
          <NavLink
            to="/teacher/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-1 p-3 rounded-lg hover:bg-[#202020] hover:text-white ${
                isActive ? "bg-black text-white" : ""
              }`
            }
          >
            <AiOutlineHome className="size-7" />
            <h2> Dashboard</h2>
          </NavLink>

          <NavLink
            to="/teacher/chat"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-[#202020] hover:text-white ${
                isActive ? "bg-black text-white" : ""
              }`
            }
          >
            <IoChatbubbleEllipsesOutline className="size-7" />
            <h2> Chat</h2>
          </NavLink>

          <NavLink
            to="/teacher/chat"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-[#202020] hover:text-white ${
                isActive ? "bg-black text-white" : ""
              }`
            }
          >
            <IoChatbubbleEllipsesOutline className="size-7" />
            <h2> Another</h2>
          </NavLink>
        </div>
        <NavLink
          to="/teacher/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg hover:bg-[#202020] hover:text-white ${
              isActive ? "bg-black text-white" : ""
            }`
          }
        >
          <RxAvatar className="size-7" />
          <h2> Profile</h2>
        </NavLink>
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
};

export default SideBar;
