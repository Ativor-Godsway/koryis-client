import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetStudentQuery } from "../../redux/StudentApi";
import { useGetTasksByTeacherQuery } from "../../redux/TaskApi";
import { formatTaskDate } from "../../utils/formatDate";
import { capitalizeFirstLetter } from "../../utils/capitalize";
import { useGetTasksByStudentQuery } from "../../redux/studentQuestionsApi";

export default function PreviousTasks() {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(12); // FIRST 12 TASKS

  const studentInfo = JSON.parse(localStorage.getItem("student"));
  const { data: student } = useGetStudentQuery(studentInfo?.code);

  const teacherId = student?.teacher;

  // Call teacher tasks ONLY if teacherId exists
  const {
    data: teacherTasksData,
    isLoading: teacherLoading,
    error: teacherError,
  } = useGetTasksByTeacherQuery(teacherId, {
    skip: !teacherId, // ❗ Skip when no teacherId
  });

  // Call student tasks ONLY if teacherId does NOT exist
  const {
    data: studentTasksData,
    isLoading: studentLoading,
    error: studentError,
  } = useGetTasksByStudentQuery(studentInfo?.code, {
    skip: !!teacherId, // ❗ Skip when teacherId exists
  });

  // Final tasks list
  const tasks = teacherId
    ? teacherTasksData?.tasks || []
    : studentTasksData?.tasks || [];

  // Only show the number of tasks allowed by visibleCount
  const visibleTasks = tasks.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10); // SHOW 10 MORE EACH TIME
  };

  if (teacherLoading || studentLoading) return <p>Loading tasks...</p>;
  if (teacherError || studentError) return <p>Error loading tasks</p>;

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
        {teacherId ? (
          <div className="bg-green-50 backdrop-blur-xl border border-green-200 shadow-xl rounded-3xl p-10 max-w-md w-full">
            <h1 className="text-2xl font-semibold text-green-900 mb-3">
              No Tasks Available
            </h1>

            <p className="text-green-900 mb-8 leading-relaxed">
              Your teacher hasn’t assigned any tasks yet. You can take a
              practice test to keep improving.
            </p>

            <button
              onClick={() => navigate("/student/student-questions")}
              className="w-full bg-green-500 text-white py-3 rounded-2xl text-lg font-medium 
                     shadow-md hover:shadow-xl hover:bg-green-600 
                     transition-all duration-200 active:scale-95"
            >
              Take Practice Test
            </button>
          </div>
        ) : (
          <div className="bg-green-50 backdrop-blur-xl border border-green-200 shadow-xl rounded-3xl p-10 max-w-md w-full">
            <h1 className="text-2xl font-semibold text-green-900 mb-3">
              No Tasks Available
            </h1>

            <p className="text-green-900 mb-8 leading-relaxed">
              You haven't taken any tasks yet. Click on "Start Task" to start
              your journey now .
            </p>

            <button
              onClick={() => navigate("/student/student-questions")}
              className="w-full bg-green-500 text-white py-3 rounded-2xl text-lg font-medium 
                     shadow-md hover:shadow-xl hover:bg-green-600 
                     transition-all duration-200 active:scale-95"
            >
              Start Task
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="py-5 px-2 md:px-10">
      <h1 className="text-3xl font-bold text-center mb-4">Previous Task</h1>
      <div className="grid grid-cols-2 gap-4 md:gap-8">
        {visibleTasks.map((task) => (
          <div
            key={task._id}
            className="bg-orange-50 border border-orange-200 shadow-md rounded-2xl p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-[#2B3A67]">
                {task.subTopic || "Topic"}
              </h2>
              <p className="text-md text-gray-600">
                {capitalizeFirstLetter(task.topic) || "Sub-topic"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Number of Questions:{" "}
                <span className="text-black">
                  {task.questions?.length || 0}
                </span>
              </p>
            </div>

            <div className="flex justify-between items-end">
              <button
                onClick={() => navigate(`../task/${task._id}`)}
                className="mt-2 w-fit bg-blue-100 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300 text-blue-900 font-semibold px-3 md:px-7 py-2 rounded-full shadow-md transition-all duration-500 border border-blue-400"
              >
                Review Task
              </button>

              <p className="text-gray-500 text-xs mt-2 text-right">
                {formatTaskDate(task.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* SHOW MORE BUTTON */}
      {visibleCount < tasks.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 text-sm font-semibold bg-blue-200 text-blue-900 rounded-full border border-blue-400 hover:bg-blue-300 transition-all"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}
