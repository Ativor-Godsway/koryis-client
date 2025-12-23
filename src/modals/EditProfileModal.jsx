export default function EditProfileModal({
  open,
  editData,
  yearGroups,
  onChange,
  onClose,
  onSave,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-full max-w-md rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Edit Profile</h2>

        <select
          name="yearGroup"
          value={editData.yearGroup}
          onChange={onChange}
          className="select w-full"
        >
          <option value="">Select Year</option>
          {yearGroups.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>

        <input
          type="email"
          name="email"
          value={editData.email}
          onChange={onChange}
          placeholder="Email"
          className="input w-full"
        />

        <input
          type="text"
          name="teacherCode"
          value={editData.teacherCode}
          onChange={onChange}
          placeholder="Teacher Code"
          className="input w-full"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
