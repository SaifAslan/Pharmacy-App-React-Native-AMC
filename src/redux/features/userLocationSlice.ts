import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserLocation } from "../../interfaces/userInfo";
import { RootState } from "../store";

const initialState: IUserLocation = {
  latitude: 0,
  longitude: 0,
};

export const userLocationSlice = createSlice({
  name: "userLocation",
  initialState,
  reducers: {
    saveUserLocation: (state, action: PayloadAction<IUserLocation>) => {
      return (state = action.payload);
    },
  },
});

export const { saveUserLocation } = userLocationSlice.actions;

export const userLocation = (state: RootState) => state.userLocation;

export default userLocationSlice.reducer;
