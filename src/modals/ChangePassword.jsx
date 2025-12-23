export default function ChangePasswordModal({
  open,
  loading,
  passwords,
  onChange,
  onClose,
  onSave,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-full max-w-md rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Change Password</h2>

        <input
          type="password"
          name="current"
          value={passwords.current}
          onChange={onChange}
          placeholder="Current password"
          className="input w-full"
        />

        <input
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={onChange}
          placeholder="New password"
          className="input w-full"
        />

        <input
          type="password"
          name="confirmPassword"
          value={passwords.confirmPassword}
          onChange={onChange}
          placeholder="Confirm password"
          className="input w-full"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
