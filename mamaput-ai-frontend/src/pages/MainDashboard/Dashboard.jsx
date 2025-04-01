import Banner from '../../utils/banner';
import { useSelector } from "react-redux";
import Header from '../../components/MainDashboardComponents/Header';
import RemindersSection from '../../components/MainDashboardComponents/ReminderSection';
import MealPlanSection from '../../components/MainDashboardComponents/MealPlanSection';

const Dashboard = () => {
  const { 
    calorieIntake = 2200, 
    calorieGoal = 2000, 
    height, 
    weight,  
    carbIntake = 180, 
    proteinIntake = 90, 
    fatIntake = 80 
  } = useSelector((state) => state.userSettings.profileState) || {};

  // Calculate BMI: weight(kg) / (height(m) * height(m))
  const calculateBMI = (weight, height) => {
    // Check if height and weight are available
    if (!height || !weight) {
      return "--";
    }
    
    // Convert height from cm to meters
    const heightInMeters = height / 100;
    // Calculate BMI and round to 1 decimal place
    return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
  };

  // Calculate BMI using the function
  const bmi = calculateBMI(weight, height);
  
  // Handle progress percentages
  const caloriePercentage = Math.min((calorieIntake / (calorieGoal || 2000)) * 100, 100);
  // Only calculate BMI percentage if bmi is a number
  const bmiPercentage = bmi !== "--" ? Math.min((bmi / 40) * 100, 100) : 0;

  const carbPercentage = Math.min((carbIntake / 250) * 100, 100); // Assuming 250g is the daily carb goal
  const proteinPercentage = Math.min((proteinIntake / 150) * 100, 100); // Assuming 150g protein goal
  const fatPercentage = Math.min((fatIntake / 70) * 100, 100); // Assuming 70g fat goal
  
  // Change BMI color based on range dynamically
  const getBmiColor = (bmi) => {
    if (bmi === "--") return "text-gray-400"; // Not set
    if (bmi < 18.5) return "text-blue-500"; // Underweight
    if (bmi >= 18.5 && bmi < 24.9) return "text-green-500"; // Normal weight
    if (bmi >= 25 && bmi < 29.9) return "text-yellow-500"; // Overweight
    return "text-red-500"; // Obese
  };

  // Get BMI status text
  const getBmiStatusText = (bmi) => {
    if (bmi === "--") return "Not calculated";
    if (bmi < 18.5) return "Underweight";
    if (bmi < 24.9) return "Normal";
    if (bmi < 29.9) return "Overweight";
    return "Obese";
  };

  return (
    <div className="p-6 font-instrument-sans bg-gray-50 min-h-screen">
      {/* Top Header */}
      <Header />
      {/* Collapsible banner */}
      <Banner />
      {/* Health Data Section */}
      <div>
      <h3 className="text-lg font-semibold mb-4">Health data</h3>
        <div className="grid grid-cols-3 gap-6">
          {/* 🔴 Calorie Intake Card */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Calorie Intake (per day)</h3>
            <div className="relative flex justify-center">
              <div className="radial-progress text-red-500" style={{ "--value": caloriePercentage }}>
                <span className="text-2xl font-bold">{calorieIntake}</span>
                <p className="text-sm text-gray-500">Calories</p>
              </div>
            </div>
            <p className="mt-2 text-gray-600">{calorieIntake}/{calorieGoal || 2000}</p>
            <p className="text-xs text-red-500">Per day to reach healthy weight</p>
          </div>

          {/* 🥦 Macronutrient Ratios Card */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Macro Nutrient Ratios</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Carbohydrates</span>
                <span>{carbIntake} g</span>
              </div>
              <progress className="progress progress-accent w-full" value={carbPercentage} max="100"></progress>

              <div className="flex justify-between">
                <span>Protein</span>
                <span>{proteinIntake} g</span>
              </div>
              <progress className="progress progress-success w-full" value={proteinPercentage} max="100"></progress>

              <div className="flex justify-between">
                <span>Fats</span>
                <span>{fatIntake} g</span>
              </div>
              <progress className="progress progress-warning w-full" value={fatPercentage} max="100"></progress>
            </div>
          </div>

          {/* 🏋️‍♂️ BMI Card */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Body Mass Index</h3>
            <div className="relative flex justify-center">
              <div className={`radial-progress ${getBmiColor(bmi)}`} style={{ "--value": bmiPercentage }}>
                <span className="text-2xl font-bold">{bmi}</span>
                <p className="text-sm text-gray-500">BMI</p>
              </div>
            </div>
            <p className="mt-2 text-gray-600">Your BMI:</p>
            <p className={`text-md font-semibold ${getBmiColor(bmi)}`}>
              {getBmiStatusText(bmi)}
            </p>
          </div>
        </div>
      </div>

      {/* Personalized Meal Plan */}
      <MealPlanSection />

      {/* Reminders */}
      <RemindersSection />

      {/* Recipes */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Recipes</h3>
        <p className="text-gray-600">Explore and save your favorite recipes here.</p>
        {/* Add recipe components or links here */}
        {/* <TodaysRecipes /> */}
      </div>

    </div>
  );
};

export default Dashboard;