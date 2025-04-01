import { useState } from 'react';
import { format } from 'date-fns';
import { Plus, X } from 'lucide-react';
import { IoFilterOutline } from "react-icons/io5";  // Import the filter icon
import MealFilters from './MealFilters'; // Import the MealFilters component
// Import meal images
import pap from '../../assets/img/pap.svg';
import meatpie from '../../assets/img/meatpie.svg';
import jollof from '../../assets/img/jollof.svg';
import amala from '../../assets/img/amala.svg';

// Mock meal data with imported images
const initialMealPlans = {
    Sunday: [
        { type: 'Breakfast', name: 'Pap(Ogi) with milk, Bean Pudding (moi moi), and fried fish', image: pap, budget: "Mid-range", mealType: "Breakfast" },
        { type: 'Snack', name: 'Meat pie and watermelon juice', image: meatpie, budget: "Na 2k I get", mealType: "Snacks" },
        { type: 'Lunch', name: 'Jollof rice, fried plantain, and roasted turkey with water', image: jollof, budget: "Mid-range", mealType: "Lunch" },
        { type: 'Dinner', name: 'Amala with ewedu, gbegiri, soup, and meat, with water', image: amala, budget: "Baller levels", mealType: "Dinner" }
    ],
    Monday: [
        { type: 'Breakfast', name: 'Oatmeal with fruits and nuts', image: pap, budget: "Na 2k I get", mealType: "Breakfast" },
        { type: 'Lunch', name: 'Chicken salad sandwich', image: meatpie, budget: "Mid-range", mealType: "Lunch" },
    ],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: []
};
const mealTypesList = ['Breakfast', 'Snack', 'Lunch', 'Dinner'];
const budgetList = ["Na 2k I get", "Mid-range", "Baller levels"];

