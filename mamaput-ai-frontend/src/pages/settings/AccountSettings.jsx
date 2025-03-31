import { useSelector, useDispatch } from "react-redux";
import { updateUserDetails } from "../../../redux/userSettingsSlice";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const { accountSettings, email } = useSelector((state) => state.userSettings);

  const [localSettings, setLocalSettings] = useState({
    email,
    password: "",
    disableAccount: accountSettings.disableAccount,
  });

  const [showPassword, setShowPassword] = useState(false);

  // Handle Input Change
  const handleChange = (field, value) => {
    setLocalSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update Email
  const handleEmailChange = () => {
    if (!localSettings.email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    dispatch(updateUserDetails({ email: localSettings.email }));
  };

  // Update Password
  const handlePasswordChange = () => {
    if (localSettings.password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (localSettings.password === accountSettings.password) {
      alert("Please enter a new password");
      return;
    }

    dispatch(updateUserDetails({ password: localSettings.password }));
    setLocalSettings((prev) => ({
      ...prev,
      password: "",
    }));
  };

  // Disable Account
  const handleDisableAccount = () => {
    if (window.confirm("Are you sure you want to disable your account?")) {
      dispatch(updateUserDetails({ disableAccount: true }));
    }
  };

  // Submit Changes
  const handleSubmit = () => {
    dispatch(updateUserDetails({
      email: localSettings.email,
      password: localSettings.password,
      disableAccount: localSettings.disableAccount,
    }));
  };

  return (
    <div className="font-instrument-sans">
      <h1 className="heading--settings">Account Settings</h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="py-10 px-5 flex flex-col gap-10"
      >
        <h3 className="settings--form-heading">Account - Verified Information</h3>

        {/* EMAIL SETTINGS */}
        <div className="emailDiv flex flex-col gap-4">
          <label className="text-base font-light">Email</label>
          <input
            type="email"
            value={localSettings.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder={email}
            className="form-input-field"
          />
          <button
            type="button"
            onClick={handleEmailChange}
            className={`form-button ${!localSettings.email.includes("@") ? "cursor-not-allowed" : ""}`}
            disabled={!localSettings.email.includes("@")}
          >
            Change Email
          </button>
        </div>

        {/* PASSWORD SETTINGS */}
        <div className="passwordDiv flex flex-col gap-4">
          <label className="text-base font-light">Change Password</label>
          <div className="form-input-field flex gap-2">
            <input
              type={showPassword ? "text" : "password"}
              value={localSettings.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="********"
              className="flex-1 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#373737]"
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
          <button
            type="button"
            onClick={handlePasswordChange}
            className={`form-button ${localSettings.password.length < 8 ? "cursor-not-allowed" : ""}`}
            disabled={localSettings.password.length < 8}
          >
            Change Password
          </button>
        </div>

        {/* DISABLE ACCOUNT */}
        <div className="disableAccountDiv flex flex-col gap-4">
          <label className="text-lg">Disable Account</label>
          <p>You can temporarily disable or permanently delete your account.</p>
          <button
            type="button"
            onClick={handleDisableAccount}
            className="form-button-disabled"
          >
            Disable Account
          </button>
        </div>

        {/* SAVE ALL CHANGES */}
        <button
          type="button"
          onClick={handleSubmit}
          className="form-button"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
