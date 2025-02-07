import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { persistReducer, persistStore, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
});

const filterTransform = createTransform(
  (inboundState) => {
    const { user, ...rest } = inboundState;
    return rest;
  },
  (outboundState) => outboundState,
  { whitelist: ["auth"] }
);

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  transforms: [filterTransform],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
