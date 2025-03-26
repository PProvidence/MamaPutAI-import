import { useSelector, useDispatch } from "react-redux";
import {
  updateEmail,
  updateAccountSetting,
} from "../../../redux/userSettingsSlice";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const accountSettings = useSelector(
    (state) => state.userSettings.accountSettings
  );
  const email = useSelector((state) => state.userSettings.email);

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="font-instrument-sans">
      <h1 className="heading--settings">Account Settings</h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="py-10 px-5 flex flex-col gap-10"
      >
        <h3 className="settings--form-heading">
          Account - Verified Information
        </h3>

        {/* Email Section */}
        <div className="emailDiv flex flex-col gap-4">
          <label className="text-base font-light font-instrument-sans">
            Email
          </label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder={email}
            className="form-input-field"
          />
          <button
            type="button"
            onClick={() => {
              if (!newEmail.includes("@")) {
                alert("Please enter a valid email!");
                return;
              }
              dispatch(updateEmail(newEmail));
              setNewEmail(""); // Clear input after update
            }}
            className={`form-button ${
              !newEmail || !newEmail.includes("@") ? "cursor-not-allowed" : ""
            }`}
            disabled={!newEmail || !newEmail.includes("@")}
          >
            Change Email
          </button>
        </div>

        {/* Password Section */}
        <div className="passwordDiv  flex flex-col gap-4">
          <label className="text-base font-light font-instrument-sans">
            Change Password
          </label>
          <div className="form-input-field flex gap-2">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="********"
              className="flex-1 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#373737] "
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
          <p>Use 8 characters or more</p>
          <button
            type="button"
            onClick={() => {
              if (newPassword.length < 8) {
                alert("Password must be at least 8 characters long!");
                return;
              }
              if (newPassword === accountSettings.password) {
                alert("Please enter a new password!");
                return;
              }

              dispatch(
                updateAccountSetting({ field: "password", value: newPassword })
              );
              setNewPassword(""); // Clear input after update
            }}
            className={`form-button ${
              newPassword.length < 8 || newPassword === accountSettings.password
                ? "cursor-not-allowed"
                : ""
            }`}
            disabled={
              newPassword.length < 8 || newPassword === accountSettings.password
            }
          >
            Send Request
          </button>
        </div>

        {/* Disable Account Section */}
        <div className="disableAccountDiv flex flex-col gap-4">
          <label className="text-lg">Disable Account</label>
          <p>You can temporarily disable or permanently delete your account.</p>
          <button
            type="button"
            onClick={() => {
              const confirmDisable = window.confirm(
                "Are you sure you want to disable your account?"
              );
              if (confirmDisable) {
                dispatch(
                  updateAccountSetting({ field: "disableAccount", value: true })
                );
              }
            }}
            className="form-button-disabled"
          >
            Disable Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
