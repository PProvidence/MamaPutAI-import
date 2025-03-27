import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotificationSettings,
  toggleCategoryEnabled,
  toggleNotificationSetting,
} from "../../../redux/userSettingsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

const NotificationSettings = () => {
  const dispatch = useDispatch();
  const reduxSettings = useSelector((state) => state.userSettings.notificationSettings);

  // ✅ Local state for temporary changes
  const [localSettings, setLocalSettings] = useState(reduxSettings);

  const categories = Object.keys(localSettings).filter(
    (key) => typeof localSettings[key] === "object"
  );

  // ✅ Toggle category (but only update local state)
  const handleCategoryToggle = (category) => {
    setLocalSettings((prev) => {
      const isEnabled = !prev[`${category}Enabled`];

      const updatedCategory = Object.keys(prev[category]).reduce((acc, setting) => {
        acc[setting] = isEnabled;
        return acc;
      }, {});

      return {
        ...prev,
        [`${category}Enabled`]: isEnabled,
        [category]: updatedCategory,
      };
    });
  };

  // ✅ Toggle individual setting (local state only)
  const handleSettingToggle = (category, setting) => {
    setLocalSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting],
      },
    }));
  };

  // ✅ Update Redux store when "Save" is clicked
  const handleSubmit = () => {
    dispatch(setNotificationSettings(localSettings));
  };

  return (
    <div>
      <h2 className="heading--settings">Notification Settings</h2>
      <div className="py-10 px-5 flex flex-col gap-10">
        {categories.map((category) => {
          const isCategoryEnabled = localSettings[`${category}Enabled`];

          return (
            <div key={category} className="notification-category flex flex-col gap-3">
              {/* Category Header */}
              <div className="category-header flex items-center justify-between">
                <h3 className="capitalize settings--form-heading">
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <button
                  onClick={() => handleCategoryToggle(category)}
                  className={`toggle-btn ${isCategoryEnabled ? "active" : ""}`}
                >
                  {isCategoryEnabled ? (
                    <FontAwesomeIcon icon={faToggleOn} className="text-4xl text-settingsGreen" />
                  ) : (
                    <FontAwesomeIcon icon={faToggleOff} className="text-4xl text-settingsGreen" />
                  )}
                </button>
              </div>

              <p className="text-base text-gray-500">Notify me when:</p>

              {/* Individual Settings */}
              {Object.keys(localSettings[category]).map((setting) => (
                <div key={setting} className="checkbox-item flex gap-2">
                  <input
                    type="checkbox"
                    checked={localSettings[category][setting]}
                    onChange={() => handleSettingToggle(category, setting)}
                    name={setting}
                    id={setting}
                    className="accent-settingsGreen"
                    disabled={!isCategoryEnabled} // Disable checkbox when category is off
                  />
                  <label className={`text-base ${isCategoryEnabled ? "text-gray-500" : "text-trueGrey"} capitalize`}htmlFor={setting}>
                    {setting.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                </div>
              ))}
            </div>
          );
        })}

        <button onClick={handleSubmit} type="submit" className="form-button">
          Save notification settings
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
