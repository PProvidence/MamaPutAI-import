import { useSelector, useDispatch } from "react-redux";
import { updateTheme, updateLanguage } from "../../../redux/userSettingsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

const Preferences = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.userSettings.preferences.theme);
  const language = useSelector(
    (state) => state.userSettings.preferences.language
  );

  return (
    <div>
      <h1 className="heading--settings">Preferences</h1>
      <div className="py-10 px-5 flex flex-col gap-10">
        <div className="settings__section flex flex-col gap-3">
          <h2 className="settings--form-heading">Theme</h2>
          <button
            className="flex items-center gap-3 text-sm font-extralight"
            onClick={() => dispatch(updateTheme(theme ? false : true))}
          >
            {theme ? (
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
            {theme ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <div className="settings__section flex flex-col gap-3">
          <h2 className="settings--form-heading">Language</h2>
          <p className="text-sm font-extralight">English is the only available language now</p>
          <label className="flex items-center gap-3 text-sm font-extralight" htmlFor="language">
            <input
              type="checkbox"
              name="language"
              value="en"
              checked={language === "en"}
              onChange={() => dispatch(updateLanguage("en"))}
              className="w-6 h-6 accent-trueGrey"
            />
            English
          </label>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
