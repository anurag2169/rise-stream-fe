import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { RootState } from "../../store";
import { urlPath } from "@/app/config/url.const";

// action
export const registerUser = createAsyncThunk(
  "registerUser",
  async (formData: FormData, thunkAPI: any) => {
    const res = await fetch(`${urlPath.registerUser}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  }
);

interface UserState {
  status: "idle" | "loading" | "succeeded" | "failed";
  data: any;
  error: boolean;
}

const initialState: UserState = {
  status: "idle",
  data: null,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.status = "failed";
        state.error = true;
      });
  },
});
export const selectUserState = (state: RootState) => state.user;
export default userSlice.reducer;
