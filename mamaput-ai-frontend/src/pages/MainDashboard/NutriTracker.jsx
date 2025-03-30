// import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

const nutritionItems = [
  'Biotin', 'Caffeine', 'Calcium', 'Carbohydrates', 'Chloride',
  'Chromium', 'Copper', 'Dietary Cholesterol', 'Fibre', 'Dietary Energy',
  'Folate', 'Dietary Sugar', 'Iodine', 'Iron', 'Magnesium',
  'Manganese', 'Molybdenum', 'Monounsaturated Fat', 'Niacin', 'Pantothenic Acid',
  'Phosphorus', 'Polyunsaturated Fat', 'Potassium', 'Protein', 'Riboflavin',
  'Saturated Fat', 'Selenium', 'Sodium', 'Thiamine', 'Total Fat',
  'Vitamin A', 'Vitamin B6', 'Vitamin B12', 'Vitamin C', 'Vitamin D',
  'Vitamin E', 'Vitamin K', 'Water', 'Zinc'
];

const NutritionTracker = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="p-6 font-instrument-sans">
      <div className="flex items-center mb-6">
        <ChevronLeft 
          className="mr-4 cursor-pointer hover:text-pryGreen" 
          onClick={handleGoBack} 
        />
        <h1 className="text-xl xl:text-2xl font-bold">Nutrition Tracker</h1>
      </div>
      <div className="bg-white rounded-lg">
        {nutritionItems.map((item) => (
           <Link to={`/nutrition-tracker/${item.toLowerCase().replace(/\s+/g, '-')}`}>
          <div
            key={item}
            className="flex font-semibold hover:text-pryGreen justify-between items-center p-4 border-b border-b-grey hover:bg-gray-50 transition"
          >
            <span>{item}</span>
           
              <ChevronRight className="text-gray hover:text-pryGreen cursor-pointer" />
         
          </div>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default NutritionTracker;