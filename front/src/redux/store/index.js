// import { createStore } from 'redux';  // 리액트 18이 나오면서 리덕스가 권장사항이 아니게 되어 취소선이 뜨지만 기능상 문제없음.
// import reducers from './reducers';

// const store = createStore(reducers);
// export default store;

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

import userInfoReducer from "../UserInfo";
import questionInfoReducer from "../QuestionInfo";
// import channelListReducer from "../ChannelList";
// import mapListReducer from "../MapList";
// import pinListReducer from "../PinList";
// import textListReducer from "../TextList";

const persistConfig = {
  key: "root",
  version: 1,
  // storage: storage,  // local storage
  storage: storageSession, // session storage
};

const rootReducer = combineReducers({
  UserInfo: userInfoReducer,
  QuestionInfo: questionInfoReducer,
  // ChannelList: channelListReducer,
  // MapList: mapListReducer,
  // PinList: pinListReducer,
  // TextList: textListReducer,
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
