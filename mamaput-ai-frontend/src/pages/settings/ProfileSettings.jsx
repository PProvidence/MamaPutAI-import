import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputSection from "../../components/SettingsComponent/InputSection";
import {
  getUserDetails,
  updateUserDetails,
} from "../../../redux/userSettingsSlice";
import { Pencil } from "lucide-react";
import defaultProfilePic from "../../assets/img/default-profile.jpg";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.userSettings.profileState);
  const userEmail = useSelector((state) => state.userSettings.email);
  const isLoading = useSelector((state) => state.userSettings.isLoading);

  console.log(profileState)
  // Local State
  const [formData, setFormData] = useState({
    name: "",
    DOB: "",
    gender: "",
    height: "",
    weight: "",
    allergies: [],
    health_conditions: [],
    dietary_preferences: [],
    image: "",
  });

  const [email, setEmail] = useState("");
  const [preview, setPreview] = useState(defaultProfilePic);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (profileState) {
      setFormData((prev) => ({
        ...prev,
        ...profileState,
        allergies: profileState.allergies || [],
        health_conditions: profileState.health_conditions || [],
        dietary_preferences: profileState.dietary_preferences || [],
        image: profileState.image,
      }));
      setEmail(userEmail);
      setPreview(profileState.image || defaultProfilePic);
    }
  }, [profileState, userEmail]);

  // Handle Input Changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Profile Picture Preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("Invalid image file. Please upload an image.");
    }
  };

  // Save Profile Data
  const handleSave = async () => {
    try {
      // Transform frontend data to backend format
      const updatedDetails = {
        email,
        name: formData.name,
        DOB: formData.DOB,
        gender: formData.gender,
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
        allergies: formData.allergies,
        health_conditions: formData.health_conditions,
        dietary_preferences: formData.dietary_preferences,
        image: formData.image,
      };

      console.log(updatedDetails);

      // Dispatch the updateUserDetails action and wait for completion
      await dispatch(updateUserDetails(updatedDetails)).unwrap();

      // Fetch the updated details after successful save
      dispatch(getUserDetails());

      console.log("Profile details saved successfully:", updatedDetails);
      alert("Profile details saved successfully!");
    } catch (error) {
      alert("Failed to save profile details: " + error);
    }
  };

  // Show loading spinner or message
  if (isLoading) {
    return <div>Loading...</div>;  // Or you can use a spinner here
  }

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
                onChange={handleImageChange}
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
            disabled={isLoading} // Disable input while loading
          />
        </label>

        {/* Weight, height and gender */}
        <div className="flex flex-col md:flex-row md:gap-10">
          <label className="flex flex-col gap-2">
            <span>Gender</span>
            <select
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="form-input-field"
              disabled={isLoading} // Disable input while loading
            >
              <option value="Male">MALE</option>
              <option value="Female">FEMALE</option>
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span>Height (cm)</span>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => handleChange("height", e.target.value)}
              className="form-input-field"
              disabled={isLoading} // Disable input while loading
            />
          </label>

          <label className="flex flex-col gap-2">
            <span>Weight (kg)</span>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
              className="form-input-field"
              disabled={isLoading} // Disable input while loading
            />
          </label>
        </div>

        <div className="flex flex-col md:flex-row md:gap-10">
          <label className="flex flex-col gap-2">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input-field"
              disabled={isLoading} // Disable input while loading
            />
          </label>
          <label className="flex flex-col gap-2">
            <span>Birthday</span>
            <input
              type="date"
              value={formData.DOB}
              onChange={(e) => handleChange("DOB", e.target.value)}
              className="form-input-field"
              disabled={isLoading} // Disable input while loading
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
          list={formData.health_conditions}
          setList={(list) => handleChange("health_conditions", list)}
        />

        {/* DIETARY PREFERENCE */}
        <div className="section">
          <h2 className="form--heading">Dietary Preference</h2>
          <div className="flex flex-col gap-2">
            {["Vegetarian", "Vegan", "Pescatarian", "Halal", "Kosher"].map(
              (option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.dietary_preferences.includes(option)}
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      let updatedPreferences = [
                        ...formData.dietary_preferences,
                      ];

                      if (checked) {
                        updatedPreferences.push(value);
                      } else {
                        updatedPreferences = updatedPreferences.filter(
                          (item) => item !== value
                        );
                      }

                      handleChange("dietary_preferences", updatedPreferences);
                    }}
                    className="accent-settingsGreen"
                    disabled={isLoading} // Disable checkbox while loading
                  />
                  {option}
                </label>
              )
            )}
          </div>
        </div>

        <button
          type="button"
          className="form-button"
          onClick={handleSave}
          disabled={isLoading} // Disable button during loading
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
