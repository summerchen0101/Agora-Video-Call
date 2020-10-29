import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducer';

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['video/setLocalStream'],
      // // Ignore these field paths in all actions
      // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      // // Ignore these paths in the state
      // ignoredPaths: ['items.dates'],
    },
  }),
});
