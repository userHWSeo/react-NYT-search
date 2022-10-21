import { createSlice } from "@reduxjs/toolkit";

export const clipSlice = createSlice({
  name: "clipNews",
  initialState: [],
  reducers: {
    addClipNews: (state, { payload }) => {
      payload.toggle = !payload.toggle;
      return state.concat(payload);
    },
    deleteClipNews: (state, { payload }) => {
      const nextState = state.filter((el) => el.id !== payload.id);
      return nextState;
    },
  },
});

export const { addClipNews, deleteClipNews } = clipSlice.actions;
