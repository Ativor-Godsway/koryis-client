import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, changePassword } from "../../services/auth";
import ChangePasswordModal from "../../modals/ChangePassword";
import EditProfileModal from "../../modals/EditProfileModal";

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

export default function Profile() {
  const student = JSON.parse(localStorage.getItem("student"));
  const [user, setUser] = useState({
    name: student?.firstName + " " + student?.lastName,
    id: student?.code,
    grade: student?.yearGroup,
    email: student?.email || "",
    teacherCode: student?.teacher || "",
  });

  const role = "student"; // this is the student profile
  const code = user.id;

  const navigate = useNavigate();

  // Modals
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [editData, setEditData] = useState({
    yearGroup: user.grade,
    email: user.email,
    teacherCode: user.teacherCode,
  });

  const handleLogout = async () => {
    try {
      await logout(role);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // Password handlers
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

      logout(role);
      navigate("/login");
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  // Edit profile handlers
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    if (!editData.yearGroup || !editData.email || !editData.teacherCode) {
      alert("Please fill all fields!");
      return;
    }
    setUser((prev) => ({
      ...prev,
      grade: editData.yearGroup,
      email: editData.email,
      teacherCode: editData.teacherCode,
    }));
    // Save changes to localStorage
    const updatedStudent = {
      ...student,
      yearGroup: editData.yearGroup,
      email: editData.email,
      teacher: editData.teacherCode,
    };
    localStorage.setItem("student", JSON.stringify(updatedStudent));

    setShowEditModal(false);
    alert("Profile updated!");
  };

  return (
    <div className="p-6 space-y-8 bg-white min-h-[89vh] flex flex-col items-center">
      {/* Profile Header */}
      <h2 className="text-3xl font-bold text-[#2B3A67]">👤 Your Profile</h2>

      {/* Profile Info Card */}
      <div className="bg-[#E0F7FA] rounded-3xl p-6 shadow-lg w-full max-w-md flex flex-col items-center gap-4">
        <div className="w-24 h-24 bg-purple-200 rounded-full flex items-center justify-center text-2xl font-bold text-black">
          {user.name ? user.name.charAt(0) : "?"}
        </div>

        <div className="space-y-2 text-left w-full">
          <p className="text-lg font-semibold text-[#333]">
            Name: <span className="font-normal">{user.name || "John Doe"}</span>
          </p>
          <p className="text-lg font-semibold text-[#333]">
            ID: <span className="font-normal">{user.id || "P00000"}</span>
          </p>
          <p className="text-lg font-semibold text-[#333]">
            Grade:{" "}
            <span className="font-normal">{user.grade || "Year __"}</span>
          </p>
          <p className="text-lg font-semibold text-[#333]">
            Teacher Code:{" "}
            <span className="font-normal">{user.teacherCode || "T000"}</span>
          </p>
          <p className="text-lg font-semibold text-[#333]">
            Email: <span className="font-normal">{user.email}</span>
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-4 mt-6 w-full">
        <button
          onClick={() => setShowPasswordModal(true)}
          className="bg-black text-white py-2 hover:bg-gray-800 transition duration-300 rounded-3xl p-6 shadow-lg w-full max-w-md text-center"
        >
          Change Password
        </button>

        <button
          onClick={() => setShowEditModal(true)}
          className="bg-blue-800 text-white py-2 hover:bg-blue-700 transition duration-300 rounded-3xl p-6 shadow-lg w-full max-w-md text-center"
        >
          Edit Profile
        </button>

        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white py-2 hover:bg-blue-700 transition duration-300 rounded-3xl p-6 shadow-lg w-full max-w-md text-center"
        >
          Logout
        </button>
      </div>

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
