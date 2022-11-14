import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

import accountInfoReducer from "../AccountInfo";
import questionInfoReducer from "../QuestionInfo";
import workbookInfoReducer from "../WorkbookInfo";
import contestInfoReducer from "../ContestInfo";

const persistConfig = {
  key: "root",
  version: 1,
  // storage: storage,  // local storage
  storage: storageSession, // session storage
};

const rootReducer = combineReducers({
  AccountInfo: accountInfoReducer,
  QuestionInfo: questionInfoReducer,
  WorkbookInfo: workbookInfoReducer,
  ContestInfo: contestInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // }).concat(logger),
    }),
});
export const persistor = persistStore(store);
export default store;
