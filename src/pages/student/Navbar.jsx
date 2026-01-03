import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaTasks } from "react-icons/fa";
import { MdGrade } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import ChangePasswordModal from "../../modals/ChangePassword";
import EditProfileModal from "../../modals/EditProfileModal";
import { changePassword, logout } from "../../services/auth";
import { useUpdateStudentMutation } from "../../redux/StudentApi";
import { LogOut, KeyRound, UserPen } from "lucide-react";
import SubscribeButton from "../../components/SubscribeButton";

const YEAR_GROUPS = [
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11",
  "Year 12",
  "Year 13",
];

export default function Navbar() {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem("student"));

  const [user, setUser] = useState({
    name: `${student?.firstName} ${student?.lastName}`,
    id: student?.code,
    grade: student?.yearGroup,
    email: student?.email || "",
    teacherCode: student?.teacher || "",
  });

  const teacher = student?.teacher;
  const role = "student";

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

  /* ---------- EDIT STATE ---------- */
  const [editData, setEditData] = useState({
    yearGroup: user.grade,
    email: user.email,
    teacherCode: user.teacherCode,
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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((p) => ({ ...p, [name]: value }));
  };

  const [updateStudent, { isLoading: updating }] = useUpdateStudentMutation();

  const handleEditSave = async () => {
    try {
      await updateStudent({
        code: user.id,
        yearGroup: editData.yearGroup,
        email: editData.email,
        teacherCode: editData.teacherCode,
      }).unwrap();

      const updatedStudent = {
        ...student,
        yearGroup: editData.yearGroup,
        email: editData.email,
        teacher: editData.teacherCode,
      };

      localStorage.setItem("student", JSON.stringify(updatedStudent));

      setUser((u) => ({
        ...u,
        grade: editData.yearGroup,
        email: editData.email,
        teacherCode: editData.teacherCode,
      }));

      setShowEditModal(false);
      alert("Profile updated");
    } catch (err) {
      alert(err?.data?.message || "Update failed");
    }
  };

  const handleLogout = async () => {
    await logout(role);
    navigate("/login");
  };

  const tabs = [
    {
      name: "Home",
      path: "/student/dashboard",
      icon: <FaHome className="mr-2 text-xl md:text-2xl" />,
    },
    {
      name: "Tasks",
      // If teacher exists → use normal tasks page
      // If NO teacher → send to student-questions route
      path: teacher ? "/student/tasks" : "/student/student-questions",
      icon: <FaTasks className="mr-2 text-xl md:text-2xl" />,
    },
    {
      name: "Grades",
      path: "/student/grades",
      icon: <MdGrade className="mr-2 text-xl md:text-2xl" />,
    },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="flex items-center justify-between px-2 md:px-6 py-4">
        {/* Left tabs (first two) */}
        <div className="flex items-center gap-3">
          {tabs.slice(0, 2).map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.path}
              className={({ isActive }) =>
                `flex ${
                  tab.name === "Tasks" && "hidden md:flex"
                } items-center gap-1 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full text-lg font-medium
             transition-all duration-300
             ${
               isActive
                 ? "bg-blue-500 text-white shadow-lg"
                 : "bg-blue-100 text-blue-700 hover:bg-blue-200"
             }`
              }
            >
              {tab.icon}
              {tab.name}
            </NavLink>
          ))}
        </div>

        {/* Right tabs (rest) */}
        <div className="flex items-center gap-3">
          {tabs.slice(2).map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.path}
              className={({ isActive }) =>
                `flex ${
                  tab.name === "Grades" && "hidden md:flex"
                }  items-center gap-1 px-3 md:px-5 py-2 rounded-full
           text-base font-medium transition-all duration-300 border border-blue-50
           ${
             isActive
               ? "bg-blue-200 shadow-lg text-black "
               : "text-black hover:bg-blue-100 hover:shadow-sm"
           }`
              }
            >
              {tab.icon}
              {tab.name}
            </NavLink>
          ))}

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <IoPersonSharp className="text-xl hidden md:flex" />
              <IoMdMenu className="text-xl flex md:hidden" />
              <span className="font-medium hidden md:flex">Profile</span>
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
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* Info */}
              <div className="py-4 space-y-1 text-sm text-gray-700">
                <p>
                  <b>ID:</b> {user.id}
                </p>
                <p>
                  <b>Grade:</b> {user.grade}
                </p>
                <p>
                  <b>Teacher:</b> {user.teacherCode || "—"}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Link
                  to={"/student/tasks"}
                  className="w-full md:hidden flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 "
                >
                  <FaTasks size={16} />
                  Tasks
                </Link>
                <Link
                  to={"/student/grades"}
                  className="w-full md:hidden flex  items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100"
                >
                  <MdGrade size={16} />
                  Grades
                </Link>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100"
                >
                  <UserPen size={16} />
                  Edit Profile
                </button>
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

                <SubscribeButton />
              </div>
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

      <EditProfileModal
        open={showEditModal}
        editData={editData}
        yearGroups={YEAR_GROUPS}
        onChange={handleEditChange}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditSave}
      />
    </div>
  );
}
