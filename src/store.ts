import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import loginReducer from './reducer';

const userTransform = createTransform(
  (inboundState: { userName: string; email: string } | null) => {
    return JSON.stringify(inboundState); // Objekt zu JSON-String serialisieren
  },
  (outboundState: string) => {
    return JSON.parse(outboundState); // JSON-String zu Objekt deserialisieren
  },
  { whitelist: ['login'] } // Nur auf den Teil der Daten anwenden, der 'login' heißt
);

const persistConfig = {
  key: 'root',
  storage,
  transforms: [userTransform],
};

const persistedLoginReducer = persistReducer(persistConfig, loginReducer);

const store = configureStore({
  reducer: {
    login: persistedLoginReducer,
  },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
