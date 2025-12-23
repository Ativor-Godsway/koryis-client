// TeacherDashboard.jsx
import { useState, useMemo } from "react";
import { StudentRow } from "./components/StudentRow";
import { FullPerformanceModal } from "./components/FullPerformanceModal";
import { SendNoteModal } from "./components/SendNoteModal";

/**
 * TeacherDashboard
 *
 * - Maps studentsFromTeacher -> StudentRow
 * - Opens SendNoteModal when Send Note clicked in a StudentRow
 * - Keeps a simple local "teacher notes" feature (persisted to localStorage)
 * - Supports FullPerformance modal (keeps your previous structure)
 */

export default function TeacherDashboard() {
  // Teacher + student list from localStorage
  const teacherInfo = JSON.parse(localStorage.getItem("teacher")) || {};
  const studentsFromTeacher = Array.isArray(teacherInfo?.students)
    ? teacherInfo.students
    : [];

  // best-effort teacherId detection (choose the first available id field)
  const teacherId =
    teacherInfo?._id || teacherInfo?.id || teacherInfo?.teacherId || null;

  // send note modal state
  const [sendNoteOpen, setSendNoteOpen] = useState(false);
  const [selectedReceiverId, setSelectedReceiverId] = useState(null);

  // Local UI state for the small teacher-notes feature (persisted locally)
  const [notes, setNotes] = useState(() => {
    try {
      const raw = localStorage.getItem("teacher_notes_v1");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [activeStudentForNotes, setActiveStudentForNotes] = useState(null);
  const [draftNote, setDraftNote] = useState("");

  // search + full perf modal
  const [search, setSearch] = useState("");
  const [fullPerfOpen, setFullPerfOpen] = useState(false);
  const [fullPerfData, setFullPerfData] = useState(null); // { studentId, data }

  // memoize filtered list
  const filteredStudents = useMemo(() => {
    if (!search) return studentsFromTeacher;
    const s = search.toLowerCase();
    return studentsFromTeacher.filter((id) =>
      String(id).toLowerCase().includes(s)
    );
  }, [studentsFromTeacher, search]);

  // persist local notes
  function persistNotes(next) {
    setNotes(next);
    try {
      localStorage.setItem("teacher_notes_v1", JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  }

  // Send note modal handlers
  function openSendNoteModal(studentId) {
    setSelectedReceiverId(studentId);
    setSendNoteOpen(true);
  }

  function closeSendNoteModal() {
    setSelectedReceiverId(null);
    setSendNoteOpen(false);
  }

  // Local notes modal handlers (keeps old behaviour)
  function openNotesModal(studentId) {
    setActiveStudentForNotes(studentId);
    setDraftNote(notes[studentId] || "");
    setIsNotesOpen(true);
  }

  function saveNote() {
    persistNotes({ ...notes, [activeStudentForNotes]: draftNote });
    setIsNotesOpen(false);
    setActiveStudentForNotes(null);
    setDraftNote("");
  }

  function closeNotesModal() {
    setIsNotesOpen(false);
    setActiveStudentForNotes(null);
    setDraftNote("");
  }

  function openChatModal(studentId) {
    // Placeholder — keep behaviour consistent with your original
    alert(`Chat with parent of ${studentId} — implement real chat UI`);
  }

  function openFullPerformance(studentId, data) {
    setFullPerfData({ studentId, data });
    setFullPerfOpen(true);
  }

  function closeFullPerformance() {
    setFullPerfOpen(false);
    setFullPerfData(null);
  }

  // quick guard when no students found
  if (!Array.isArray(studentsFromTeacher) || studentsFromTeacher.length === 0) {
    return (
      <div className="min-h-screen p-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold">Student Roster</h2>
          <p className="mt-4 text-sm text-gray-600">
            No students found on your teacher profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      {/* TOP: SendNoteModal (appears above everything) */}
      {sendNoteOpen && selectedReceiverId && (
        <SendNoteModal
          receiverId={selectedReceiverId}
          teacherId={teacherId}
          onClose={closeSendNoteModal}
        />
      )}

      <main className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold mb-4">
              Student Roster ({studentsFromTeacher.length})
            </h2>

            <div className="flex items-center gap-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student ID…"
                className="px-4 py-2 border rounded-lg w-64 shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="text-sm text-gray-600">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Numbers</th>
                  <th className="px-4 py-3">Geometry</th>
                  <th className="px-4 py-3">Algebra</th>
                  <th className="px-4 py-3">Probabilitiy</th>
                  <th className="px-4 py-3">Statistics</th>
                  <th className="px-4 py-3">Ratio</th>
                  <th className="px-4 py-3">GCSE</th>
                  <th className="px-4 py-3">Support Needed</th>
                  <th className="px-4 py-3 text-center">Student Notes</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((studentId) => (
                  <StudentRow
                    key={studentId}
                    studentId={studentId}
                    onOpenNotes={openNotesModal}
                    onOpenChat={openChatModal}
                    onOpenFull={openFullPerformance}
                    onSendNote={openSendNoteModal}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredStudents.length} of {studentsFromTeacher.length}{" "}
            students
          </div>
        </div>
      </main>

      {/* LOCAL NOTES MODAL (keeps your previous "local teacher notes" feature) */}
      {isNotesOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">
                Student Notes — {activeStudentForNotes}
              </h3>
            </div>

            <div className="p-6">
              <textarea
                value={draftNote}
                onChange={(e) => setDraftNote(e.target.value)}
                rows={6}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-200"
                placeholder="Write teacher notes, interventions, observations..."
              />

              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={closeNotesModal}
                  className="px-4 py-2 rounded-lg bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={saveNote}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>

              {notes[activeStudentForNotes] && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
                  <strong>Saved Note:</strong>
                  <p className="mt-2 whitespace-pre-wrap">
                    {notes[activeStudentForNotes]}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FULL PERFORMANCE MODAL */}
      {fullPerfOpen && fullPerfData && (
        <FullPerformanceModal
          studentId={fullPerfData.studentId}
          data={fullPerfData.data}
          onClose={closeFullPerformance}
        />
      )}
    </div>
  );
}
