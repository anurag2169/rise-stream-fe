import { createSlice, nanoid } from "@reduxjs/toolkit";

interface videoState {}

const initialState: videoState = {};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
});

export default videoSlice.reducer;
