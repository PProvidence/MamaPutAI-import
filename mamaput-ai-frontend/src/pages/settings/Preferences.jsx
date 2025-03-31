import { useSelector, useDispatch } from "react-redux";
import { updateUserDetails } from "../../../redux/userSettingsSlice";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

const Preferences = () => {
  const dispatch = useDispatch();
  const { theme, language } = useSelector((state) => state.userSettings.preferences);

  // Local State
  const [localPreferences, setLocalPreferences] = useState({
    theme,
    language,
  });

  // Handle Theme Toggle
  const handleThemeToggle = () => {
    setLocalPreferences((prev) => ({
      ...prev,
      theme: !prev.theme,
    }));
  };

  // Handle Language Change
  const handleLanguageChange = (event) => {
    setLocalPreferences((prev) => ({
      ...prev,
      language: event.target.value,
    }));
  };

  // Save Preferences
  const handleSubmit = () => {
    dispatch(updateUserDetails({ preferences: localPreferences }));
  };

  return (
    <div>
      <h1 className="heading--settings">Preferences</h1>
      <div className="py-10 px-5 flex flex-col gap-10">
        
        {/* THEME SETTINGS */}
        <div className="settings__section flex flex-col gap-3">
          <h2 className="settings--form-heading">Theme</h2>
          <button
            className="flex items-center gap-3 text-base font-extralight"
            onClick={handleThemeToggle}
          >
            {localPreferences.theme ? (
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
            {localPreferences.theme ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* LANGUAGE SETTINGS */}
        <div className="settings__section flex flex-col gap-3">
          <h2 className="settings--form-heading">Language</h2>
          <p className="text-base font-extralight">
            English is the only available language now
          </p>
          <label
            className="flex items-center gap-3 text-base font-extralight"
            htmlFor="language"
          >
            <input
              type="checkbox"
              name="language"
              value="en"
              checked={localPreferences.language === "en"}
              onChange={handleLanguageChange}
              className="w-6 h-6 accent-trueGrey"
            />
            English
          </label>
        </div>

        {/* SAVE PREFERENCES */}
        <button
          type="button"
          onClick={handleSubmit}
          className="form-button"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Preferences;
