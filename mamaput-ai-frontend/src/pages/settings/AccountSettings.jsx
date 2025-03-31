import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserDetails, updateAccountSetting, updateEmail } from "../../../redux/userSettingsSlice";
import { Eye, EyeClosed, Loader } from "lucide-react";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const { accountSettings, email, isLoading, error } = useSelector((state) => state.userSettings);

  const [localSettings, setLocalSettings] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    disableAccount: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [saveMessage, setSaveMessage] = useState({ type: "", message: "" });

  // Initialize local state from Redux
  useEffect(() => {
    if (email) {
      setLocalSettings(prev => ({
        ...prev,
        email: email,
        disableAccount: accountSettings?.disableAccount || false
      }));
    }
  }, [email, accountSettings]);

  // Handle input changes
  const handleChange = (field, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear related error when field changes
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Validate email
  const validateEmail = () => {
    if (!localSettings.email.includes("@") || !localSettings.email.includes(".")) {
      setFormErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
      return false;
    }
    return true;
  };

  // Validate password
  const validatePassword = () => {
    if (localSettings.password && localSettings.password.length < 8) {
      setFormErrors(prev => ({ ...prev, password: "Password must be at least 8 characters long" }));
      return false;
    }
    
    if (localSettings.password && localSettings.confirmPassword !== localSettings.password) {
      setFormErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      return false;
    }
    
    return true;
  };

  // Update Email
  const handleEmailChange = async () => {
    if (!validateEmail()) return;
    
    setSaveMessage({ type: "", message: "" });
    
    try {
      await dispatch(updateUserDetails({ email: localSettings.email })).unwrap();
      setSaveMessage({ type: "success", message: "Email updated successfully!" });
    } catch (err) {
      setSaveMessage({ type: "error", message: `Failed to update email: ${err}` });
    }
  };

  // Update Password
  const handlePasswordChange = async () => {
    if (!validatePassword()) return;
    
    setSaveMessage({ type: "", message: "" });
    
    try {
      await dispatch(updateUserDetails({ 
        accountSettings: {
          ...accountSettings,
          password: localSettings.password 
        }
      })).unwrap();
      
      setLocalSettings(prev => ({
        ...prev,
        password: "",
        confirmPassword: ""
      }));
      
      setSaveMessage({ type: "success", message: "Password updated successfully!" });
    } catch (err) {
      setSaveMessage({ type: "error", message: `Failed to update password: ${err}` });
    }
  };

  // Disable Account
  const handleDisableAccount = async () => {
    if (window.confirm("Are you sure you want to disable your account? This action can be reversed later.")) {
      setSaveMessage({ type: "", message: "" });
      
      try {
        await dispatch(updateUserDetails({ 
          accountSettings: {
            ...accountSettings,
            disableAccount: true
          }
        })).unwrap();
        
        setSaveMessage({ type: "success", message: "Account disabled successfully. You can re-enable it at any time." });
      } catch (err) {
        setSaveMessage({ type: "error", message: `Failed to disable account: ${err}` });
      }
    }
  };

  // Save all changes
  const handleSubmit = async () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (!isEmailValid || (localSettings.password && !isPasswordValid)) {
      return;
    }
    
    setSaveMessage({ type: "", message: "" });
    
    try {
      const updatedDetails = {
        email: localSettings.email,
        accountSettings: {
          ...accountSettings,
          disableAccount: localSettings.disableAccount
        }
      };
      
      // Only include password if it's being changed
      if (localSettings.password) {
        updatedDetails.accountSettings.password = localSettings.password;
      }
      
      await dispatch(updateUserDetails(updatedDetails)).unwrap();
      
      if (localSettings.password) {
        setLocalSettings(prev => ({
          ...prev,
          password: "",
          confirmPassword: ""
        }));
      }
      
      setSaveMessage({ type: "success", message: "Account settings saved successfully!" });
    } catch (err) {
      setSaveMessage({ type: "error", message: `Failed to save account settings: ${err}` });
    }
  };

  if (!email && !isLoading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <Loader className="animate-spin" />
        <p className="ml-2">Loading account settings...</p>
      </div>
    );
  }

  return (
    <div className="p-6 font-instrument-sans">
      <h1 className="heading--settings">Account Settings</h1>
      
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
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
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
            placeholder="your.email@example.com"
            className={`form-input-field ${formErrors.email ? "border-red-500" : ""}`}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}
          <button
            type="button"
            onClick={handleEmailChange}
            className={`form-button ${!validateEmail() ? "cursor-not-allowed opacity-70" : ""}`}
            disabled={!validateEmail() || isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader size={16} className="animate-spin mr-2" />
                Updating...
              </span>
            ) : (
              "Change Email"
            )}
          </button>
        </div>

        {/* PASSWORD SETTINGS */}
        <div className="passwordDiv flex flex-col gap-4">
          <label className="text-base font-light">Change Password</label>
          <div className={`form-input-field flex gap-2 ${formErrors.password ? "border-red-500" : ""}`}>
            <input
              type={showPassword ? "text" : "password"}
              value={localSettings.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="New password"
              className="flex-1 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#373737]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
          {formErrors.password && (
            <p className="text-red-500 text-sm">{formErrors.password}</p>
          )}
          
          <div className={`form-input-field flex gap-2 ${formErrors.confirmPassword ? "border-red-500" : ""}`}>
            <input
              type={showPassword ? "text" : "password"}
              value={localSettings.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              placeholder="Confirm new password"
              className="flex-1 outline-none"
            />
          </div>
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>
          )}
          
          <button
            type="button"
            onClick={handlePasswordChange}
            className={`form-button ${!localSettings.password || !validatePassword() ? "cursor-not-allowed opacity-70" : ""}`}
            disabled={!localSettings.password || !validatePassword() || isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader size={16} className="animate-spin mr-2" />
                Updating...
              </span>
            ) : (
              "Change Password"
            )}
          </button>
        </div>

        {/* DISABLE ACCOUNT */}
        <div className="disableAccountDiv flex flex-col gap-4">
          <label className="text-lg">Disable Account</label>
          <p className="text-gray-500">You can temporarily disable your account. You can re-enable it at any time by logging in.</p>
          <button
            type="button"
            onClick={handleDisableAccount}
            className="form-button-disabled hover:bg-red-700 hover:text-white transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader size={16} className="animate-spin mr-2" />
                Processing...
              </span>
            ) : (
              "Disable Account"
            )}
          </button>
        </div>

        {/* SAVE ALL CHANGES */}
        <button
          type="submit"
          className="form-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader size={16} className="animate-spin mr-2" />
              Saving Changes...
            </span>
          ) : (
            "Save All Changes"
          )}
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;