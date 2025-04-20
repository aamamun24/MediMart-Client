import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import medicineReducer from "./features/medicine/medicineSlice"; // ✅ Import medicine reducer
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

// Persist config for cart
const persistConfig = {
  key: "cart",
  storage,
};

const persistCartReducer = persistReducer(persistConfig, cartReducer);

// ✅ Configure store
export const store = configureStore({
  reducer: {
    cart: persistCartReducer,                 // Persisted cart
    medicines: medicineReducer,              // ✅ Registered medicine slice
    [baseApi.reducerPath]: baseApi.reducer,  // RTK Query base API
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware), // Add baseApi middleware
});

// ✅ Persistor for redux-persist
export const persistor = persistStore(store);

// ✅ Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
