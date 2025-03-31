import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails, toggleNotificationSetting, toggleCategoryEnabled } from "../../../redux/userSettingsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "lucide-react";

const NotificationSettings = () => {
  const dispatch = useDispatch();
  const { notificationSettings, isLoading, error } = useSelector((state) => state.userSettings);
  
  // Local state for form management
  const [localSettings, setLocalSettings] = useState({});
  const [saveMessage, setSaveMessage] = useState({ type: "", message: "" });

  // Initialize local state from Redux
  useEffect(() => {
    if (notificationSettings) {
      setLocalSettings(notificationSettings);
    }
  }, [notificationSettings]);

  // Get notification categories (alerts, pushNotifications, etc.)
  const categories = Object.keys(localSettings).filter(
    (key) => typeof localSettings[key] === "object" && key !== "profileState"
  );

  // Toggle entire category
  const handleCategoryToggle = (category) => {
    const updatedSettings = { ...localSettings };
    const isEnabled = !updatedSettings[`${category}Enabled`];
    
    // Update enabled flag
    updatedSettings[`${category}Enabled`] = isEnabled;
    
    // Update all settings within the category
    if (updatedSettings[category]) {
      Object.keys(updatedSettings[category]).forEach(setting => {
        updatedSettings[category][setting] = isEnabled;
      });
    }
    
    setLocalSettings(updatedSettings);
  };

  // Toggle individual setting
  const handleSettingToggle = (category, setting) => {
    const updatedSettings = { ...localSettings };
    updatedSettings[category][setting] = !updatedSettings[category][setting];
    setLocalSettings(updatedSettings);
  };

  // Save changes
  const handleSubmit = async () => {
    setSaveMessage({ type: "", message: "" });
    
    try {
      await dispatch(updateUserDetails({ 
        notificationSettings: localSettings 
      })).unwrap();
      
      setSaveMessage({ 
        type: "success", 
        message: "Notification settings saved successfully!" 
      });
    } catch (err) {
      setSaveMessage({ 
        type: "error", 
        message: `Failed to save notification settings: ${err}` 
      });
    }
  };

  if (!Object.keys(localSettings).length) {
    return (
      <div className="p-6 flex justify-center items-center">
        <Loader className="animate-spin" />
        <p className="ml-2">Loading notification settings...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="heading--settings">Notification Settings</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          Error: {error}
        </div>
      )}
      
      {saveMessage.message && (
        <div className={`${saveMessage.type === "success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"} px-4 py-3 rounded mb-6`}>
          {saveMessage.message}
        </div>
      )}
      
      <div className="py-10 px-5 flex flex-col gap-10">
        {categories.map((category) => {
          const isCategoryEnabled = localSettings[`${category}Enabled`];
          // Skip if category is not an object or has no settings
          if (!localSettings[category] || typeof localSettings[category] !== 'object') {
            return null;
          }

          return (
            <div key={category} className="notification-category flex flex-col gap-3 border-b pb-6">
              {/* Category Header */}
              <div className="category-header flex items-center justify-between">
                <h3 className="capitalize settings--form-heading text-xl font-medium">
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <button
                  onClick={() => handleCategoryToggle(category)}
                  className={`toggle-btn ${isCategoryEnabled ? "active" : ""}`}
                  aria-label={`Toggle ${category}`}
                >
                  {isCategoryEnabled ? (
                    <FontAwesomeIcon icon={faToggleOn} className="text-4xl text-settingsGreen" />
                  ) : (
                    <FontAwesomeIcon icon={faToggleOff} className="text-4xl text-gray-400" />
                  )}
                </button>
              </div>

              <p className="text-base text-gray-500">Notify me when:</p>

              {/* Individual Settings */}
              <div className="pl-4 mt-2">
                {Object.keys(localSettings[category]).map((setting) => (
                  <div key={setting} className="checkbox-item flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      checked={localSettings[category][setting]}
                      onChange={() => handleSettingToggle(category, setting)}
                      name={setting}
                      id={`${category}-${setting}`}
                      className="w-5 h-5 accent-settingsGreen"
                      disabled={!isCategoryEnabled}
                    />
                    <label
                      className={`text-base ${
                        isCategoryEnabled ? "text-gray-700" : "text-gray-400"
                      } capitalize`}
                      htmlFor={`${category}-${setting}`}
                    >
                      {setting.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <button 
          onClick={handleSubmit} 
          type="button" 
          className="form-button flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader size={20} className="animate-spin mr-2" />
              Saving...
            </>
          ) : (
            "Save notification settings"
          )}
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;