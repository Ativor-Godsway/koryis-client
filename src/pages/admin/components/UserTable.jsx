import React, { useEffect, useMemo, useState } from "react";

import {
  useGetStudentsQuery,
  useDeleteStudentMutation,
  useCreateStudentMutation,
} from "../../../redux/StudentApi";
import {
  useGetParentsQuery,
  useDeleteParentMutation,
} from "../../../redux/ParentApi";
import {
  useGetTeachersQuery,
  useDeleteTeacherMutation,
} from "../../../redux/TeacherApi";
import {
  useGetSchoolsQuery,
  useDeleteSchoolMutation,
} from "../../../redux/SchoolApi";

import { formatTaskDate } from "../../../utils/formatDate";
import { Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import CreateStudentForm from "./AddNewStudentForm";

export default function UniversalUserTable({
  type = "students",
  searchTerm = "",
}) {
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  // Delete confirmation modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null); // { id, label }

  //States for creating student for a teacher
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const openStudentModal = (teacher) => {
    setSelectedTeacher(teacher);
    setShowStudentModal(true);
  };

  const closeStudentModal = () => {
    setShowStudentModal(false);
    setSelectedTeacher(null);
  };

  //Create new student
  const [createStudent, { isLoading, isSuccess }] = useCreateStudentMutation();

  const handleCreateStudent = async (payload) => {
    try {
      await createStudent(payload).unwrap();
      setShowStudentModal(false);
    } catch (err) {
      console.error("Error creating student:", err);
    }
  };

  // -------------------------
  // Queries (with refetch handles)
  // -------------------------
  const {
    data: studentsList = [],
    refetch: refetchStudents,
    isFetching: loadingStudents,
  } = useGetStudentsQuery();

  const {
    data: parentsList = [],
    refetch: refetchParents,
    isFetching: loadingParents,
  } = useGetParentsQuery();
  const {
    data: teachersList = [],
    refetch: refetchTeachers,
    isFetching: loadingTeachers,
  } = useGetTeachersQuery();
  const {
    data: schoolsList = [],
    refetch: refetchSchools,
    isFetching: loadingSchools,
  } = useGetSchoolsQuery();

  // -------------------------
  // Mutations
  // -------------------------
  const [deleteStudent] = useDeleteStudentMutation();
  const [deleteParent] = useDeleteParentMutation();
  const [deleteTeacher] = useDeleteTeacherMutation();
  const [deleteSchool] = useDeleteSchoolMutation();

  // -------------------------
  // Force refetch when component mounts / revisited
  // -------------------------
  useEffect(() => {
    refetchStudents();
    refetchParents();
    refetchTeachers();
    refetchSchools();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------------------
  // Choose dataset based on 'type'
  // -------------------------
  const data = useMemo(() => {
    if (type === "students") return studentsList;
    if (type === "parents") return parentsList;
    if (type === "teachers") return teachersList;
    if (type === "schools") return schoolsList;
    return [];
  }, [type, studentsList, parentsList, teachersList, schoolsList]);

  // Reset page when type or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [type, searchTerm]);

  // -------------------------
  // Search filter
  // -------------------------
  const filteredData = data.filter((d) => {
    if (!d) return false;
    const term = searchTerm?.toLowerCase?.() || "";
    if (!term) return true;

    if (type === "schools") {
      return (
        (d.schoolName || "").toLowerCase().includes(term) ||
        (d.code || "").toLowerCase().includes(term)
      );
    }

    // For students/parents/teachers: try code and email (if present)
    return (
      (d.code || "").toLowerCase().includes(term) ||
      (d.email || "").toLowerCase().includes(term)
    );
  });

  // -------------------------
  // Pagination
  // -------------------------
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // -------------------------
  // Delete flow (open confirm modal)
  // -------------------------
  const openDeleteConfirm = (id, label) => {
    setToDelete({ id, label });
    setConfirmOpen(true);
  };

  const performDelete = async () => {
    if (!toDelete) return;
    const id = toDelete.id;

    try {
      if (type === "students") {
        await deleteStudent(id).unwrap();
        // refresh parents too in case they reference students
        await Promise.all([refetchStudents(), refetchParents()]);
      } else if (type === "parents") {
        await deleteParent(id).unwrap();
        await refetchParents();
      } else if (type === "teachers") {
        await deleteTeacher(id).unwrap();
        await Promise.all([
          refetchTeachers(),
          refetchStudents(),
          refetchParents(),
        ]);
      } else if (type === "schools") {
        await deleteSchool(id).unwrap();
        // deleting a school likely affects teachers, students, parents
        await Promise.all([
          refetchSchools(),
          refetchTeachers(),
          refetchStudents(),
          refetchParents(),
        ]);
      }

      setConfirmOpen(false);
      setToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------
  // Small helpers for rendering cells
  // -------------------------
  const renderLinkedCountDropdown = (items = []) => {
    const safeItems = Array.isArray(items) ? items : [];
    return (
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost px-3 py-1">
          {safeItems.length}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow rounded-box w-56 max-h-60 overflow-y-auto bg-white border"
        >
          {safeItems.length === 0 && (
            <li className="px-2 text-sm text-gray-500">None</li>
          )}
          {safeItems.map((s) => (
            <li key={s} className="px-2 py-1 text-sm">
              <span className="truncate block">{s}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // -------------------------
  // Table UI
  // -------------------------
  return (
    <div className="min-h-screen flex flex-col">
      <div className="overflow-x-auto bg-white rounded-2xl shadow p-4 flex-1 min-h-[70vh]">
        <table className="w-full border-separate" style={{ borderSpacing: 0 }}>
          <thead className="sticky top-0 z-20 bg-gray-100 border border-b-2 black">
            <tr className="text-left text-gray-700 border-b">
              {type === "students" && (
                <>
                  <th className="py-3 pl-2">ID</th>
                  <th>School</th>
                  <th>Teacher</th>
                  <th className="hidden lg:table-cell">Created At</th>
                  <th className="text-right pr-2">Actions</th>
                </>
              )}

              {type === "parents" && (
                <>
                  <th className="py-3 pl-2">ID</th>
                  <th>Email</th>
                  <th>Linked Students</th>
                  <th className="hidden lg:table-cell">Created At</th>
                  <th className="text-right pr-2">Actions</th>
                </>
              )}

              {type === "teachers" && (
                <>
                  <th className="py-3 pl-2">ID</th>
                  <th>Email</th>
                  <th>Students</th>
                  <th>School</th>
                  <th className="hidden lg:table-cell">Created At</th>
                  <th className="text-right pr-2">Actions</th>
                </>
              )}

              {type === "schools" && (
                <>
                  <th className="py-3 pl-2">ID</th>
                  <th>Name</th>
                  <th>Teachers</th>
                  <th>Students</th>
                  <th className="hidden lg:table-cell">Created At</th>
                  <th className="text-right pr-2">Actions</th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  {loadingStudents ||
                  loadingParents ||
                  loadingTeachers ||
                  loadingSchools
                    ? "Loading..."
                    : "No records found"}
                </td>
              </tr>
            ) : (
              paginatedData.map((d, idx) => {
                const rowBg = idx % 2 === 0 ? "bg-white" : "bg-gray-50";
                const key = d?.code ?? d?.id ?? idx;

                return (
                  <tr
                    key={key}
                    className={`${rowBg} hover:bg-gray-100 transition-colors border-b last:border-none`}
                  >
                    {/* STUDENTS */}
                    {type === "students" && (
                      <>
                        <td className="py-3 pl-2 align-middle">{d.code}</td>
                        <td className="align-middle">
                          {d.school || "Independent"}
                        </td>
                        <td className="align-middle">{d.teacher || "None"}</td>
                        <td className="hidden lg:table-cell align-middle">
                          {formatTaskDate(d.createdAt)}
                        </td>
                        <td className="text-right pr-2 align-middle">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="btn btn-ghost btn-sm text-red-500"
                              title="Delete"
                              onClick={() => openDeleteConfirm(d.code, d.code)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}

                    {/* PARENTS */}
                    {type === "parents" && (
                      <>
                        <td className="py-3 pl-2 align-middle">{d.code}</td>
                        <td className="align-middle">{d.email}</td>
                        <td className="align-middle">
                          {renderLinkedCountDropdown(d.students || [])}
                        </td>
                        <td className="hidden lg:table-cell align-middle">
                          {formatTaskDate(d.createdAt)}
                        </td>
                        <td className="text-right pr-2 align-middle">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="btn btn-ghost btn-sm text-red-500"
                              title="Delete"
                              onClick={() =>
                                openDeleteConfirm(d.code, d.email || d.code)
                              }
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}

                    {/* TEACHERS */}
                    {type === "teachers" && (
                      <>
                        <td className="py-3 pl-2 align-middle">{d.code}</td>
                        <td className="align-middle">{d.email}</td>
                        <td className="align-middle">
                          {renderLinkedCountDropdown(d.students || [])}
                        </td>
                        <td className="align-middle">{d.school}</td>
                        <td className="hidden lg:table-cell align-middle">
                          {formatTaskDate(d.createdAt)}
                        </td>
                        <td className="text-right pr-2 align-middle">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="btn btn-ghost btn-sm text-green-600"
                              title="Add Student"
                              onClick={() =>
                                openStudentModal({
                                  code: d.code,
                                  school: d.school,
                                  email: d.email,
                                })
                              }
                            >
                              +
                            </button>

                            <button
                              className="btn btn-ghost btn-sm text-red-500"
                              title="Delete"
                              onClick={() => openDeleteConfirm(d.code, d.code)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}

                    {/* SCHOOLS */}
                    {type === "schools" && (
                      <>
                        <td className="py-3 pl-2 align-middle">{d.code}</td>
                        <td className="align-middle">{d.schoolName}</td>
                        <td className="align-middle">
                          {renderLinkedCountDropdown(d.teachers || [])}
                        </td>
                        <td className="align-middle">
                          {renderLinkedCountDropdown(d.students || [])}
                        </td>
                        <td className="hidden lg:table-cell align-middle">
                          {formatTaskDate(d.createdAt)}
                        </td>
                        <td className="text-right pr-2 align-middle">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="btn btn-ghost btn-sm text-red-500"
                              title="Delete"
                              onClick={() =>
                                openDeleteConfirm(
                                  d.code,
                                  d.schoolName || d.code
                                )
                              }
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white rounded-b-2xl mt-3">
        <div className="text-sm text-gray-500 ">
          Showing {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
          {filteredData.length}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="btn btn-ghost btn-sm"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Page numbers (show up to 7) */}
          <div className="hidden sm:flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              // show nearby pages and first/last
              const page = i + 1;
              const show =
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2);
              if (!show) {
                if (page === 2 && currentPage > 4)
                  return <span key={page}>...</span>;
                if (page === totalPages - 1 && currentPage < totalPages - 3)
                  return <span key={page}>...</span>;
                return null;
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`btn btn-sm btn-ghost ${
                    currentPage === page ? "bg-black text-white px-3" : ""
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="btn btn-ghost btn-sm"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal (daisyUI modal) */}
      <input
        type="checkbox"
        id="delete-confirm-modal"
        className="modal-toggle"
        checked={confirmOpen}
        readOnly
      />
      <div className={`modal ${confirmOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Trash2 size={18} /> Confirm Delete
          </h3>
          <p className="py-4 text-gray-600">
            Are you sure you want to delete <strong>{toDelete?.label}</strong>?
            This action cannot be undone.
          </p>
          <div className="modal-action">
            <button
              className="border border-black  px-3 rounded-full hover:text-[#898989] "
              onClick={() => {
                setConfirmOpen(false);
                setToDelete(null);
              }}
            >
              Cancel
            </button>
            <button
              className="  bg-red-600 text-white px-3 rounded-full hover:bg-red-700"
              onClick={performDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showStudentModal && (
        <CreateStudentForm
          onSubmitSuccess={handleCreateStudent}
          teacherCode={selectedTeacher.code}
          schoolCode={selectedTeacher.school}
          onClose={closeStudentModal}
        />
      )}
    </div>
  );
}
