import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputSection from "../../components/SettingsComponent/InputSection";
import {
  updateUserDetails,
  getUserDetails,
} from "../../../redux/userSettingsSlice";
import { Pencil } from "lucide-react";
import defaultProfilePic from "../../assets/img/default-profile.jpg";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.userSettings.profileState);
  const userEmail = useSelector((state) => state.userSettings.email);

  // Local State
  const [formData, setFormData] = useState({
    name: "",
    DOB: "",
    gender: "",
    height: "",
    weight: "",
    allergies: [],
    healthConditions: [],
    dietaryPreference: [],
    profilePicture: defaultProfilePic,
  });

  const [email, setEmail] = useState("");
  const [preview, setPreview] = useState(defaultProfilePic);

  useEffect(() => {
    if (profileState) {
      setFormData((prev) => ({
        ...prev,
        ...profileState,
        allergies: profileState.allergies || [],
        healthConditions: profileState.healthConditions || [],
        dietaryPreference: profileState.dietaryPreference || [],
        profilePicture: profileState.profilePicture ,
      }));
      setEmail(userEmail);
      setPreview(profileState.profilePicture || defaultProfilePic);
    }
  }, [profileState, userEmail]);

  // Handle Input Changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Profile Picture Preview
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);

      setFormData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  // Save Profile Data
  const handleSave = async () => {
    // Transform frontend data to backend format
    const updatedDetails = {
      email,
      name: formData.name,
 
      gender: formData.gender,
      height: formData.height,
      weight: formData.weight,
      allergies: formData.allergies,
      health_conditions: formData.healthConditions,
      dietary_preferences: formData.dietaryPreference,
      image: formData.profilePicture,
    };

    try {
      if (formData.profilePicture instanceof File) {
        const formDataUpload = new FormData();
        formDataUpload.append("profilePicture", formData.profilePicture);
      
        // Upload the picture and get the URL
        // const url = await uploadProfilePicture(formDataUpload);
        // updatedDetails.profilePicture = url;
      } else {
        updatedDetails.profilePicture = formData.profilePicture;
      }
      await dispatch(updateUserDetails(updatedDetails)).unwrap();
      alert("Profile details saved successfully!");
    } catch (error) {
      alert("Failed to save profile details: " + error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="heading--settings">Profile Settings</h1>

      <form className="py-10 px-5 flex flex-col gap-10">
        {/* PROFILE PICTURE */}
        <div className="relative flex flex-col gap-5">
          <div className="relative w-40 h-40">
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
          <p className="text-base text-gray-500">
            Click the icon to upload a new picture
          </p>
        </div>

        {/* PERSONAL DETAILS */}

        <label className="flex flex-col gap-2">
          <span>Name</span>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="form-input-field"
          />
        </label>

        <div className="flex flex-col md:flex-row md:gap-10">
          <label className="flex flex-col gap-2">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input-field"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span>Birthday</span>
            <input
              type="date"
              value={formData.DOB}
              onChange={(e) => handleChange("DOB", e.target.value)}
              className="form-input-field"
            />
          </label>
        </div>

        {/* ALLERGIES & CONDITIONS */}
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

        {/* DIETARY PREFERENCE */}
        <div className="section">
          <h2>Dietary Preference</h2>
          <div className="flex flex-col gap-2">
            {["Vegetarian", "Vegan", "Pescatarian", "Halal", "Kosher"].map(
              (option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.dietaryPreference.includes(option)}
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      let updatedPreferences = [...formData.dietaryPreference];

                      if (checked) {
                        updatedPreferences.push(value);
                      } else {
                        updatedPreferences = updatedPreferences.filter(
                          (item) => item !== value
                        );
                      }

                      handleChange("dietaryPreference", updatedPreferences);
                    }}
                    className="accent-settingsGreen"
                  />
                  {option}
                </label>
              )
            )}
          </div>
        </div>

        <button type="button" className="form-button" onClick={handleSave}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
