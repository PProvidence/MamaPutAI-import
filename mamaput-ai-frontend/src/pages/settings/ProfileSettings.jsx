import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputSection from "../../components/SettingsComponent/InputSection";
import {
  updateProfileField,
  updateEmail,
} from "../../../redux/userSettingsSlice";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.userSettings.email);
  const profileState = useSelector((state) => state.userSettings.profileState);



  // State for form fields
  const [formData, setFormData] = useState({
    firstName: profileState.firstName,
    lastName: profileState.lastName,
    birthDay: profileState.birthDay,
    gender: profileState.gender,
    height: profileState.height,
    weight: profileState.weight,
    allergies: profileState.allergies || [],
    healthConditions: profileState.healthConditions || [],
    dietaryPreference: profileState.dietaryPreference || "",
    profilePicture: profileState.profilePicture || "/default-profile.png"
  });

  const [email, setEmail] = useState(userEmail);
  const [preview, setPreview] = useState(formData.profilePicture);
  

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
    }
  };

  const handleSave = () => {
    dispatch(updateEmail(email));
    Object.keys(formData).forEach((key) => {
      dispatch(updateProfileField({ field: key, value: formData[key] }));
    });
  };

  return (
    <div className="">
      <h1 className="heading--settings">Profile Settings</h1>

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <img
            src={preview}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-settingsGreen object-cover"
          />
          <label htmlFor="profilePic" className="absolute bottom-0 right-0 bg-gray-300 p-2 rounded-full cursor-pointer">
            📷
          </label>
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePictureChange}
          />
        </div>
        <p className="text-sm text-gray-500">Click the icon to upload a new picture</p>
      </div>

      <form className="py-10 px-5 flex flex-col gap-10">
        {/* Personal Information */}
        <div className="flex flex-col md:flex-row md:gap-10">
          <label className="flex flex-col gap-2">
            <span className="text-lightBlack text-sm font-extralight">First Name</span>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="John"
              className="form-input-field"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-lightBlack text-sm font-extralight">Last Name</span>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Doe"
              className="form-input-field"
            />
          </label>
        </div>

        {/* Email and DOB */}
        <div className="flex flex-col md:flex-row md:gap-10">
          <label className="flex flex-col gap-2">
            <span className="text-lightBlack text-sm font-extralight">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
              className="form-input-field"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-lightBlack text-sm font-extralight">Birthday</span>
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
          <div className="flex flex-col md:gap-10">
            {/* Gender */}
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

            <div className="flex flex-col md:flex-row md:gap-10">
              {/* Height */}
              <label className="flex flex-col gap-2">
                <span className="text-lightBlack text-sm font-extralight">Height (feet)</span>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                  placeholder="e.g. 5.9"
                  className="form-input-field"
                />
              </label>

              {/* Weight */}
              <label className="flex flex-col gap-2">
                <span className="text-lightBlack text-sm font-extralight">Weight (kg)</span>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  placeholder="e.g. 70"
                  className="form-input-field"
                />
              </label>
            </div>
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
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Lactose-Free">Lactose-Free</option>
            <option value="No Restrictions">No Restrictions</option>
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
