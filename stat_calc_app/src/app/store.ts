import { configureStore } from '@reduxjs/toolkit';
import metricsFilterReducer from '../features/metricsFilterSlice';
import authReducer from '../features/authSlice';
import calcReducer from '../features/calcSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // использование localStorage по умолчанию

const authPersistConfig = {
  key: 'auth', // ключ для persistReducer auth
  storage, // хранилище для auth
};

const metricsFilterPersistConfig = {
  key: 'metricsFilter', // ключ для persistReducer metricsFilter
  storage,
};

const calcPersistConfig = {
  key: 'calc', // ключ для persistReducer calc
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer), // применяем persistConfig для auth
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