const MealPlanSection = () => {
    const today = format(new Date(), 'EEEE');
    const [activeTab, setActiveTab] = useState('Today');
    const [selectedDay, setSelectedDay] = useState(today);
    const [mealPlans, setMealPlans] = useState(initialMealPlans); // Use the mock data
    const [isFilterOpen, setIsFilterOpen] = useState(false);  // State to control filter visibility
      const [filters, setFilters] = useState({  // Initialize filters state
        budget: [],
        mealType: [],
    });
    // const [filtersActive, setFiltersActive] = useState(false);
    const [modalMeal, setModalMeal] = useState(null);
    
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Apply filters to selected meals
    const selectedMeals = mealPlans[selectedDay] || [];
    const filteredMeals = selectedMeals.filter((meal) => {
        const budgetMatch = filters.budget.length === 0 || filters.budget.includes(meal.budget);
        const mealTypeMatch = filters.mealType.length === 0 || filters.mealType.includes(meal.mealType);
        return budgetMatch && mealTypeMatch;
    });

    // Group meals by type after filtering
    const mealsByType = mealTypesList.map((type) => {
        return filteredMeals.find((meal) => meal.type === type) || { type, name: "No meal selected", image: null };
    });
    
    const [ignoreFilters, setIgnoreFilters] = useState(false);

    // Toggle meal selection
    const toggleMealSelection = (mealType) => {
        setMealPlans(prevPlans => {
            const updatedPlans = { ...prevPlans };
            const dayMeals = [...updatedPlans[selectedDay]];
            
            const mealIndex = dayMeals.findIndex(meal => meal.type === mealType);
            if (mealIndex !== -1) {
                dayMeals[mealIndex] = { ...dayMeals[mealIndex], selected: !dayMeals[mealIndex].selected };
                updatedPlans[selectedDay] = dayMeals;
            }
            
            return updatedPlans;
        });
        // Close modal after toggling
        setModalMeal(null);
    };

    // Open modal with meal details
    const openMealModal = (meal) => {
        setModalMeal(meal);
    };

    // Close modal
    const closeMealModal = () => {
        setModalMeal(null);
    };

    return (
        <div className="p-4 md:p-6 font-instrument-sans">
            {/* Header */}
            <div className="mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold">Meal Plans</h2>
            </div>

            {/* Description */}
            <div className="mb-8">
                <p className="text-gray-600">
                    Meal plan generation helps you structure meals ahead, so you can plan groceries and eat efficiently.
                </p>
            </div>


            <div className='md:flex md:flex-wrap md:justify-between space-x-4'>
                {/* Tabs */}
                <div className="flex gap-4 py-3 md:my-2">
                    {["Today", "ThisWeek"].map((tab) => (
                        <button
                            key={tab}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${activeTab === tab ? "bg-green-600 text-white" : "border border-gray-300 text-gray-700"}`}
                            onClick={() => {
                                setActiveTab(tab);
                                setSelectedDay(today);
                            }}
                        >
                            {tab === "Today" ? "Today" : "This week"}
                        </button>
                    ))}
                </div>
                {/* Action Buttons */}
                <div className="flex gap-5 py-3 md:my-2 relative">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition"
                        onClick={() => {
                            if (ignoreFilters) {
                                setFilters({ budget: [], mealType: [] }); // Ignore filters
                                setIgnoreFilters(false); // Reset ignore state
                            }
                            // Logic for generating a new plan
                        }}
                    >
                        <Plus className="w-6 h-6" />
                        <span className="font-semibold">Generate new plan</span>
                    </button>

                    <button className="border border-gray-300 cursor-pointer hover:text-pryGreen rounded-lg px-4 py-2 flex items-center space-x-2" 
                        onClick={() => setIsFilterOpen(!isFilterOpen)} 
                        onDoubleClick={() => {
                            setFilters({ budget: [], mealType: [] }); // Reset filters
                        }}
                    >
                    <IoFilterOutline className={`w-6 h-6 ${filters.budget.length || filters.mealType.length ? 'text-pryGreen' : ''}`} />
                    <span className="font-semibold">Filter</span>
                    </button>
                    
                    {/* Filter Dropdown */}
                    {isFilterOpen && (
                        <div className="absolute top-12 right-0 z-10">
                            <MealFilters filters={filters} setFilters={setFilters} />
                        </div>
                    )}
                </div>

            </div>

            {/* Weekday Tabs */}
            <div className="flex space-x-4 mb-4 overflow-x-auto">
                {activeTab === 'ThisWeek' ? (
                    daysOfWeek.map((day) => (
                        <button
                            key={day}
                            className={`px-4 py-2 border rounded-lg text-sm font-semibold transition whitespace-nowrap ${selectedDay === day ? 'text-green-600 border-green-600' : 'text-gray-700 border-gray-300'}`}
                            onClick={() => setSelectedDay(day)}
                        >
                            {day}
                        </button>
                    ))
                ) : (
                    <button
                        className="px-4 py-2 border border-green-600 text-green-600 rounded-lg text-sm font-semibold transition whitespace-nowrap"
                        onClick={() => setSelectedDay(today)}
                    >
                        {today}
                    </button>
                )}
            </div>

            {/* Meal Plan Cards */}
            {filteredMeals.length > 0 || mealsByType.some(meal => meal.name !== "No meal selected") ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mealsByType.map((meal, index) => {
                        const isMealSelected = meal.image;
                        const isSelected = meal.selected;
                        
                        return (
                            <div
                                key={index}
                                className={`h-48 overflow-hidden relative rounded-lg transition-all duration-300 ${isMealSelected ? "" : "bg-gray-800"}`}
                                style={{
                                    backgroundImage: isMealSelected ? `url(${meal.image})` : "none",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="absolute inset-0 bg-black/30 text-white p-4 flex flex-col justify-between items-start">
                                    <h3 className="text-sm text-grey">{meal.type}</h3>
                                    <p className="text-sm font-semibold max-w-[80%] -truncate">{isMealSelected ? meal.name : 'No meal selected'}</p>
                                    {isMealSelected && (
                                        <button 
                                            className={`mt-2 ${isSelected ? "bg-white text-green-600" : "bg-pryGreen text-white"} text-sm px-4 py-2 cursor-pointer rounded-lg w-full`}
                                            onClick={() => openMealModal(meal)}
                                        >
                                            {isSelected ? "Unselect" : "Select Meal"}
                                        </button>
                                    )}
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

            {/* Meal Detail Modal */}
            {modalMeal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
                        {/* Modal Header with X button */}
                        <div className="relative">
                            <button 
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 z-10"
                                onClick={closeMealModal}
                            >
                                <X size={24} />
                            </button>
                            
                            {/* Meal Image */}
                            <div 
                                className="h-48 w-full"
                                style={{
                                    backgroundImage: `url(${modalMeal.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                        </div>
                        
                        {/* Modal Content */}
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4">{modalMeal.type}</h2>
                            
                            <div className="mb-6">
                                <h3 className="text-sm text-gray-500 mb-1">Description</h3>
                                <p className="text-gray-800">{modalMeal.name}</p>
                            </div>
                            
                            <div className="mb-6">
                                <h3 className="text-sm text-gray-500 mb-3">Nutritional Breakdown</h3>
                                <div className="space-y-2">
                                    <p className="text-gray-800">Calories: {modalMeal.calories} kcal</p>
                                    <p className="text-gray-800">Carbs: {modalMeal.carbs}</p>
                                    <p className="text-gray-800">Protein: {modalMeal.protein}</p>
                                    <p className="text-gray-800">Fats: {modalMeal.fats}</p>
                                </div>
                            </div>
                            
                            {/* Select/Unselect Button */}
                            <button
                                className={`w-full flex gap-x-2 items-center justify-center py-3 rounded-md font-medium ${modalMeal.selected ? "bg-white text-green-600 border border-green-500" : "bg-pryGreen cursor-pointer text-white"}`}
                                onClick={() => toggleMealSelection(modalMeal.type)}
                            >
                            <Plus className='text-xs' />
                                {modalMeal.selected ? "Unselect" : "Select Meal"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealPlanSection;

