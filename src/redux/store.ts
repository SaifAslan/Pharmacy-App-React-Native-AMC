import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import pharmaciesReducer from "./features/pharmaciesSlice";
import userInfoReducer from "./features/userInfoSlice";
import userLocationReducer from "./features/userLocationSlice";

const reducer = combineReducers({
  userInfo: userInfoReducer,
  pharmacies: pharmaciesReducer,
  userLocation: userLocationReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userInfo", "pharmacies", "userLocation"],
};

const persistor = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistor,
  middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
