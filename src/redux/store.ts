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
import orderReducer from './features/order/orderSlice';
import medicineReducer from './features/medicine/medicineSlice';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice'; // 👈 import your new userSlice
import { baseApi } from './api/baseApi';


// Persist configs
const authPersistConfig = {
  key: 'auth',
  storage,
};

const ordersPersistConfig = {
  key: 'orders',
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

const userPersistConfig = {
  key: 'user',
  storage,
};

// Persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedMedicineReducer = persistReducer(medicinePersistConfig, medicineReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer); // 👈 persist user
const persistedOrdersReducer = persistReducer(ordersPersistConfig, orderReducer); // Persist orders reducer

// Configure store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    medicines: persistedMedicineReducer,
    user: persistedUserReducer,
    orders: persistedOrdersReducer, // Use the persisted orders reducer here
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware), // 👈 add orderApi middleware
});

// Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
