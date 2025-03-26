import { useDispatch, useSelector } from "react-redux";
import {
  toggleCategoryEnabled,
  toggleNotificationSetting,
} from "../../../redux/userSettingsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

const NotificationSettings = () => {
  const dispatch = useDispatch();
  const notificationSettings = useSelector(
    (state) => state.userSettings.notificationSettings
  );

  const categories = Object.keys(notificationSettings).filter(
    (key) => typeof notificationSettings[key] === "object"
  );

  return (
    <div>
      <h2 className="heading--settings">Notification Settings</h2>
      <div className="py-10 px-5 flex flex-col gap-10">
        {categories.map((category) => {
          const isCategoryEnabled = notificationSettings[`${category}Enabled`];

          return (
            <div key={category} className="notification-category flex flex-col gap-3">
              {/* Category Header */}
              <div className="category-header flex items-center justify-between">
                <h3 className="capitalize settings--form-heading">
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <button
                  onClick={() => dispatch(toggleCategoryEnabled(category))}
                  className={`toggle-btn ${isCategoryEnabled ? "active" : ""}`}
                >
                  {isCategoryEnabled ? (
                    <FontAwesomeIcon
                      icon={faToggleOn}
                      className="text-4xl text-settingsGreen"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faToggleOff}
                      className="text-4xl text-settingsGreen"
                    />
                  )}
                </button>
              </div>

              <p className="text-base text-gray-500">Notify me when:</p>

              {/* Individual Settings */}
              {Object.keys(notificationSettings[category]).map((setting) => (
                <div key={setting} className="checkbox-item flex gap-2">
                  <input
                    type="checkbox"
                    checked={notificationSettings[category][setting]}
                    onChange={() =>
                      dispatch(toggleNotificationSetting({ category, setting }))
                    }
                    className="accent-settingsGreen"
                    disabled={!isCategoryEnabled} // Disable checkbox when category is off
                  />
                  <label
                    className={`text-base ${
                      isCategoryEnabled ? "text-gray-500" : "text-trueGrey"
                    } capitalize`}
                  >
                    {setting.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationSettings;
