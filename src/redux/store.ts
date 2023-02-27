import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import thunk from "redux-thunk";
import userInfoReducer from "./features/userInfoSlice";

const reducer = combineReducers({
  userInfo: userInfoReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userInfo"],
};

const persistor = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistor,
  middleware: [thunk]
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
