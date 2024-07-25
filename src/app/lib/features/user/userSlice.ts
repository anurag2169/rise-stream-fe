import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { RootState } from "../../store";
import { urlPath } from "@/app/config/url.const";
import Cookies from "js-cookie";
import { getUserDataFromLocalStorage } from "../../localstorageUtils";

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

// Login user action
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData: { email: string; password: string }, thunkAPI: any) => {
    const res = await fetch(`${urlPath.signInUser}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (accessToken: String) => {
    const res = await fetch(urlPath.signOutUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("userData");
    return res.json();
  }
);

interface UserState {
  status: "idle" | "loading" | "succeeded" | "failed" | "logoutSuccess";
  data: any;
  error: boolean;
}

// const userData = localStorage.getItem("userData") || "";
// const userData = localStorage.getItem("userData");
const initialState: UserState = {
  status: "idle",
  data: getUserDataFromLocalStorage() || {},
  // data: userData ? JSON.parse(userData) : {},
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
      })
      // Login user cases
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        localStorage.setItem("userData", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Error", action.error.message);
        state.status = "failed";
        state.error = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "logoutSuccess";
        state.data = null;
      });
  },
});
export const selectUserState = (state: RootState) => state.user;
export default userSlice.reducer;
