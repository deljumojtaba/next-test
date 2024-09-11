import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Your user slice
import organizationSlice from './organizationSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage as default
import industriesSlice from './industriesSlice';
import countriesSlice from './countriesSlice';
import impactRunSlice from './impactRunSlice';
import recommendationSlice from './recommendationSlice';
// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Combine your reducers
const rootReducer = combineReducers({
  user: userReducer,
  organization:organizationSlice,
   industory: industriesSlice,
   country:countriesSlice,
   impactRuns:impactRunSlice,
   recommendations:recommendationSlice
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
