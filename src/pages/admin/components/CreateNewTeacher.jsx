import { useState } from "react";
import { useAddTeacherMutation } from "../../../redux/TeacherApi";

export default function CreateNewTeacher() {
  const [addTeacher, { isLoading }] = useAddTeacherMutation();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    yearGroup: "",
    school: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTeacher(form).unwrap();
      alert("Teacher created successfully");

      setForm({
        fullName: "",
        email: "",
        password: "",
        yearGroup: "",
        school: "",
      });
    } catch (err) {
      alert(err?.data?.message || "Failed to create teacher");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl bg-gray-50 p-6 rounded-2xl shadow-lg space-y-4 mx-auto"
    >
      <h2 className="text-xl font-semibold">Create Teacher</h2>

      <input
        className="input"
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        required
      />

      <input
        className="input"
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        className="input"
        name="password"
        type="password"
        placeholder="Temporary Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <select
        className="select"
        name="yearGroup"
        value={form.yearGroup}
        onChange={handleChange}
      >
        <option value="">Select Year Group</option>
        {[...Array(13)].map((_, i) => (
          <option key={i + 1} value={`Year ${i + 1}`}>
            Year {i + 1}
          </option>
        ))}
      </select>

      <input
        className="input"
        name="school"
        placeholder="School ID"
        value={form.school}
        onChange={handleChange}
      />

      <button
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
      >
        {isLoading ? "Creating..." : "Create Teacher"}
      </button>
    </form>
  );
}
