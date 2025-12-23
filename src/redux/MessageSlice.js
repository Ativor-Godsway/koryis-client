import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTeacherId: null,
  activeParentId: null,
  activeStudentId: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setActiveChat: (state, action) => {
      const { parentId, teacherId, studentId } = action.payload;

      state.activeParentId = parentId;
      state.activeTeacherId = teacherId;
      state.activeStudentId = studentId;
    },

    clearActiveChat: (state) => {
      state.activeParentId = null;
      state.activeTeacherId = null;
      state.activeStudentId = null;
    },
  },
});

export const { setActiveChat, clearActiveChat } = messageSlice.actions;
export default messageSlice.reducer;
