import {
    configureStore,
    combineReducers,
    getDefaultMiddleware,
  } from "@reduxjs/toolkit";
  import { persistReducer } from "redux-persist";
  import storage from "redux-persist/lib/storage";
  import { clipSlice } from "./slice/clipSlice"

  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
  
  const reducer = combineReducers({
    clip: clipSlice.reducer,
  });
  
  const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  });