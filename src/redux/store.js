import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "./TaskApi";
import { studentApi } from "./StudentApi";
import { gradeApi } from "./GradeApi";
import { studentQuestionsApi } from "./studentQuestionsApi";
import { studentNotesApi } from "./StudentNoteApi";
import { requestApi } from "./SchoolRequestApi";
import { parentApi } from "./ParentApi";
import { teacherApi } from "./TeacherApi";
import { schoolApi } from "./SchoolApi";
import { reportApi } from "./WeeklyReport";

export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [gradeApi.reducerPath]: gradeApi.reducer,
    [studentQuestionsApi.reducerPath]: studentQuestionsApi.reducer,
    [studentNotesApi.reducerPath]: studentNotesApi.reducer,
    [requestApi.reducerPath]: requestApi.reducer,
    [parentApi.reducerPath]: parentApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [schoolApi.reducerPath]: schoolApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(taskApi.middleware)
      .concat(studentApi.middleware)
      .concat(gradeApi.middleware)
      .concat(studentQuestionsApi.middleware)
      .concat(studentNotesApi.middleware)
      .concat(requestApi.middleware)
      .concat(parentApi.middleware)
      .concat(teacherApi.middleware)
      .concat(schoolApi.middleware)
      .concat(reportApi.middleware),
});
