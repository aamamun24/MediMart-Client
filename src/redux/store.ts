// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./features/cartSlice";
// import storage from "redux-persist/lib/storage";
// import { baseApi } from "./api/baseApi";
// import {
//   FLUSH,
//   PAUSE,
//   PERSIST,
//   persistReducer,
//   persistStore,
//   PURGE,
//   REGISTER,
//   REHYDRATE,
// } from "redux-persist";

// const persistConfig = {
//   key: "cart",
//   storage,
// };

// const persistCartReducer = persistReducer(persistConfig, cartReducer);

// export const store = configureStore({
//   reducer: {
//     cart: persistCartReducer,
//     [baseApi.reducerPath]: baseApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(baseApi.middleware),
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
import { configureStore } from '@reduxjs/toolkit'

import authReducer from './features/auth/authSlice'
import { baseApi } from './api/baseApi'
import {persistStore, persistReducer,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from "redux-persist" ;
import storage from 'redux-persist/lib/storage'

const persistConfig ={
    key:'auth',
    storage,
}

const persistAuthReducer =persistReducer(persistConfig,authReducer)


export const store = configureStore({
  reducer:{
    [baseApi.reducerPath] : baseApi.reducer,
    auth:persistAuthReducer,

},
middleware : getDefaultMiddlewares => getDefaultMiddlewares({
  serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
}).concat(baseApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
