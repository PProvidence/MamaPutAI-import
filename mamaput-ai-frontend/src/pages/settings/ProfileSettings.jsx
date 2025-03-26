import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputSection from "../../components/SettingsComponent/InputSection";
import {
  updateProfileField,
  updateEmail,
} from "../../../redux/userSettingsSlice";
import { Pencil } from "lucide-react";
import defaultProfilePic from "../../assets/img/default-profile.jpg"; 

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.userSettings.email);
  const profileState = useSelector((state) => state.userSettings.profileState);

  // Initialize form data state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDay: "",
    gender: "",
    height: "",
    weight: "",
    allergies: [],
    healthConditions: [],
    dietaryPreference: "",
    profilePicture: defaultProfilePic, // Default image
  });

  const [email, setEmail] = useState("");
  const [preview, setPreview] = useState(defaultProfilePic);

  // Update state when Redux state changes
  useEffect(() => {
    if (profileState) {
      setFormData({
        firstName: profileState.firstName || "",
        lastName: profileState.lastName || "",
        birthDay: profileState.birthDay || "",
        gender: profileState.gender || "",
        height: profileState.height || "",
        weight: profileState.weight || "",
        allergies: profileState.allergies || [],
        healthConditions: profileState.healthConditions || [],
        dietaryPreference: profileState.dietaryPreference || "",
        profilePicture: profileState.profilePicture || defaultProfilePic,
      });

      setEmail(userEmail);
      setPreview(profileState.profilePicture || defaultProfilePic);
    }
  }, [profileState, userEmail]);

  // Handle input change
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);

      setFormData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  // Handle saving profile changes
  const handleSave = () => {
    dispatch(updateEmail(email));

    // If the profile picture is a file, handle upload (you need to implement backend/Firebase logic)
    if (formData.profilePicture instanceof File) {
      const formDataUpload = new FormData();
      formDataUpload.append("profilePicture", formData.profilePicture);

      // TODO: Upload to backend or Firebase and get URL
      // Example:
      // uploadProfilePicture(formDataUpload).then((url) => {
      //   dispatch(updateProfileField({ field: "profilePicture", value: url }));
      // });
    }

    // Save other form fields
    Object.keys(formData).forEach((key) => {
      if (key !== "profilePicture") {
        dispatch(updateProfileField({ field: key, value: formData[key] }));
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="heading--settings">Profile Settings</h1>

      <form className="py-10 px-5 flex flex-col gap-10">
           {/* Profile Picture Section */}
      <div className="relative flex flex-col gap-5">
        <div className="relative w-40 h-40 ">
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
          <label
            htmlFor="profilePic"
            className="absolute bottom-2 right-2 bg-settingsGreen p-2 rounded-full cursor-pointer"
          >
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
          <label className="flex flex-col gap-2">
            <span className="text-lightBlack text-base">First Name</span>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="form-input-field"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-lightBlack text-base">Last Name</span>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="form-input-field"
            />
          </label>
        </div>

        {/* Email and DOB */}
        <div className="flex flex-col md:flex-row md:gap-10">
          <label className="flex flex-col gap-2">
            <span className="text-lightBlack text-base">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input-field"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-lightBlack text-base">Birthday</span>
            <input
              type="date"
              value={formData.birthDay}
              onChange={(e) => handleChange("birthDay", e.target.value)}
              className="form-input-field"
            />
          </label>
        </div>

        {/* Gender, Height & Weight */}
        <div className="section">
          <h2 className="settings--form-heading">Gender, Height & Weight</h2>
          <div className="flex flex-col gap-3">
            {["Male", "Female", "Rather not say"].map((gender) => (
              <label key={gender} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="form-radio accent-settingsGreen"
                />
                {gender}
              </label>
            ))}
          </div>
        </div>

        {/* Medical Information */}
        <InputSection
          title="Allergies"
          list={formData.allergies}
          setList={(list) => handleChange("allergies", list)}
        />
        <InputSection
          title="Health Conditions"
          list={formData.healthConditions}
          setList={(list) => handleChange("healthConditions", list)}
        />

        {/* Dietary Preferences */}
        <div className="section">
          <h2 className="settings--form-heading">Dietary Preference</h2>
          <select
            className="form-input-field"
            value={formData.dietaryPreference}
            onChange={(e) => handleChange("dietaryPreference", e.target.value)}
          >
            <option value="">Select dietary preference</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Pescatarian">Pescatarian</option>
            <option value="Halal">Halal</option>
            <option value="Kosher">Kosher</option>
          </select>
        </div>

        {/* Save Button */}
        <button type="button" className="form-button" onClick={handleSave}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
