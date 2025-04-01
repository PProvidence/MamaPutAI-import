import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Plus, X } from 'lucide-react';
import { IoFilterOutline } from "react-icons/io5";
import MealFilters from './MealFilters';

// Import meal images
import pap from '../../assets/img/pap.svg';
import meatpie from '../../assets/img/meatpie.svg';
import jollof from '../../assets/img/jollof.svg';
import amala from '../../assets/img/amala.svg';

// Map meal types to images
const mealTypeImages = {
  'Breakfast': pap,
  'Snack': meatpie,
  'Lunch': jollof,
  'Dinner': amala
};

const mealTypesList = ['Breakfast', 'Snack', 'Lunch', 'Dinner'];
const budgetList = ["Na 2k I get", "Mid-range", "Baller levels"];

const MealPlanSection = () => {
    const today = format(new Date(), 'EEEE');
    const [activeTab, setActiveTab] = useState('Today');
    const [selectedDay, setSelectedDay] = useState(today);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        budget: [],
        mealType: [],
    });
    const [modalMeal, setModalMeal] = useState(null);
    const [ignoreFilters, setIgnoreFilters] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    // Initialize with empty meal plans for each day
    const [mealPlans, setMealPlans] = useState({
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
    });
    
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

    // Function to generate new meal plan
    const generateNewMealPlan = () => {
        setIsLoading(true);
        
        if (ignoreFilters) {
            setFilters({ budget: [], mealType: [] });
            setIgnoreFilters(false);
        }
        
        // Make API request to generate new meal plan
        fetch('http://localhost:3005/ai/meals', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                allergies: "", // You could add user allergies here
                health_conditions: "", // You could add user health conditions here
                dietary_conditions: "" // You could add user dietary restrictions here
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to generate meal plan');
            }
            return response.json();
        })
        .then(data => {
            console.log('New meal plan generated:', data);
            // Transform AI data to match your component's data structure
            const formattedMealPlans = transformAIMealData(data);
            setMealPlans(formattedMealPlans);
        })
        .catch(error => {
            console.error('Error generating meal plan:', error);
            // Handle errors here - maybe show a notification to the user
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    // Transform AI response data to match our component structure
    const transformAIMealData = (aiData) => {
        const formattedMealPlans = { ...mealPlans };
        
        // Process each day in the AI response
        aiData.forEach(dayData => {
            const dayName = dayData.day;
            const meals = dayData.meals.map(meal => {
                // Randomly assign a budget category
                const randomBudget = budgetList[Math.floor(Math.random() * budgetList.length)];
                
                return {
                    type: meal.type,
                    name: meal.name,
                    image: mealTypeImages[meal.type] || null,
                    budget: randomBudget,
                    mealType: meal.type,
                    // Store nutritional information
                    calories: meal.numCalories || 0,
                    carbs: meal.carbohydrates ? `${meal.carbohydrates}g` : 'N/A',
                    protein: meal.protein ? `${meal.protein}g` : 'N/A',
                    fats: meal.fats ? `${meal.fats}g` : 'N/A',
                    waterIntake: meal.waterIntake ? `${meal.waterIntake}L` : 'N/A',
                    // Add any additional nutritional info
                    calcium: meal.calcium,
                    iron: meal.iron,
                    magnesium: meal.magnesium,
                    potassium: meal.potassium,
                    zinc: meal.zinc,
                    selenium: meal.selenium
                };
            });
            
            formattedMealPlans[dayName] = meals;
        });
        
        return formattedMealPlans;
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
                    {/* Generate new plan button */}
                    <button 
                        className={`bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        onClick={generateNewMealPlan}
                        disabled={isLoading}
                    >
                        <Plus className="w-6 h-6" />
                        <span className="font-semibold">{isLoading ? "Generating..." : "Generate new plan"}</span>
                    </button>

                    <button 
                        className="border border-gray-300 cursor-pointer hover:text-pryGreen rounded-lg px-4 py-2 flex items-center space-x-2" 
                        onClick={() => setIsFilterOpen(!isFilterOpen)} 
                        onDoubleClick={() => {
                            setFilters({ budget: [], mealType: [] });
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
            {isLoading ? (
                <div className="w-full text-center py-10 text-gray-500 text-lg">
                    Generating meal plan...
                </div>
            ) : filteredMeals.length > 0 || mealsByType.some(meal => meal.name !== "No meal selected") ? (
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
                                    <p className="text-sm font-semibold max-w-[80%] line-clamp-2">{isMealSelected ? meal.name : 'No meal selected'}</p>
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
                                    <p className="text-gray-800">Calories: {modalMeal.calories || 'N/A'} kcal</p>
                                    <p className="text-gray-800">Carbs: {modalMeal.carbs || 'N/A'}</p>
                                    <p className="text-gray-800">Protein: {modalMeal.protein || 'N/A'}</p>
                                    <p className="text-gray-800">Fats: {modalMeal.fats || 'N/A'}</p>
                                    {modalMeal.waterIntake && 
                                        <p className="text-gray-800">Water Intake: {modalMeal.waterIntake}</p>
                                    }
                                    
                                    {/* Display additional nutrients if available */}
                                    {modalMeal.calcium && 
                                        <p className="text-gray-800">Calcium: {modalMeal.calcium}mg</p>
                                    }
                                    {modalMeal.iron && 
                                        <p className="text-gray-800">Iron: {modalMeal.iron}mg</p>
                                    }
                                    {modalMeal.magnesium && 
                                        <p className="text-gray-800">Magnesium: {modalMeal.magnesium}mg</p>
                                    }
                                    {modalMeal.potassium && 
                                        <p className="text-gray-800">Potassium: {modalMeal.potassium}mg</p>
                                    }
                                    {modalMeal.zinc && 
                                        <p className="text-gray-800">Zinc: {modalMeal.zinc}mg</p>
                                    }
                                    {modalMeal.selenium && 
                                        <p className="text-gray-800">Selenium: {modalMeal.selenium}μg</p>
                                    }
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