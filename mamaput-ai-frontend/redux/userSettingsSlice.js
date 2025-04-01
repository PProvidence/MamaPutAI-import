  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
  import defaultProfilePic from "../src/assets/img/default-profile.jpg";


  // Getting the user's default details from the onboarding process
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

      // Prepare JSON payload
      const payload = {
        name: updatedDetails.name,
        DOB: updatedDetails.DOB,
        goals: updatedDetails.goals,
        gender: updatedDetails.gender,
        height: updatedDetails.height,
        weight: updatedDetails.weight,
        allergies: updatedDetails.allergies,
        health_conditions: updatedDetails.health_conditions,
        dietary_preferences: updatedDetails.dietary_preferences,
        email: updatedDetails.email,
        image: updatedDetails.image
      };

      // Convert image to base64 if present
      if (updatedDetails.image instanceof File) {
        const toBase64 = (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
          });

        payload.profilePicture = await toBase64(updatedDetails.image);
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || "Failed to update user details");
        }

        const data = await response.json();

        // ✅ Handle response structure correctly
        if (data.user) {
          console.log("User details updated successfully:", data.user);
          return data.user; // Return updated user data
        } else {
          throw new Error(data.message || "Unexpected response from server");
        }
      } catch (error) {
        console.error("Error updating user details:", error.message);
        return rejectWithValue(error.message);
      }
    }
  );

  const initialState = {
    email: "",
    profileState: {
      name: "",
      DOB: "",
      height: "",
      weight: "",
      gender: "",
      nationality: "",
      goals: [],
      allergies: [],
      health_conditions: [],
      dietary_preferences: [],
      image: defaultProfilePic,
    },

    accountSettings: {
      disableAccount: false,
      password: "",
    },

    preferences: {
      theme:  true,
      langauge: "en",
    },

    notificationSettings: {
      alertsEnabled: true,
      pushNotificationsEnabled: true,
      emailNotificationsEnabled: true,
      feedbackAndPersonalizationEnabled: true,
      accountAndSecurityEnabled: true,
      alerts: {
        mealPlanReminder: true,
        hydrationAlert: true,
      },
      pushNotifications: {
        calorieCounter: true,
        weeklyNutritionSummary: true,
        personalizedHealthAlerts: true,
        mealReminders: true,
      },
      feedbackAndPersonalization: {
        calorieCounter: true,
        weeklyNutritionSummary: true,
        personalizedHealthAlerts: true,
        mealReminders: true,
        achievementBadges: true,
      },
      accountAndSecurity: {
        accountLoginAlerts: true,
        securityUpdates: true,
        importantAppAnnouncements: true,
      },
    },

    // other state variables...
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
      goals: payload.goals,
      nationality: payload.nationality,
      allergies: payload.allergies,
      health_conditions: payload.health_conditions,
      dietary_preferences: payload.dietary_preferences,
      image:  payload.image || state.profileState.image
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
      // other reducers...
    },
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
          updateUserState(state, action.payload); // action.payload now has the user data
        })
        .addCase(updateUserDetails.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
    }
    
  });

  export const {
    updateEmail,
    updateProfileField,
    // other actions...
  } = userSettingsSlice.actions;

  export default userSettingsSlice.reducer;
