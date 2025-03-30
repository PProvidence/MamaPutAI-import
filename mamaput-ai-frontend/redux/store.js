import { configureStore } from '@reduxjs/toolkit';
import userSettingsReducer from './userSettingsSlice';
import remindersReducer from "./remindersSlice";

export default configureStore({
    reducer: {
        userSettings: userSettingsReducer,
        reminders: remindersReducer, // Add reminders reducer
    },
  });