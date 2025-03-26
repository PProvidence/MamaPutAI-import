import { configureStore } from '@reduxjs/toolkit';
import userSettingsReducer from './userSettingsSlice';

export default configureStore({
    reducer: {
        userSettings: userSettingsReducer,
    },
})