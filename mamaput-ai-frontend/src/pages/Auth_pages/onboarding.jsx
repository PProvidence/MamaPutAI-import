import { Check, XCircle } from "lucide-react";
import { useState } from "react";
import { RiMentalHealthFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import allergensData from "../../data/allergens.json";
import { useDispatch } from "react-redux";
import { updateUserDetails, getUserDetails } from "../../../redux/userSettingsSlice";

const side = [
  {
    title: "Meal Plan Generation",
    description:
      "Generate meal plans with local African recipes tailored to your choice.",
    icon: (
      <svg
        className="bg-amber-200 rounded-full w-8 h-8 p-1 sm:w-8 sm:h-8 flex-shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.30218 3.7718L8.55658 3.401L7.81438 2.8916L7.55998 3.263C7.16278 3.842 7.09258 4.3916 7.17238 4.8482C7.24858 5.2886 7.45918 5.609 7.56118 5.7566L7.56298 5.7596C7.65538 5.8928 7.75498 6.0374 7.79158 6.242C7.82578 6.434 7.81138 6.734 7.54678 7.169L7.31278 7.5536L8.08198 8.0216L8.31598 7.637C8.67838 7.0406 8.75518 6.521 8.67778 6.0848C8.60638 5.6828 8.40958 5.4008 8.31418 5.2634L8.30098 5.2448C8.22118 5.129 8.10178 4.9388 8.05858 4.694C8.01898 4.4648 8.04058 4.154 8.30218 3.7718ZM3.24538 9.2018V9.203H2.60098C2.52218 9.203 2.44416 9.21852 2.37137 9.24867C2.29857 9.27883 2.23243 9.32302 2.17671 9.37874C2.121 9.43445 2.0768 9.5006 2.04665 9.57339C2.0165 9.64619 2.00098 9.72421 2.00098 9.803C2.00098 9.88179 2.0165 9.95982 2.04665 10.0326C2.0768 10.1054 2.121 10.1716 2.17671 10.2273C2.23243 10.283 2.29857 10.3272 2.37137 10.3573C2.44416 10.3875 2.52218 10.403 2.60098 10.403H3.24538C3.24601 11.1982 3.56236 11.9607 4.1249 12.5228C4.68744 13.0849 5.45014 13.4006 6.24538 13.4006H9.80098C10.5962 13.4006 11.3589 13.0849 11.9214 12.5228C12.484 11.9607 12.8003 11.1982 12.801 10.403H13.401C13.5601 10.403 13.7127 10.3398 13.8252 10.2273C13.9378 10.1147 14.001 9.96213 14.001 9.803C14.001 9.64387 13.9378 9.49126 13.8252 9.37874C13.7127 9.26622 13.5601 9.203 13.401 9.203H12.801V9.2018H3.24538ZM5.68198 4.3346L5.42758 4.706C5.24458 4.9724 5.23438 5.18 5.26018 5.3264C5.28838 5.489 5.36818 5.618 5.42638 5.702L5.43718 5.717C5.51038 5.8226 5.67178 6.0536 5.73058 6.383C5.79418 6.743 5.72818 7.1642 5.44138 7.637L5.20738 8.021L4.43818 7.5536L4.67218 7.1696C4.86178 6.8576 4.86478 6.6566 4.84438 6.5396C4.82038 6.4094 4.75738 6.3164 4.68658 6.2144C4.53033 5.99534 4.42347 5.74498 4.37338 5.4806C4.30858 5.1068 4.36738 4.6604 4.68538 4.1966L4.94038 3.8258L5.68198 4.3346ZM11.1738 4.706L11.4282 4.3346L10.686 3.8258L10.4316 4.1966C10.1136 4.6604 10.0542 5.1068 10.1196 5.4806C10.182 5.8388 10.3524 6.0986 10.4328 6.2144C10.5036 6.3164 10.5666 6.4094 10.59 6.5402C10.6104 6.6566 10.608 6.8582 10.4178 7.169L10.1838 7.5536L10.9536 8.0216L11.1876 7.637C11.4744 7.1642 11.5404 6.743 11.4762 6.383C11.4292 6.14193 11.3289 5.9144 11.1828 5.717L11.1726 5.702C11.0907 5.59026 11.034 5.46213 11.0064 5.3264C10.9806 5.18 10.9908 4.9724 11.1738 4.706Z"
          fill="black"
        />
      </svg>
    ),
  },
  {
    title: "Nutritional Analysis",
    description: "Display the nutritional breakdown of recommended meals.",
    icon: (
      <RiMentalHealthFill className="bg-red-200 rounded-full w-8 h-8 p-1 sm:w-8 sm:h-8 flex-shrink-0" />
    ),
  },
  {
    title: "Budget Optimisation",
    description:
      "Mamaput AI will recommend meals that dont drain your pockets, with our budget slider.",
    icon: (
      <svg
        className="bg-amber-200 rounded-full w-8 h-8 p-1 sm:w-8 sm:h-8 flex-shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.7 2.59961C8.28987 2.59946 8.86356 2.79248 9.33337 3.14917C9.80318 3.50586 10.1433 4.00659 10.3016 4.57481L10.3328 4.69781L11.4548 4.41761C11.5368 4.3972 11.6222 4.39434 11.7054 4.40922C11.7886 4.42411 11.8677 4.4564 11.9375 4.50398C12.0074 4.55156 12.0664 4.61336 12.1107 4.68533C12.155 4.7573 12.1836 4.83782 12.1946 4.92161L12.2 4.99961V6.08561C12.5384 6.40978 12.8157 6.7923 13.0184 7.21481L13.1012 7.39961H13.4C13.547 7.39963 13.6888 7.45358 13.7986 7.55124C13.9084 7.64889 13.9786 7.78346 13.9958 7.92941L14 7.99961V9.79961C14 9.89837 13.9757 9.9956 13.9291 10.0827C13.8825 10.1698 13.8152 10.244 13.733 10.2988L13.6682 10.336L12.9674 10.687C12.681 11.2424 12.2653 11.7208 11.7554 12.082L11.6 12.1864V12.7996C11.6 12.9466 11.546 13.0884 11.4484 13.1982C11.3507 13.3081 11.2162 13.3782 11.0702 13.3954L11 13.3996H9.2C9.05304 13.3996 8.9112 13.3456 8.80138 13.248C8.69156 13.1503 8.62139 13.0158 8.6042 12.8698L8.6 12.7996H8C7.99998 12.9466 7.94603 13.0884 7.84837 13.1982C7.75072 13.3081 7.61615 13.3782 7.4702 13.3954L7.4 13.3996H5.6C5.45304 13.3996 5.3112 13.3456 5.20138 13.248C5.09156 13.1503 5.02139 13.0158 5.0042 12.8698L5 12.7996V12.1864C4.56637 11.9095 4.19183 11.5495 3.89793 11.1272C3.60404 10.7049 3.39661 10.2286 3.2876 9.72581C2.93371 9.62066 2.62071 9.40924 2.39102 9.12021C2.16134 8.83117 2.02609 8.47851 2.0036 8.11001L2 7.99961V7.69961C2.00017 7.54668 2.05873 7.39959 2.16371 7.28839C2.26869 7.17719 2.41217 7.11027 2.56484 7.10131C2.7175 7.09234 2.86783 7.14201 2.9851 7.24017C3.10237 7.33832 3.17774 7.47755 3.1958 7.62941L3.2 7.69961V7.99961C3.2008 8.08921 3.2188 8.17221 3.254 8.24861C3.34544 7.70839 3.54968 7.1935 3.85341 6.73748C4.15714 6.28147 4.55355 5.89458 5.0168 5.60201C4.97423 5.2243 5.01189 4.84186 5.12731 4.47971C5.24274 4.11755 5.43333 3.78385 5.68661 3.50044C5.93989 3.21702 6.25016 2.99028 6.59712 2.83505C6.94408 2.67981 7.3199 2.59958 7.7 2.59961ZM10.4 7.39961C10.2409 7.39961 10.0883 7.46282 9.97574 7.57535C9.86321 7.68787 9.8 7.84048 9.8 7.99961C9.8 8.15874 9.86321 8.31135 9.97574 8.42387C10.0883 8.5364 10.2409 8.59961 10.4 8.59961C10.5591 8.59961 10.7117 8.5364 10.8243 8.42387C10.9368 8.31135 11 8.15874 11 7.99961C11 7.84048 10.9368 7.68787 10.8243 7.57535C10.7117 7.46282 10.5591 7.39961 10.4 7.39961ZM7.7 3.79961C7.33658 3.79961 6.98551 3.93155 6.71204 4.17091C6.43858 4.41028 6.26132 4.74078 6.2132 5.10101C6.50395 5.03338 6.80149 4.99936 7.1 4.99961H9.1262L9.1682 4.98941C9.09705 4.65278 8.91233 4.35085 8.64503 4.13423C8.37772 3.91761 8.04406 3.79947 7.7 3.79961Z"
          fill="black"
        />
      </svg>
    ),
  },
  {
    title: "FeedBack Systems",
    description:
      "Our feedback system learns from your meal ratings and preferences to improve your personalised recommendations over time.",
    icon: (
      <svg
        className="bg-blue-200 rounded-full w-8 h-8 p-1 sm:w-8 sm:h-8 flex-shrink-0"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.35019 2.14941C9.1115 2.14941 8.88258 2.24424 8.7138 2.41302C8.54502 2.5818 8.4502 2.81072 8.4502 3.04941V4.84941C8.4502 5.08811 8.54502 5.31703 8.7138 5.48581C8.88258 5.65459 9.1115 5.74941 9.35019 5.74941V7.09941L10.9702 5.74941H12.9502C13.1889 5.74941 13.4178 5.65459 13.5866 5.48581C13.7554 5.31703 13.8502 5.08811 13.8502 4.84941V3.04941C13.8502 2.81072 13.7554 2.5818 13.5866 2.41302C13.4178 2.24424 13.1889 2.14941 12.9502 2.14941H9.35019ZM5.3002 4.39941C4.82281 4.39941 4.36497 4.58906 4.0274 4.92662C3.68984 5.26419 3.5002 5.72202 3.5002 6.19941C3.5002 6.6768 3.68984 7.13464 4.0274 7.47221C4.36497 7.80977 4.82281 7.99941 5.3002 7.99941C5.77759 7.99941 6.23542 7.80977 6.57299 7.47221C6.91055 7.13464 7.10019 6.6768 7.10019 6.19941C7.10019 5.72202 6.91055 5.26419 6.57299 4.92662C6.23542 4.58906 5.77759 4.39941 5.3002 4.39941ZM7.5502 8.89941H3.0502C2.69215 8.89941 2.34878 9.04165 2.0956 9.29482C1.84243 9.54799 1.7002 9.89137 1.7002 10.2494C1.7002 11.2538 2.1133 12.0584 2.791 12.6029C3.4579 13.1384 4.3525 13.3994 5.3002 13.3994C6.2479 13.3994 7.1425 13.1384 7.8094 12.6029C8.4862 12.0584 8.9002 11.2538 8.9002 10.2494C8.9002 9.89137 8.75796 9.54799 8.50479 9.29482C8.25162 9.04165 7.90824 8.89941 7.5502 8.89941Z" />
      </svg>
    ),
  },
];

const step = ["gender", "goal", "background", "allergies"];

const ProgressBar = ({ currentIndex }) => {
  return (
    <div className="flex items-start space-x-4 mt-4">
      {step.map((item, index) => (
        <div
          key={item}
          className={`h-1 w-full md:w-28 rounded-full ${
            currentIndex >= index ? "bg-green-600" : "bg-gray-200"
          }`}
        ></div>
      ))}
    </div>
  );
};

const healthConditions = [
  "Ulcer",
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Heart Disease",
];
const dietaryPreferences = [
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Keto",
  "Halal",
  "Kosher",
  "Paleo",
];

const Onboarding = () => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState("gender"); // 'gender' | 'goal' | 'background' | 'allergies'
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedGoal, setSelectedGoal] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedHealthCondition, setSelectedHealthCondition] = useState([]);
  const [selectedDietaryPreference, setSelectedDietaryPreference] = useState(
    []
  );
  const [unit, setUnit] = useState("metric"); // "metric" or "imperial"
  const [height, setHeight] = useState({ cm: "", feet: "", inches: "" });
  const [weight, setWeight] = useState({ kg: "", lbs: "" });
  const [showModal, setShowModal] = useState(false); // Track modal state
  const navigate = useNavigate();
  const currentIndex = step.indexOf(currentStep);
  const nextStep = () => {
    const currentIndex = step.indexOf(currentStep);
    if (currentIndex < step.length - 1) {
      setCurrentStep(step[currentIndex + 1]);
    } else {
      // Show modal when completing the final step
      setShowModal(true);
      setTimeout(() => {
        navigate("/dashboard"); // Redirect after 2 seconds
      }, 2000);
    }
  };
  const prevStep = () => {
    if (currentIndex > 0) {
      setCurrentStep(step[currentIndex - 1]);
    }
  };

  const toggleUnit = () => {
    if (unit === "metric") {
      setUnit("imperial");
      const cm = height.cm ? parseFloat(height.cm) : 0;
      setHeight({
        cm: "",
        feet: Math.floor(cm / 2.54 / 12),
        inches: Math.round((cm / 2.54) % 12),
      });
      const kg = weight.kg ? parseFloat(weight.kg) : 0;
      setWeight({ kg: "", lbs: Math.round(kg * 2.20462) });
    } else {
      setUnit("metric");
      const feet = height.feet ? parseFloat(height.feet) : 0;
      const inches = height.inches ? parseFloat(height.inches) : 0;
      setHeight({
        cm: Math.round((feet * 12 + inches) * 2.54),
        feet: "",
        inches: "",
      });
      const lbs = weight.lbs ? parseFloat(weight.lbs) : 0;
      setWeight({ kg: Math.round(lbs / 2.20462), lbs: "" });
    }
  };

  const allergyOptions = allergensData.map((allergen) => ({
    label: allergen.Allergen, // Use allergen name as label
    value: allergen.Allergen, // Use allergen name as value
  }));
  const toggleGoal = (goal) => {
    setSelectedGoal((prevGoals) =>
      prevGoals.includes(goal)
        ? prevGoals.filter((g) => g !== goal)
        : [...prevGoals, goal]
    );
  };

  // Save profile details to the backend
  const handleSave = async () => {
    try {
      // Transform frontend data to match backend format
      const updatedDetails = {
        gender: selectedGender,
        height: parseInt(height.cm),
        weight: unit === "metric" ? parseInt(weight.kg) : parseInt(weight.lbs),
        allergies: selectedAllergies,
        health_conditions: selectedHealthCondition,
        dietary_preferences: selectedDietaryPreference,
      };

      console.log("Saving Profile Details:", updatedDetails);

      // Dispatch the updateUserDetails action and wait for completion
      await dispatch(updateUserDetails(updatedDetails)).unwrap();

      // Fetch the updated details after successful save
      dispatch(getUserDetails());

      console.log("Profile details saved successfully!");
      alert("Profile details saved successfully!");
    } catch (error) {
      console.error("Error saving profile details:", error);
      alert("Failed to save profile details. Please try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row ">
      {/* Left Section */}
      <div
        style={{
          backgroundColor: "rgba(209, 212 , 219, 0.2)",
          boxShadow: "0px 4px 24px 0px #00000008",
        }}
        className="w-full md:w-1/4 flex flex-col justify-center items-start p-6 md:p-8 "
      >
        {side.map((side, index) => (
          <div key={index} className="flex items-start gap-2  mb-6">
            {side.icon} {/* Dynamically render the icon */}
            <div>
              <p className="text-base font-semibold text-gray-800 mb-2">
                {side.title}
              </p>
              <p className="text-xs text-gray-400 mb-4">{side.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Right Section */}
      <div className="w-full md:w-2/4 p-6 md:p-12">
        {currentStep === "gender" && (
          <>
            <h2 className="text-2xl pb-4 font-bold text-gray-800">
              Welcome! Let’s set up your profile
            </h2>
            <p className="text-sm pb-4 mb-2 text-gray-800">
              Remember you can always modify this setting on your dashboard
              account settings.
            </p>

            <ProgressBar currentIndex={currentIndex} />

            <div className="space-y-4 mt-4">
              <h2 className="text-xl font-bold text-gray-900">
                What is your gender?
              </h2>
              <p className="text-sm text-gray-500">
                A gender gives an identity to our AI to optimize your
                experience.
              </p>

              {/* Gender Options */}
              {["Male", "Female", "Rather not say"].map((gender) => (
                <label
                  key={gender}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={selectedGender === gender}
                    onChange={() => setSelectedGender(gender)}
                    className="hidden peer"
                  />
                  <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-green-600 peer-checked:bg-green-600">
                    {selectedGender === gender && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-gray-800">{gender}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={nextStep}
                className="w-25 mt-4 rounded-md py-2 bg-white text-green-600 text-sm font-semibold shadow-lg transition"
              >
                Skip this step
              </button>
              <button
                onClick={() => {
                  if (selectedGender) {
                    nextStep();
                  } else {
                    alert("Please select your gender to proceed.");
                  }
                }}
                className={`w-25 mt-4 rounded-md py-2 text-white ${
                  selectedGender
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                } text-sm transition`}
                disabled={!selectedGender}
              >
                Next Step
              </button>
            </div>
          </>
        )}
        {currentStep === "goal" && (
          <>
            <h2 className="text-2xl pb-4 font-bold text-gray-800">
              Few details to kick things off
            </h2>
            <p className="text-sm pb-4 mb-2 text-gray-800">
              Remember you can always modify this setting on your dashboard
              account settings.
            </p>

            <ProgressBar currentIndex={currentIndex} />

            <div className="space-y-4 mt-4">
              <h2 className="text-xl font-bold text-gray-900">
                What is your goal?
              </h2>
              <p className="text-sm text-gray-500">
                Specifying your goal, will help us tailor the app to your needs.
              </p>

              {/* Goal Options */}
              {[
                "Gain Weight",
                "Eat Healthy",
                "Lose Weight",
                "Manage health condition",
                "None",
              ].map((goal) => (
                <label
                  key={goal}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedGoal.includes(goal)}
                    onChange={() => toggleGoal(goal)}
                    className="hidden peer"
                  />
                  <div className="w-6 h-6 border-2 border-gray-400 rounded flex items-center justify-center peer-checked:border-green-600 peer-checked:bg-green-600">
                    {selectedGoal.includes(goal) && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-gray-800">{goal}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-6  ">
              <button
                onClick={prevStep}
                className="w-25 mt-4 rounded-md py-2 text-white bg-green-600 text-sm hover:bg-green-700 transition"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="w-25 mt-4 rounded-md py-2 bg-white text-green-600 text-sm font-semibold shadow-lg transition"
              >
                Skip this step
              </button>
              <button
                onClick={() => {
                  if (selectedGoal.length > 0) {
                    nextStep();
                  } else {
                    alert("Please select at least one goal to proceed.");
                  }
                }}
                className={`w-25 mt-4 rounded-md py-2 text-white ${
                  selectedGoal.length > 0
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                } text-sm transition`}
                disabled={selectedGoal.length === 0}
              >
                Next Step
              </button>
            </div>
          </>
        )}
        {currentStep === "background" && (
          <>
            <h2 className="text-2xl pb-4 font-bold text-gray-800">
              Almost there!
            </h2>
            <p className="text-sm pb-4 mb-2 text-gray-800">
              Remember you can always modify this setting on your dashboard
              account settings.
            </p>

            <ProgressBar currentIndex={currentIndex} />

            <div className="space-y-4 mt-4">
              <h2 className="text-xl font-bold text-gray-900">
                A little about your background
              </h2>
              <p className="text-sm text-gray-500">
                Mamaput AI is tailored to fit each user needs, lets know a bit
                about you
              </p>
            </div>

            {/* Unit Toggle Switch */}
            <div className="flex items-center my-4 space-x-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={unit === "imperial"}
                  onChange={toggleUnit}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-green-300 dark:bg-gray-700 peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 rounded-full"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {unit === "metric" ? "Metric" : "Imperial"}
                </span>
              </label>
            </div>

            <div className="flex gap-6">
              {/* Height Input */}
              <div className="my-4">
                <label className="block font-semibold">Height</label>
                {unit === "metric" ? (
                  <input
                    type="number"
                    value={height.cm}
                    onChange={(e) =>
                      setHeight({ ...height, cm: e.target.value })
                    }
                    placeholder="Enter height in cm"
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={height.feet}
                      onChange={(e) =>
                        setHeight({ ...height, feet: e.target.value })
                      }
                      placeholder="Feet"
                      className="border border-gray-300 p-2 rounded w-1/2"
                    />
                    <input
                      type="number"
                      value={height.inches}
                      onChange={(e) =>
                        setHeight({ ...height, inches: e.target.value })
                      }
                      placeholder="Inches"
                      className="border border-gray-300 p-2 rounded w-1/2"
                    />
                  </div>
                )}
              </div>

              {/* Weight Input */}
              <div className="my-4">
                <label className="block font-semibold">Weight</label>
                {unit === "metric" ? (
                  <input
                    type="number"
                    value={weight.kg}
                    onChange={(e) =>
                      setWeight({ ...weight, kg: e.target.value })
                    }
                    placeholder="Enter weight in kg"
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                ) : (
                  <input
                    type="number"
                    value={weight.lbs}
                    onChange={(e) =>
                      setWeight({ ...weight, lbs: e.target.value })
                    }
                    placeholder="Enter weight in lbs"
                    className="border border-gray-300  p-2 rounded w-full"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-900">
                Date of Birth
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full p-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500 appearance-none"
                  onFocus={(e) => (e.target.style.color = "black")} // Ensure input text turns black on focus
                  style={{
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="w-25 mt-4 rounded-md py-2 text-white bg-green-600 text-sm hover:bg-green-700 transition"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="w-25 mt-4 rounded-md py-2 bg-white text-green-600 text-sm font-semibold shadow-lg transition"
              >
                Skip this step
              </button>
              <button
                onClick={() => {
                  if (
                    (height.cm && height.cm !== "") ||
                    (height.feet && height.feet !== "") ||
                    (weight.kg && weight.kg !== "") ||
                    (weight.lbs && weight.lbs !== "")
                  ) {
                    nextStep();
                  } else {
                    alert("Please enter your height or weight to proceed.");
                  }
                }}
                className={`w-25 mt-4 rounded-md py-2 text-white ${
                  (height.cm && height.cm !== "") ||
                  (height.feet && height.feet !== "") ||
                  (weight.kg && weight.kg !== "") ||
                  (weight.lbs && weight.lbs !== "")
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                } text-sm transition`}
                disabled={
                  !(
                    (height.cm && height.cm !== "") ||
                    (height.feet && height.feet !== "") ||
                    (weight.kg && weight.kg !== "") ||
                    (weight.lbs && weight.lbs !== "")
                  )
                }
              >
                Next Step
              </button>
            </div>
          </>
        )}
        {currentStep === "allergies" && (
          <>
            <h2 className="text-2xl pb-4 font-bold text-gray-800">
              Yay!! You made it!
            </h2>
            <p className="text-sm pb-4 mb-2 text-gray-800">
              Remember you can always modify this setting on your dashboard
              account settings.
            </p>

            <ProgressBar currentIndex={currentIndex} />

            <div className="space-y-4 mt-4">
              <h2 className="text-xl font-bold text-gray-900">
                Allergies and conditions
              </h2>
              <p className="text-sm text-gray-500">
                Please specify if you have any of the following health
                conditions or allergies, to avoid recommending meals that might
                worsen the situation.
              </p>
            </div>
            {/* Allergies */}
            <div className="flex flex-col mb-6">
              <label className="font-semibold mb-2">Allergies</label>
              <Select
                options={allergyOptions}
                isMulti
                value={selectedAllergies}
                onChange={setSelectedAllergies}
                className="border rounded-lg"
                classNamePrefix="custom-select"
                placeholder="Select allergies..."
              />
              {selectedAllergies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedAllergies.map((allergy) => (
                    <button
                      key={allergy.value}
                      type="button"
                      className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-sm font-medium flex items-center space-x-1"
                      onClick={() =>
                        setSelectedAllergies(
                          selectedAllergies.filter(
                            (a) => a.value !== allergy.value
                          )
                        )
                      }
                    >
                      <span>{allergy.label}</span>{" "}
                      {/* Access the label property */}
                      <XCircle className="h-4 w-4 fill-current" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Health Condition */}
            <div className="flex flex-col mb-6">
              <label className="font-semibold mb-2">Health Condition</label>
              <Select
                options={healthConditions.map((h) => ({ label: h, value: h }))}
                value={selectedHealthCondition}
                onChange={setSelectedHealthCondition}
                isMulti
                className="border rounded-lg"
                classNamePrefix="custom-select"
                placeholder="Select health condition..."
              />
              {selectedHealthCondition.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedHealthCondition.map((condition) => (
                    <button
                      key={condition.value} // Assuming you're using react-select for this as well
                      type="button"
                      className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md text-sm font-medium flex items-center space-x-1"
                      onClick={() =>
                        setSelectedHealthCondition(
                          selectedHealthCondition.filter(
                            (c) => c.value !== condition.value
                          )
                        )
                      }
                    >
                      <span>{condition.label}</span>{" "}
                      {/* Access the label property */}
                      <XCircle className="h-4 w-4 fill-current" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dietary Preference */}
            <div className="flex flex-col mb-6">
              <label className="font-semibold mb-2">Dietary Preference</label>
              <Select
                options={dietaryPreferences.map((d) => ({
                  label: d,
                  value: d,
                }))}
                value={selectedDietaryPreference}
                onChange={setSelectedDietaryPreference}
                isMulti
                className="border rounded-lg"
                classNamePrefix="custom-select"
                placeholder="Select dietary preference..."
              />
              {selectedDietaryPreference.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedDietaryPreference.map((preference) => (
                    <button
                      key={preference.value} //Assuming you're using react-select for this as well
                      type="button"
                      className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm font-medium flex items-center space-x-1"
                      onClick={() =>
                        setSelectedDietaryPreference(
                          selectedDietaryPreference.filter(
                            (p) => p.value !== preference.value
                          )
                        )
                      }
                    >
                      <span>{preference.label}</span>
                      <XCircle className="h-4 w-4 fill-current" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6  ">
              <button
                onClick={prevStep}
                className="w-25 mt-4 rounded-md py-2 text-white bg-green-600 text-sm hover:bg-green-700 transition"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setShowModal(true); // Show modal first
                  setTimeout(() => {
                    navigate("/dashboard"); // Redirect to dashboard after delay
                  }, 2000); // Adjust timing if needed
                }}
                className="w-25 mt-4 rounded-md py-2 bg-white text-green-600 text-sm font-semibold shadow-lg transition"
              >
                Skip this step
              </button>
              <button
                onClick={() => {
                  // Check if any allergy, health condition, or dietary preference is selected
                  if (
                    selectedAllergies.length > 0 ||
                    selectedHealthCondition.length > 0 ||
                    selectedDietaryPreference.length > 0
                  ) {
                    handleSave(); // Call handleSave function
                    setShowModal(true); // Show modal
                    setTimeout(() => {
                      navigate("/dashboard"); // Redirect after 2 sec
                    }, 2000);
                  } else {
                    // Optionally, provide feedback to the user that they need to select something
                    alert(
                      "Please select at least one allergy, health condition, or dietary preference to proceed."
                    );
                  }
                }}
                className={`w-25 mt-4 rounded-md py-2 text-white ${
                  selectedAllergies.length > 0 ||
                  selectedHealthCondition.length > 0 ||
                  selectedDietaryPreference.length > 0
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed" // Disable the button if no input
                } text-sm transition`}
                disabled={
                  selectedAllergies.length === 0 &&
                  selectedHealthCondition.length === 0 &&
                  selectedDietaryPreference.length === 0
                }
              >
                {currentIndex === step.length - 1 ? "Complete" : "Next"}
              </button>

              {/* Logging You In Modal */}
              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Logging you in...
                    </h2>
                    <p className="text-gray-500 mt-2">
                      Please wait while we redirect you.
                    </p>
                    <div className="mt-4 flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-green-500"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
