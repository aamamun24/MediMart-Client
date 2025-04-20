import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import cartReducer from './features/cart/cartSlice';
import medicineReducer from './features/medicine/medicineSlice';
import authReducer from './features/auth/authSlice';
import { baseApi } from './api/baseApi';

// Persist configs
const authPersistConfig = {
  key: 'auth',
  storage,
};

const cartPersistConfig = {
  key: 'cart',
  storage,
};

const medicinePersistConfig = {
  key: 'medicines',
  storage,
};

// Persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedMedicineReducer = persistReducer(medicinePersistConfig, medicineReducer);

// Configure store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    medicines: persistedMedicineReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;