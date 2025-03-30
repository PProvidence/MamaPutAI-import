import { useState } from "react";
import { ChevronLeft, PlusIcon, X, Trash2 } from "lucide-react";
import { BiSolidCalendarX } from "react-icons/bi";

const Reminders = () => {
    const [reminders, setReminders] = useState([]);
    const [newReminder, setNewReminder] = useState("");
    const [isOpened, setIsOpened] = useState(false);

    const handleGoBack = () => {
        window.history.back();
    };

    const addReminder = () => {
        if (newReminder.trim() && !reminders.includes(newReminder)) {
            setReminders([...reminders, newReminder]);
            setNewReminder(""); 
            setIsOpened(false); 
        }
    };

    const removeReminder = (index) => {
        setReminders(reminders.filter((_, i) => i !== index));
    };

    return (
        <div className="p-6 w-full font-instrument-sans flex flex-col">
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <ChevronLeft className="mr-4 cursor-pointer hover:text-pryGreen" onClick={handleGoBack} />
                    <h1 className="text-2xl font-bold">Reminders</h1>
                </div>
                <button
                    className="bg-pryGreen text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition"
                    onClick={() => setIsOpened(!isOpened)}
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Create reminder</span>
                </button>
            </div>

            {/* Input Field */}
            {isOpened && (
                <div className="mt-3 flex gap-2">
                    <input
                        type="text"
                        value={newReminder}
                        onChange={(e) => setNewReminder(e.target.value)}
                        placeholder="Enter reminder..."
                        className="form-input-field rounded-lg border flex-1"
                    />
                    <button
                        onClick={addReminder}
                        className="bg-pryGreen text-white px-3 py-2 rounded-md hover:bg-green-700"
                    >
                        Add
                    </button>
                    <button
                        onClick={() => setIsOpened(false)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* Display Reminders */}
            {reminders.length > 0 ? (
                <ul className="space-y-2 mt-4 w-full">
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
                // Custom Empty State
                <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center max-w-5/12 mx-auto">
                    <BiSolidCalendarX className="w-12 h-12 text-pryGreen mb-4" />
                    <h2 className="text-xl font-bold mb-2">You have no reminders yet</h2>
                    <p className="text-gray-600 mb-4">Set reminders to receive alerts about meal time, planned calendar activities, water time etc.</p>
                </div>
            )}
        </div>
    );
};

export default Reminders;
