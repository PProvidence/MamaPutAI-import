import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

const ReminderSection = () => {
  // State to manage reminders list
  const [reminders, setReminders] = useState([
    "It's time for breakfast",
    "Stay hydrated! Drink a glass of water.",
  ]);

  // State to track new reminder input
  const [newReminder, setNewReminder] = useState("");
  const [isOpened, setIsOpened] = useState(false); // ✅ Controls visibility of input field

  // ✅ Function to add a new reminder
  const addReminder = () => {
    if (newReminder.trim() && !reminders.includes(newReminder)) {
      setReminders([...reminders, newReminder]);
      setNewReminder(""); // Reset input field
      setIsOpened(false); // Close input field after adding
    }
  };

  // ❌ Function to remove a reminder by index
  const removeReminder = (index) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-4">
      {/* Reminders Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Reminders</h2>

        {/* Create Reminder Button */}
        <button
          type="button"
          onClick={() => setIsOpened(!isOpened)}
          className="bg-settingsGreen text-sm flex items-center space-x-2 font-semibold text-white px-4 py-2 rounded-lg border border-grey hover:bg-green-700 transition duration-300"
        >
          <Plus size={16} />
          <span>Create reminders</span>
        </button>
      </div>

      {/* Input Field (Shows only when isOpened is true) */}
      {isOpened && (
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            placeholder="Enter reminder..."
            className="form-input-field rounded-lg border"
          />
          <button
            onClick={addReminder}
            className="bg-settingsGreen text-sm text-white px-3 py-2 rounded-md hover:bg-green-700"
          >
            Add
          </button>
          {/* Close Button for Input */}
          <button
            onClick={() => setIsOpened(false)}
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Display Reminders List */}
      {reminders.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {reminders.map((reminder, index) => (
            <li
              key={index}
              className="flex justify-between font-bold text-sm text-trueGrey items-center bg-tertiaryGrey px-4 py-3 rounded-lg border border-accentGreen"
            >
              <span>{reminder}</span>
              {/* Delete Button for Reminder */}
              <button
                onClick={() => removeReminder(index)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        // Placeholder when no reminders exist
        <p className="text-gray-500 text-center mt-4">No reminders yet.</p>
      )}
    </div>
  );
};

export default ReminderSection;
