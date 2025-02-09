import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "@redux/slices/authSlice";
import bgRemoverReducer from "@redux/slices/bgRemoverSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  bgRemover: bgRemoverReducer,
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
  blacklist: ["bgRemover"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
