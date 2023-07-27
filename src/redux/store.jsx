import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './actions/auth/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

const persistor = persistStore(store);
export { store, persistor };
