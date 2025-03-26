import { createSlice } from "@reduxjs/toolkit";
import defaultProfilePic from "../src/assets/img/default-profile.jpg";

const initialState = {
  email: "",

  profileState: {
    firstName: "",
    lastName: "",
    birthDay: "",
    height: "",
    weight: "",
    gender: "",
    nationality: "",
    allergies: [],
    healthConditions: [],
    dietaryPreference: "",
    profilePicture: defaultProfilePic,
  },

  notificationSettings: {
    alerts: { mealPlanReminder: true, hydrationAlert: true },
    pushNotifications: { calorieCounter: true, weeklySummary: true },
    feedbackAndPersonalization: { healthAlerts: true, badges: true },
    alertsEnabled: true,
    pushNotificationsEnabled: true,
    feedbackAndPersonalizationEnabled: true,
  },

  accountSettings: {
    password: "*******",
    disableAccount: false,
  },

  preferences: {
    themeLight: true,
    language: "en",
  },
};

const userSettingsSlice = createSlice({
  name: "userSettings",
  initialState,
  reducers: {
    // Update email globally
    updateEmail(state, action) {
      state.email = action.payload;
    },

    // Update a specific field in profile settings
    updateProfileField(state, action) {
      const { field, value } = action.payload;
      if (Object.prototype.hasOwnProperty.call(state.profileState, field)) {
        state.profileState[field] = value;
      }
    },

    // Add an allergy, health condition, or dietary preference
    addToProfileArray(state, action) {
      const { field, value } = action.payload;
      if (Array.isArray(state.profileState[field])) {
        state.profileState[field].push(value);
      }
    },

    // Remove an item from an array in profile settings
    removeFromProfileArray(state, action) {
      const { field, value } = action.payload;
      if (Array.isArray(state.profileState[field])) {
        state.profileState[field] = state.profileState[field].filter(
          (item) => item !== value
        );
      }
    },

    toggleCategoryEnabled: (state, action) => {
      const category = action.payload;
      const isEnabled = !state.notificationSettings[`${category}Enabled`];

      state.notificationSettings[`${category}Enabled`] = isEnabled;

      // If enabling, turn on all related settings
      Object.keys(state.notificationSettings[category]).forEach((setting) => {
        state.notificationSettings[category][setting] = isEnabled;
      });
    },

    toggleNotificationSetting: (state, action) => {
      const { category, setting } = action.payload;
      state.notificationSettings[category][setting] =
        !state.notificationSettings[category][setting];
    },

    // Update account settings field
    updateAccountSetting(state, action) {
      const { field, value } = action.payload;
      if (Object.prototype.hasOwnProperty.call(state.accountSettings, field)) {
        state.accountSettings[field] = value;
      }
    },

    // Update theme preference
    updateTheme(state, action) {
      state.preferences.theme = action.payload;
    },

    // Update language preference
    updateLanguage(state, action) {
      state.preferences.language = action.payload;
    },
  },
});

export const {
  updateEmail,
  updateProfileField,
  addToProfileArray,
  removeFromProfileArray,
  toggleCategoryEnabled,
  toggleNotificationSetting,
  updateAccountSetting,
  updateTheme,
  updateLanguage,
} = userSettingsSlice.actions;

export default userSettingsSlice.reducer;
