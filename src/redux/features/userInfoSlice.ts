import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserInfo } from "../../interfaces/userInfo";
import { RootState } from "../store";

const initialState: IUserInfo = {
  name: "",
  email: "",
  phone: "",
  accessToken: "",
  surname: "",
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUserInfo>) => {
     return state = action.payload;
    },
    logout: (state) => {
      //@ts-ignore
     return state = this.initialState;
    },
    addEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, addEmail } = userInfoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const userInfo = (state: RootState) => state.userInfo;

export default userInfoSlice.reducer;
