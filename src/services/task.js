import API from "./api";

// =============================
//   GENERATE AI QUESTIONS
// =============================
export const generateQuestions = async (data) => {
  try {
    const formData = new FormData();

    formData.append("yearGroup", data.yearGroup);
    formData.append("topic", data.topic);
    formData.append("subTopic", data.subTopic);
    formData.append("difficulty", data.difficulty);
    formData.append("numMCQ", data.numMCQ);
    formData.append("numFill", data.numFill);
    formData.append("source", data.source); // "uk-syllabus" or "lesson-note"

    if (data.lessonNoteFile) {
      formData.append("lessonNote", data.lessonNoteFile); // PDF file
    }

    const res = await API.post("/task/generate-question", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (err) {
    console.error("Error generating questions:", err);
    throw err.response?.data || err;
  }
};

// =============================
//     CREATE TASK (Teacher)
// =============================
export const createTask = async ({
  teacherId,
  topic,
  subTopic,
  introduction,
  difficulty,
  yearGroup,
  objectives,
  summary,
  questions,
}) => {
  try {
    const response = await API.post("/task/create-task", {
      teacherId,
      topic,
      subTopic,
      introduction,
      difficulty,
      yearGroup,
      objectives,
      summary,
      questions,
    });
    return response.data;
  } catch (error) {
    console.error("Create task error:", error);
    throw error.response?.data || error;
  }
};

// =============================
//   GET QUESTIONS FOR STUDENT
// =============================
export const getTeacherQuestions = async (teacherId) => {
  try {
    const response = await API.get(`/task/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error("Fetch task error:", error);
    throw error.response?.data || error;
  }
};

// =============================
//      DELETE A TASK
// =============================
export const deleteTask = async (taskId) => {
  try {
    const response = await API.delete(`/task/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Delete task error:", error);
    throw error.response?.data || error;
  }
};
