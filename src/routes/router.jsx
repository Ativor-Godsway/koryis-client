import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import HomePage from "../pages/HomePage";
import InstitutionalLicensingForm from "../pages/auth/SchoolRequest";

//Student Route Imports
import Student from "../pages/student/Student";
import StudentDashboard from "../pages/student/StudentDashboard";
import Profile from "../pages/student/Profile";
import Grades from "../pages/student/Grades";
import Badges from "../pages/student/Badges";
import Tasks from "../pages/student/Tasks";
import StudentRoute from "./StudentRoute";

//Teacher Route Imports
import TeacherRoute from "./TeacherRoute";
import Teacher from "../pages/teacher/Teacher";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import TeacherProfile from "../pages/teacher/TeacherProfile";
import AssignTask from "../pages/teacher/AssignTask";

//Parent Route Imports
import Parent from "../pages/parent/Parent";
import ParentDashboard from "../pages/parent/ParentDashboard";
import ParentProfile from "../pages/parent/ParentProfile";
import ParentRoute from "./ParentRoute";
import QuestionForm from "../pages/admin/QuestionForm";
import PreviousTasks from "../pages/student/PreviousTasks";
import TaskDetail from "../pages/student/TaskDetail";
import StudentQuestionsPage from "../pages/student/StudentQuestions";

//Admin Routes
import Admin from "../pages/admin/Admin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Settings from "../pages/admin/Settings";
import Requests from "../pages/admin/Requests";
import AdminRoute from "./AdminRoute";
import CreateNewTeacher from "../pages/admin/components/CreateNewTeacher";
import SchoolRegistration from "../pages/admin/SchoolRegistration";
import BillingSuccess from "../components/BillingSuccess";
import BillingCancel from "../components/BillingCancel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/school-request", element: <InstitutionalLicensingForm /> },
      { path: "/billing/success", element: <BillingSuccess /> },
      { path: "/billing/cancel", element: <BillingCancel /> },

      //Student Routes
      {
        path: "/student",
        element: (
          <StudentRoute>
            <Student />
          </StudentRoute>
        ),
        children: [
          { path: "dashboard", element: <StudentDashboard /> },
          { path: "profile", element: <Profile /> },
          { path: "tasks", element: <Tasks /> },
          { path: "previous-tasks", element: <PreviousTasks /> },
          { path: "grades", element: <Grades /> },
          { path: "badges", element: <Badges /> },
          { path: "student-questions", element: <StudentQuestionsPage /> },
          // ✅ Dynamic task route
          { path: "task/:taskId", element: <TaskDetail /> },
        ],
      },

      //Teacher Routes
      {
        path: "/teacher",
        element: (
          <TeacherRoute>
            <Teacher />
          </TeacherRoute>
        ),
        children: [
          { path: "dashboard", element: <TeacherDashboard /> },
          { path: "assign-task", element: <AssignTask /> },
          { path: "profile", element: <TeacherProfile /> },
          { path: "dashboard", element: <ParentDashboard /> },
        ],
      },

      //Student Routes
      {
        path: "/parent",
        element: (
          <ParentRoute>
            <Parent />
          </ParentRoute>
        ),
        children: [
          { path: "dashboard", element: <ParentDashboard /> },
          { path: "profile", element: <ParentProfile /> },
        ],
      },

      //Admin Routes
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "users", element: <Users /> },
          { path: "requests", element: <Requests /> },
          { path: "settings", element: <Settings /> },
          { path: "diagram-questions", element: <QuestionForm /> },
          { path: "create-teacher", element: <CreateNewTeacher /> },
          { path: "school-registration", element: <SchoolRegistration /> },
        ],
      },
    ],
  },

  { path: "*", element: <HomePage /> },
]);

export default router;
