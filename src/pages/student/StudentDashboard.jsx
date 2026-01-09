import { useNavigate } from "react-router-dom";
import { motivations } from "../../data/motivation";
import {
  HiMiniSpeakerWave,
  HiMiniSpeakerXMark,
  HiOutlineAcademicCap,
} from "react-icons/hi2";
import { playTTS, stopTTS } from "../../services/tts";
import { useGetStudentQuery } from "../../redux/StudentApi";
import { useState, useEffect } from "react";
import { useGetTasksByTeacherQuery } from "../../redux/TaskApi";
import codedQuestions from "../../data/questions";
import { useGetGradePerTaskQuery } from "../../redux/GradeApi";
import { useGetTasksByStudentQuery } from "../../redux/studentQuestionsApi";
import tips from "../../data/tips";
import { useGetNotesQuery } from "../../redux/StudentNoteApi";
import { formatTaskDate } from "../../utils/formatDate";
import WeeklyReport from "./components/WeeklyReport";

import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2"; // feedback icon
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);

  // ✅ Dynamic states
  const [name, setName] = useState("Student");
  const [motivationText, setMotivationText] = useState(
    "Your brain learns best in little steps! Keep going!"
  );

  const [dailyTip, setDailyTip] = useState(
    "Break your study time into small parts and take short breaks. Little steps lead to big progress!"
  );

  const [systemMessage, setSystemMessage] = useState(
    "You are doing great,keep it up. Continue to take more tests to improve your skill"
  );

  const studentInfo = JSON.parse(localStorage.getItem("student"));
  const studentId = studentInfo?.code;
  const teacherId = studentInfo?.teacher;

  const { data: student, isLoading, error } = useGetStudentQuery(studentId);

  // ✅ Call by teacher ONLY if teacherId exists
  const { data: teacherData } = useGetTasksByTeacherQuery(teacherId, {
    skip: !teacherId,
  });

  // ✅ Call by student ONLY if teacherId DOES NOT exist
  const { data: studentTasksData } = useGetTasksByStudentQuery(studentId, {
    skip: !!teacherId,
  });

  // ✅ Choose correct data source
  const tasks = teacherId
    ? teacherData?.tasks || []
    : studentTasksData?.tasks || [];

  const questionsData = tasks[1];
  const title = questionsData?.subTopic;
  const taskId = questionsData?._id;

  //Get Previous Grade
  const { data: gradeInfo } = useGetGradePerTaskQuery(
    { studentId, taskId },
    { skip: !taskId }
  );

  const score = gradeInfo?.data?.[0]?.score || 0;

  //Teacher's note
  const receiverId = studentId;
  const { data: note } = useGetNotesQuery(receiverId);
  const teacherNote = note ? note[0] : null;

  // ✅ Map percentage to 1-9 grade
  const getGrade = (score) => {
    if (score >= 90) return 9;
    if (score >= 80) return 8;
    if (score >= 70) return 7;
    if (score >= 60) return 6;
    if (score >= 50) return 5;
    if (score >= 40) return 4;
    if (score >= 30) return 3;
    if (score >= 20) return 2;
    return 0;
  };

  const getComment = (grade) => {
    switch (grade) {
      case 9:
        return "🎉 Outstanding! Excellent mastery of the topic!";
      case 8:
        return "👍 Very good! Almost perfect, keep going!";
      case 7:
        return "🙂 Good work! A bit more practice will get you higher.";
      case 6:
        return "⚠️ Satisfactory. Review key areas to improve.";
      case 5:
        return "⚠️ Needs improvement. Focus on the difficult parts.";
      case 4:
        return "⚠️ Below average. Extra support required.";
      case 3:
      case 2:
        return "⚠️ Poor performance. Intensive practice needed.";
      case 0:
        return "";
      default:
        return "";
    }
  };

  const grade = getGrade(score);
  const comment = getComment(grade);

  // Color mapping for 1-9
  const gradeColor = {
    9: "bg-purple-200 text-purple-700",
    8: "bg-indigo-200 text-indigo-700",
    7: "bg-blue-200 text-blue-700",
    6: "bg-green-200 text-green-700",
    5: "bg-yellow-200 text-yellow-700",
    4: "bg-orange-200 text-orange-700",
    3: "bg-red-200 text-red-600",
    2: "bg-red-300 text-red-700",
    1: "bg-red-400 text-red-800",
  };

  // ✅ Get a random motivation for today
  function getMotivationForToday() {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const today = new Date();
    const dayName = days[today.getDay()];
    const todayMotivations = motivations[dayName];
    const randomIndex = Math.floor(Math.random() * todayMotivations.length);
    return todayMotivations[randomIndex];
  }

  //Get Friday

  const [isFriday, setIsFriday] = useState(false);

  useEffect(() => {
    const checkDay = () => {
      setIsFriday(new Date().getDay() === 5);
    };

    checkDay();
    const interval = setInterval(checkDay, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Update states when student data is loaded
  useEffect(() => {
    if (student) {
      setName(student.firstName);
      setMotivationText(getMotivationForToday());
    } else {
      setName("Student");
      setMotivationText(getMotivationForToday());

      const g = getGrade(50);
    }
  }, [student]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setDailyTip(tips[randomIndex]);
  }, [student]);

  // ✅ Function to read all dashboard text
  // ✅ Function to read all dashboard text naturally
  const readDashboard = () => {
    stopTTS(setIsSpeaking); // Stop any previous speech

    // Build a friendly message using all the states
    const message = `
    Welcome back ${name}. ${motivationText}. Click on Start Today's Task to jump right into the task of the day.
    Your previous task was ${title}. You scored ${score} percent. ${comment}. You can click on the Review Task button to review your previous task.
    Today's learning tip is: ${dailyTip}.
    Message from your teacher  ${teacherMessage}.
    Click on proceed to start today's task.
  `;

    playTTS(message, setIsSpeaking);
  };

  return (
    <div
      id="dashboard-container"
      className="min-h-[89vh] bg-white p-3 md:p-4 flex flex-col space-y-8"
    >
      <div className="flex w-full justify-end gap-4">
        {/* Feedback Button */}
        <Link
          to="/feedback"
          className="
      flex items-center gap-3
      bg-[#E6F8F0]
      hover:bg-[#CCF0E0]
      border border-green-300
      text-[#1F4D37]
      font-semibold
      px-6 py-3
      rounded-2xl
      shadow-sm hover:shadow-md
      transition-all duration-300
    "
        >
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
            <HiOutlineChatBubbleLeftRight className="text-xl" />
          </div>

          <div className="flex flex-col text-left leading-tight">
            <span className="text-sm font-medium">Give Feedback</span>
            <span className="text-xs text-gray-600">
              Share your thoughts • Help us improve
            </span>
          </div>
        </Link>

        {/* Speak to IC */}
        <button
          className="
      flex items-center gap-3
      bg-[#E8F1FA]
      hover:bg-[#DCEAF7]
      border border-blue-300
      text-[#2B3A67]
      font-semibold
      px-6 py-3
      rounded-2xl
      shadow-sm hover:shadow-md
      transition-all duration-300
    "
        >
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <HiOutlineAcademicCap className="text-xl" />
          </div>

          <div className="flex flex-col text-left leading-tight">
            <span className="text-sm font-medium">Speak to IC</span>
            <span className="text-xs text-gray-600">
              Ask questions • Get help
            </span>
          </div>
        </button>
      </div>

      {isFriday ? (
        <WeeklyReport studentId={studentId} teacherId={teacherId} />
      ) : (
        <div className="bg-teal-50 border border-teal-100 p-8 rounded-3xl shadow-md text-center space-y-4">
          <h1 className="text-3xl font-bold text-[#2B3A67]">
            Welcome {!title || "Back"}, {name} 👋
          </h1>
          <p className="text-2xl text-[#333333] font-medium leading-relaxed max-w-2xl mx-auto">
            {motivationText}
          </p>
          {teacherId ? (
            <button
              onClick={() => {
                navigate("/student/tasks"); // Navigate to tasks
              }}
              className="mt-4 bg-blue-600 text-white hover:bg-blue-700 transition-all text-xl font-semibold py-3 px-8 rounded-2xl shadow-lg"
            >
              Start Today’s Task
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/student/student-questions"); // Navigate to tasks
              }}
              className="mt-4 bg-blue-600 text-white hover:bg-blue-700 transition-all text-xl font-semibold py-3 px-8 rounded-2xl shadow-lg"
            >
              Start Today’s Task
            </button>
          )}
        </div>
      )}

      {/* Previous Task & Daily Tip */}
      <div className="flex flex-col md:flex-row w-full justify-between gap-7">
        <div className="bg-orange-50 border border-orange-300 rounded-3xl shadow-md w-full md:w-[60%] p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              <span className="text-[#414141] font-light text-lg md:text-xl">
                Previous Task:{" "}
              </span>
              {title || "None"}
            </h2>
            {/* <span
              className={`px-4 py-2 rounded-full font-bold ${gradeColor[grade]}`}
            >
              Grade: {grade}
            </span> */}
          </div>
          <p className="text-gray-700 text-base">
            <span className="text-gray-600 text-sm font-medium mr-5">
              Score: {Math.round(score) || "-"}%
            </span>
            {comment || "No Comment"}
          </p>
          <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-4 rounded-full bg-blue-500 transition-all"
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <button
            onClick={() => {
              stopTTS(setIsSpeaking); // Stop any TTS
              navigate("/student/previous-tasks");
            }}
            className="mt-2 w-fit bg-blue-100 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300 text-blue-900 font-semibold px-7 py-2 rounded-full shadow-md transition-all duration-500 border border-blue-400"
          >
            Review Task
          </button>
        </div>

        {/* //Learning Tip */}
        <div className="bg-green-50 border border-green-200 p-6 rounded-3xl shadow-md w-full md:w-[35%] flex flex-col justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-[#2B3A67] mb-2 text-center">
              Learning Tip
            </h3>
            <p className="text-[#333333] text-xl leading-relaxed">{dailyTip}</p>
          </div>
          {teacherId && (
            <button
              onClick={() => navigate("/student/student-questions")}
              className="mt-2 w-fit bg-blue-100 hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300 text-blue-900 font-semibold px-7 py-2 rounded-full shadow-md transition-all duration-500 border border-blue-400"
            >
              Take Practice Test
            </button>
          )}
        </div>
      </div>

      {/* Teacher Message + TTS */}
      <div className="flex justify-between items-end">
        {/* System Message for private students
        {!teacherId && (
          <div className="flex justify-start items-end mb-4">
            <div className="bg-[#E0F7FA] p-6 rounded-3xl shadow-md min-w-[500px] max-w-max relative border border-blue-500">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold mr-3">
                  IC
                </div>
                <h3 className="text-lg font-semibold text-[#2B3A67]">
                  IC Team
                </h3>
              </div>
              <p className="text-[#2B3A67] text-base">{systemMessage}</p>
              <span className="text-gray-500 text-xs mt-2 block text-right"></span>
              <div className="absolute bottom-0 left-6 w-4 h-4 bg-[#E0F7FA] rotate-45 -mb-2 border-r border-b border-blue-500"></div>
            </div>
          </div>
        )} */}

        {/* System Message for private students */}
        {teacherId && teacherNote && (
          <div className="flex justify-start items-end mb-4">
            <div className="bg-[#E0F7FA] p-6 rounded-3xl shadow-md min-w-[500px] max-w-max relative border border-blue-500">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold mr-3">
                  T
                </div>
                <h3 className="text-lg font-semibold text-[#2B3A67]">
                  Teacher's Comment
                </h3>
              </div>
              <p className="text-[#2B3A67] text-base">{teacherNote?.note}</p>
              <span className="text-gray-500 text-xs mt-2 block text-right">
                {formatTaskDate(teacherNote?.createdAt)}
              </span>
              <div className="absolute bottom-0 left-6 w-4 h-4 bg-[#E0F7FA] rotate-45 -mb-2 border-r border-b border-blue-500"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
