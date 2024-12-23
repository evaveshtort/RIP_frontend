import { configureStore } from '@reduxjs/toolkit';
import metricsFilterReducer from '../features/metricsFilterSlice';
import authReducer from '../features/authSlice';
import calcReducer from '../features/calcSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const authPersistConfig = {
  key: 'auth', 
  storage,
};

const metricsFilterPersistConfig = {
  key: 'metricsFilter',
  storage,
};

const calcPersistConfig = {
  key: 'calc',
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    metricsFilter: persistReducer(metricsFilterPersistConfig, metricsFilterReducer),
    calc: persistReducer(calcPersistConfig, calcReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['register', 'rehydrate']
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;

