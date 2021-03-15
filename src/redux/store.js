import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
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
import trackerReducer from './tracker/tracker-reducer';

const middleware = [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
];

const persistConfig = {
    key: 'tracker',
    storage,
};

const store = configureStore({
    reducer: {
      tracker: persistReducer(persistConfig, trackerReducer),
    },
    middleware,
    devTools: process.env.NODE_ENV === 'development',
});


const persistor = persistStore(store);

export default { store, persistor };
