import API from "./api";

// Get student dashboard info (progress, badges, tasks summary)
export const getStudentDashboard = async (studentCode) => {
  try {
    const response = await API.get(`/students/${studentCode}/dashboard`);
    return response.data; // { name, tasksCompleted, badges, progress }
  } catch (error) {
    throw error.response?.data?.msg || "Failed to fetch dashboard";
  }
};

// Get all tasks/questions for a student
export const getStudentTasks = async (studentCode) => {
  try {
    const response = await API.get(`/students/${studentCode}/tasks`);
    return response.data; // array of questions
  } catch (error) {
    throw error.response?.data?.msg || "Failed to fetch tasks";
  }
};

// Submit task/quiz result
export const submitTaskResult = async (studentCode, taskId, answers) => {
  try {
    const response = await API.post(`/students/${studentCode}/submit-task`, {
      taskId,
      answers, // array of student answers
    });
    return response.data; // { score, progress, badgesUpdated }
  } catch (error) {
    throw error.response?.data?.msg || "Failed to submit task";
  }
};

// Get student profile
export const getStudentProfile = async (studentCode) => {
  try {
    const response = await API.get(`/students/${studentCode}/profile`);
    return response.data; // { name, age, grade, parent, tasksCompleted }
  } catch (error) {
    throw error.response?.data?.msg || "Failed to fetch profile";
  }
};
