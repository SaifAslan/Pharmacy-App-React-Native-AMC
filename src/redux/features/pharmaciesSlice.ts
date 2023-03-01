import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPharmacy } from "../../interfaces/pharmacy";
import { RootState } from "../store";

const initialState: IPharmacy[] = [];

export const pharmaciesSlice = createSlice({
  name: "pharmacies",
  initialState,
  reducers: {
    savePharmacies: (state, action: PayloadAction<IPharmacy[]>) => {
     return state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { savePharmacies } = pharmaciesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const pharmacies = (state: RootState) => state.pharmacies;

export default pharmaciesSlice.reducer;
