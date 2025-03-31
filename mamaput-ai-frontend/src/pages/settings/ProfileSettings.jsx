import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputSection from "../../components/SettingsComponent/InputSection";
import { 
  updateUserDetails, 
  updateProfileField
} from "../../../redux/userSettingsSlice";
import { Pencil, Loader } from "lucide-react";
import defaultProfilePic from "../../assets/img/default-profile.jpg";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { profileState, email, isLoading, error } = useSelector((state) => state.userSettings);
  
  // Local state for form handling
  const [preview, setPreview] = useState(defaultProfilePic);
  const [formData, setFormData] = useState({});
  const [localEmail, setLocalEmail] = useState("");
  const [fileToUpload, setFileToUpload] = useState(null);
  const [saveMessage, setSaveMessage] = useState({ type: "", message: "" });



  // Update local state when Redux state changes
  useEffect(() => {
    if (profileState) {
      setFormData(profileState);
      setLocalEmail(email || "");
      setPreview(profileState.profilePicture || defaultProfilePic);
    }
  }, [profileState, email]);

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Update Redux state as well
    dispatch(updateProfileField({ field, value }));
  };

  // Handle profile picture change
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileToUpload(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Save all changes
  const handleSave = async () => {
    setSaveMessage({ type: "", message: "" });
    
    try {
      let updatedDetails = {
        email: localEmail,
        profileState: { ...formData }
      };

      // Handle profile picture upload if needed
      if (fileToUpload) {
        // In a real implementation, you would upload the file to a server
        // and get back a URL to store in the profile
        
        // Example (commented out as it's just a placeholder):
        // const formDataUpload = new FormData();
        // formDataUpload.append("profilePicture", fileToUpload);
        // const response = await fetch('/api/upload', { method: 'POST', body: formDataUpload });
        // const data = await response.json();
        // updatedDetails.profileState.profilePicture = data.url;
        
        // For now, we'll use the existing file reader result
        updatedDetails.profileState.profilePicture = preview;
      }

      await dispatch(updateUserDetails(updatedDetails)).unwrap();
      setSaveMessage({ 
        type: "success", 
        message: "Profile details saved successfully!" 
      });
    } catch (err) {
      setSaveMessage({ 
        type: "error", 
        message: `Failed to save profile details: ${err}` 
      });
    }
  };

  if (isLoading && !Object.keys(formData).length) {
    return (
      <div className="p-6 flex justify-center items-center">
        <Loader className="animate-spin" />
        <p className="ml-2">Loading profile details...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="heading--settings">Profile Settings</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          Error loading profile: {error}
        </div>
      )}

      {saveMessage.message && (
        <div className={`${saveMessage.type === "success" ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"} px-4 py-3 rounded mb-6`}>
          {saveMessage.message}
        </div>
      )}

      <form className="py-10 px-5 flex flex-col gap-10" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        {/* PROFILE PICTURE */}
        <div className="relative flex flex-col gap-5">
          <div className="relative w-40 h-40">
            <img
              src={preview}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            <label htmlFor="profilePic" className="absolute bottom-2 right-2 bg-settingsGreen p-2 rounded-full cursor-pointer">
              <Pencil size={20} className="text-white" />
              <input
                type="file"
                id="profilePic"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
            </label>
          </div>
          <p className="text-base text-gray-500">Click the icon to upload a new picture</p>
        </div>

        {/* Personal Information */}
        <div className="flex flex-col md:flex-row md:gap-10">
          <label className="flex flex-col gap-2 w-full md:w-1/2">
            <span>First Name</span>
            <input
              type="text"
              value={formData.firstName || ""}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="form-input-field"
            />
          </label>
          <label className="flex flex-col gap-2 w-full md:w-1/2">
            <span>Last Name</span>
            <input
              type="text"
              value={formData.lastName || ""}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="form-input-field"
            />
          </label>
        </div>

        {/* Email and DOB */}
        <div className="flex flex-col md:flex-row md:gap-10">
          <label className="flex flex-col gap-2 w-full md:w-1/2">
            <span>Email</span>
            <input
              type="email"
              value={localEmail}
              onChange={(e) => setLocalEmail(e.target.value)}
              className="form-input-field"
            />
          </label>
          <label className="flex flex-col gap-2 w-full md:w-1/2">
            <span>Birthday</span>
            <input
              type="date"
              value={formData.birthDay || ""}
              onChange={(e) => handleChange("birthDay", e.target.value)}
              className="form-input-field"
            />
          </label>
        </div>

        {/* PHYSICAL DETAILS */}
        <div className="flex flex-col md:flex-row md:gap-10">
          <label className="flex flex-col gap-2 w-full md:w-1/3">
            <span>Height (cm)</span>
            <input
              type="number"
              value={formData.height || ""}
              onChange={(e) => handleChange("height", e.target.value)}
              className="form-input-field"
            />
          </label>
          <label className="flex flex-col gap-2 w-full md:w-1/3">
            <span>Weight (kg)</span>
            <input
              type="number"
              value={formData.weight || ""}
              onChange={(e) => handleChange("weight", e.target.value)}
              className="form-input-field"
            />
          </label>
          <label className="flex flex-col gap-2 w-full md:w-1/3">
            <span>Nationality</span>
            <input
              type="text"
              value={formData.nationality || ""}
              onChange={(e) => handleChange("nationality", e.target.value)}
              className="form-input-field"
            />
          </label>
        </div>

        {/* GENDER */}
        <div className="section">
          <h2>Gender</h2>
          <select
            className="form-input-field"
            value={formData.gender || ""}
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        {/* ALLERGIES & CONDITIONS */}
        <InputSection
          title="Allergies"
          list={formData.allergies || []}
          setList={(list) => handleChange("allergies", list)}
        />
        <InputSection
          title="Health Conditions"
          list={formData.healthConditions || []}
          setList={(list) => handleChange("healthConditions", list)}
        />

        {/* Dietary Preferences */}
        <div className="section">
          <h2 className="settings--form-heading">Dietary Preference</h2>
          <select
            className="form-input-field"
            value={formData.dietaryPreference || ""}
            onChange={(e) => handleChange("dietaryPreference", e.target.value)}
          >
            <option value="">Select dietary preference</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Pescatarian">Pescatarian</option>
            <option value="Halal">Halal</option>
            <option value="Kosher">Kosher</option>
            <option value="No restrictions">No restrictions</option>
          </select>
        </div>

        <button
          type="submit"
          className="form-button flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader size={20} className="animate-spin mr-2" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;