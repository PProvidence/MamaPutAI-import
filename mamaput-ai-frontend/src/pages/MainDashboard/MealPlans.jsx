import { useState } from 'react';
import { format } from 'date-fns';
import { ChevronLeft, Sparkles, X } from 'lucide-react';
import { IoFilterOutline } from "react-icons/io5";
import pap from '../../assets/img/pap.svg'; 
import meatpie from '../../assets/img/meatpie.svg';
import jollof from '../../assets/img/jollof.svg';
import amala from '../../assets/img/amala.svg';

const initialMealPlans = {
  Sunday: [
    { type: 'Breakfast', name: 'Pap(Ogi) with milk, Bean Pudding (moi moi), and fried fish', image: pap },
    { type: 'Snack', name: 'Meat pie and watermelon juice', image: meatpie },
    { type: 'Lunch', name: 'Jollof rice, fried plantain, and roasted turkey with water', image: jollof },
    { type: 'Dinner', name: 'Amala with ewedu, gbegiri, soup, and meat, with water', image: amala }
  ],
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: []
};

const mealTypes = ["Breakfast", "Snack", "Lunch", "Dinner"];

const MealPlans = () => {
  const today = format(new Date(), 'EEEE'); // Get current day dynamically
  const [activeTab, setActiveTab] = useState('Today');
  const [selectedDay, setSelectedDay] = useState(today);
  const [mealPlans, setMealPlans] = useState(initialMealPlans); // Store meal plans in state

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const selectedMeals = mealPlans[selectedDay] || [];

  // Group meals by type
  const mealsByType = mealTypes.map((type) => {
    return selectedMeals.find((meal) => meal.type === type) || { type, name: "No meal selected", image: null };
  });

  const handleGoBack = () => {
    window.history.back();
  };

  const handleRemoveMeal = (mealType) => {
    setMealPlans((prevPlans) => ({
      ...prevPlans,
      [selectedDay]: prevPlans[selectedDay].map((meal) =>
        meal.type === mealType ? { type: mealType, name: "No meal selected", image: null } : meal
      )
    }));
  };

  return (
    <div className="p-6 font-instrument-sans">
      {/* Header */}
      <div className="flex items-center mb-6">
        <ChevronLeft className="mr-4 cursor-pointer hover:text-pryGreen" onClick={handleGoBack} />
        <h1 className="text-xl xl:text-2xl font-bold">Meal Plans</h1>
      </div>

      {/* Description */}
      <div className="my-10">
        <h3 className="font-bold">Your Plans</h3>
        <p className="text-gray-600 py-3">
          Meal plan generation helps you structure meals ahead, so you can plan groceries and eat efficiently.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {["Today", "ThisWeek"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === tab ? "bg-green-600 text-white" : "border border-gray-300 text-gray-700"
            }`}
            onClick={() => {
              setActiveTab(tab);
              setSelectedDay(today); // Reset to today's meals when "Today" is clicked
            }}
          >
            {tab === "Today" ? "Today" : "This week"}
          </button>
        ))}

      </div>

      {/* Weekday Tabs */}
      <div className="flex space-x-4 mb-4">
        {activeTab === 'ThisWeek' ? (
          daysOfWeek.map((day) => (
            <button
              key={day}
              className={`px-4 py-2 border rounded-lg text-sm font-semibold transition ${
                selectedDay === day ? 'text-green-600 border-green-600' : 'text-gray-700 border-gray-300'
              }`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))
        ) : (
          <button
            key={selectedDay}
            className="px-4 py-2 border border-green-600 text-green-600 rounded-lg text-sm font-semibold transition"
          >
            {selectedDay}
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-5 py-3 my-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition">
          <Sparkles className="w-6 h-6" />
          <span className="font-semibold">Regenerate with AI</span>
        </button>

        <button className="border border-gray-300 rounded-lg px-4 py-2 flex items-center space-x-2">
          <IoFilterOutline className="w-6 h-6" />
          <span className="font-semibold">Filter</span>
        </button>
      </div>

      {/* Meal Plan Cards */}
      {selectedMeals.length > 0 || mealsByType.some(meal => meal.name !== "No meal selected") ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mealsByType.map((meal, index) => {
            const isMealSelected = meal.image; // Check if meal is selected
            return (
              <div
                key={index}
                className={`relative rounded-lg hover:border-3 hover:border-pryGreen overflow-hidden shadow-md group h-40 bg-cover bg-center ${
                  isMealSelected ? "" : "bg-gray-800"
                }`}
                style={{
                  backgroundImage: isMealSelected
                    ? `url(${meal.image})`
                    : "linear-gradient(to bottom, #3d3d3d, #1a1a1a)" // Default dark gray background
                }}
              >
                {/* Content Overlay */}
                <div className="absolute px-4 py-4 inset-0 bg-black opacity-30 group-hover:opacity-65 transition duration-300 flex flex-col text-white text-center backdrop-blur-sm group-hover:backdrop-blur-md">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-left text-sm">{meal.type}</h3>
                    {isMealSelected && (
                      <button
                        className="text-gray-500 hover:text-red-500 transition duration-300"
                        onClick={() => handleRemoveMeal(meal.type)}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  <p className="text-xs my-3 text-start max-w-7/12">
                    {isMealSelected ? meal.name : `No meal selected`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full text-center py-10 text-gray-500 text-lg">
          No meal selected for {selectedDay}
        </div>
      )}
    </div>
  );
};

export default MealPlans;