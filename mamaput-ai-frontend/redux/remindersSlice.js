import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reminders: [
    "It's time for breakfast",
    "Stay hydrated! Drink a glass of water.",
  ],
};

const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    // ✅ Add a new reminder
    addReminder: (state, action) => {
      state.reminders.push(action.payload);
    },

    // ❌ Remove a reminder by index
    removeReminder: (state, action) => {
      state.reminders = state.reminders.filter((_, i) => i !== action.payload);
    },
  },
});

// Export actions
export const { addReminder, removeReminder } = remindersSlice.actions;

// Export reducer
export default remindersSlice.reducer;
