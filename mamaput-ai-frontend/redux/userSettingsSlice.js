import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import defaultProfilePic from "../src/assets/img/default-profile.jpg";

//  Getting the user's default details from the onboarding process
export const getUserDetails = createAsyncThunk(
  "userSettings/getUserDetails",
  async (_, { rejectWithValue }) => {
    const url = "http://localhost:3005/user/me";
    try {
      const response = await fetch(url, {
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Updating the user's details
export const updateUserDetails = createAsyncThunk(
  "userSettings/updateUserDetails",
  async (updatedDetails, { rejectWithValue }) => {
    const url = "http://localhost:3005/user/edit/me";

    // Transform frontend state to backend format
    const backendPayload = {
      name: updatedDetails.name,
      DOB: updatedDetails.DOB,
      gender: updatedDetails.gender,
      height: updatedDetails.height,
      weight: updatedDetails.weight,
      allergies: updatedDetails.allergies,
      health_conditions: updatedDetails.healthConditions,
      dietary_preferences: updatedDetails.dietaryPreference,
      image: updatedDetails.image,
      email: updatedDetails.email,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendPayload),
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


const initialState = {
  email: "",
  profileState: {
    name:"",
    DOB: "",
    height: "",
    weight: "",
    gender: "",
    nationality: "",
    allergies: [],
    healthConditions: [],
    dietaryPreference: [],
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

  isLoading: false,
  error: null,
};

// Update User State
const updateUserState = (state, payload) => {
  state.email = payload.email;

  state.profileState = {
    ...state.profileState,
    name: payload.name,
    DOB: payload.DOB,
    height: payload.height,
    weight: payload.weight,
    gender: payload.gender,
    nationality: payload.nationality,
    allergies: payload.allergies,
    healthConditions: payload.health_conditions,
    dietaryPreference: payload.dietary_preferences,
    profilePicture: payload.image,
  };

  state.notificationSettings = {
    ...state.notificationSettings,
  };

  state.accountSettings = {
    ...state.accountSettings,
    password: payload.password,
  };

  state.preferences = {
    ...state.preferences,
  };

  state.isLoading = false;
  state.error = null;
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

    addToProfileArray(state, action) {
      const { field, value } = action.payload;
      if (Array.isArray(state.profileState[field])) {
        state.profileState[field].push(value);
      }
    },

    removeFromProfileArray(state, action) {
      const { field, value } = action.payload;
      if (Array.isArray(state.profileState[field])) {
        state.profileState[field] = state.profileState[field].filter(
          (item) => item !== value
        );
      }
    },

    toggleCategoryEnabled(state, action) {
      const category = action.payload;
      const isEnabled = !state.notificationSettings[`${category}Enabled`];

      state.notificationSettings[`${category}Enabled`] = isEnabled;

      Object.keys(state.notificationSettings[category]).forEach((setting) => {
        state.notificationSettings[category][setting] = isEnabled;
      });
    },

    toggleNotificationSetting(state, action) {
      const { category, setting } = action.payload;
      state.notificationSettings[category][setting] =
        !state.notificationSettings[category][setting];
    },

    setNotificationSettings(state, action) {
      state.notificationSettings = action.payload;
    },

    updateAccountSetting(state, action) {
      const { field, value } = action.payload;
      if (Object.prototype.hasOwnProperty.call(state.accountSettings, field)) {
        state.accountSettings[field] = value;
      }
    },

    updateTheme(state, action) {
      state.preferences.themeLight = action.payload;
    },

    updateLanguage(state, action) {
      state.preferences.language = action.payload;
    },
  },

  // ✅ Using Helper Function in Extra Reducers
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
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
  setNotificationSettings,
  updateAccountSetting,
  updateTheme,
  updateLanguage,
} = userSettingsSlice.actions;

export default userSettingsSlice.reducer;
