import { useState } from "react";
import {
  useGetNotesByTeacherQuery,
  useSendNoteToStudentMutation,
} from "../../../redux/StudentNoteApi";
import { formatTaskDate } from "../../../utils/formatDate";

export const SendNoteModal = ({ receiverId, teacherId, onClose }) => {
  const [note, setNote] = useState("");

  const { data } = useGetNotesByTeacherQuery(teacherId);

  const studentMsg = data?.filter((msg) => msg.receiverId == receiverId);

  const [sendNote, { isLoading, error, isSuccess }] =
    useSendNoteToStudentMutation();

  const handleSubmit = async () => {
    try {
      await sendNote({
        teacherId,
        receiverId,
        note,
      }).unwrap();

      setNote("");

      onClose();
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/40 flex items-start justify-center p-6">
      <div className="bg-white mt-12 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Send Note to — {receiverId}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <textarea
            rows={6}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
            placeholder="Write your message ..."
          />

          {error && (
            <p className="text-red-500 text-sm font-medium">
              Failed to send note
            </p>
          )}

          {isSuccess && (
            <p className="text-green-600 text-sm font-medium">
              Note sent successfully ✅
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`px-6 py-2 rounded-xl text-white transition ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Sending..." : "Send Note"}
          </button>
        </div>

        {/* Previous Messages
        <div className="p-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Previous Messages
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {studentMsg?.map((msg) => (
              <div>
                <p
                  key={msg.id}
                  className="bg-gray-100 rounded-lg p-3 text-gray-800 text-sm shadow-sm"
                >
                  {msg?.note}
                  <p className="text-gray-500 text-xs mt-2 text-right">
                    {formatTaskDate(msg?.createdAt)}
                  </p>
                </p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};
