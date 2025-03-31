import { createSlice } from "@reduxjs/toolkit";
import defaultProfilePic from "../src/assets/img/default-profile.jpg";

// Getting the user's details from the API
export const getUserDetails = createAsyncThunk(
  "userSettings/getUserDetails",
  async (_, { rejectWithValue }) => {
    const url = "http://localhost:3005/user/me";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      };
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Updating the user's details with POST request
export const updateUserDetails = createAsyncThunk(
  "userSettings/updateUserDetails",
  async (updatedDetails, { rejectWithValue }) => {
    const url = "http://localhost:3005/user/edit/me";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDetails),
      });

      if (!response.ok) {
        throw new Error(
          "Failed to update user details: " + response.statusText
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Minimal initial state before API data is loaded
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
    alerts: {},
    pushNotifications: {},
    feedbackAndPersonalization: {},
    alertsEnabled: false,
    pushNotificationsEnabled: false,
    feedbackAndPersonalizationEnabled: false,
  },
  accountSettings: {
    password: "*******",
    disableAccount: false,
  },
  preferences: {
    themeLight: true,
    language: "en",
  },
  isLoading: false,
  error: null,
};

// Update User State with data from API
const updateUserState = (state, payload) => {
  // Ensure we have all required fields from the payload
  state.email = payload.email || state.email;
  
  // Update profile state
  if (payload.profileState) {
    state.profileState = {
      ...state.profileState,
      ...payload.profileState,
    };
  }
  
  // Update notification settings
  if (payload.notificationSettings) {
    state.notificationSettings = {
      ...state.notificationSettings,
      ...payload.notificationSettings,
    };
  }
  
  // Update account settings
  if (payload.accountSettings) {
    state.accountSettings = {
      ...state.accountSettings,
      ...payload.accountSettings,
    };
  }
  
  // Update preferences
  if (payload.preferences) {
    state.preferences = {
      ...state.preferences,
      ...payload.preferences,
    };
  }
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

    // ✅ New Action: Bulk update settings
    setNotificationSettings: (state, action) => {
      state.notificationSettings = action.payload;
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

    // New reducer to prepare data for API update
    prepareUpdatePayload(state) {
      // This can be used to format the data before sending to API if needed
      return {
        email: state.email,
        profileState: state.profileState,
        notificationSettings: state.notificationSettings,
        accountSettings: state.accountSettings,
        preferences: state.preferences
      };
    }
  },

  // Using Helper Function in Extra Reducers
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        // Initialize all state from API response
        updateUserState(state, action.payload);
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update state with the response from the update operation
        updateUserState(state, action.payload);
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  updateEmail,
  updateProfileField,
  addToProfileArray,
  removeFromProfileArray,
  toggleCategoryEnabled,
  toggleNotificationSetting,
  setNotification,
  setNotificationSettings,
  updateAccountSetting,
  updateTheme,
  updateLanguage,
  prepareUpdatePayload
} = userSettingsSlice.actions;

export default userSettingsSlice.reducer;