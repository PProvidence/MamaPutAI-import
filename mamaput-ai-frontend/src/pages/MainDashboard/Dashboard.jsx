// import React from 'react';
import { Bell, Settings, User } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Howdy John!</h1>
          <p className="text-sm text-gray-600">16 MAR 2025</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            You had Amala & Ewedus for lunch yesterday - craving it again?
          </div>
          <div className="flex space-x-2">
            <Bell className="text-gray-600 cursor-pointer" />
            <Settings className="text-gray-600 cursor-pointer" />
            <User className="text-gray-600 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Health Data Section */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Calorie Intake */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Calorie Intake</h3>
          <div className="flex items-center">
            <div className="radial-progress text-red-500" style={{"--value":60}}>
              <span className="text-2xl font-bold">1200</span>
              <p className="text-xs text-gray-500">Per day to reach 70 lbs</p>
            </div>
            <div className="ml-4">
              <p className="text-sm">1200/2000</p>
            </div>
          </div>
        </div>

        {/* Macro Nutrient Ratios */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Macro Nutrient Ratios</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Carbohydrates</span>
              <span>18.75 g</span>
            </div>
            <div className="flex justify-between">
              <span>Protein</span>
              <span>487 g</span>
            </div>
            <div className="flex justify-between">
              <span>Fats</span>
              <span>136.67 g</span>
            </div>
          </div>
        </div>

        {/* Body Mass Index */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Body Mass Index</h3>
          <div className="flex items-center">
            <div className="radial-progress text-green-500" style={{"--value":70}}>
              <span className="text-2xl font-bold">11.7</span>
              <p className="text-xs text-gray-500">Underweight</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Meal Plan */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Personalized Meal Plan</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg">Today</button>
            <button className="px-4 py-2 text-gray-600 rounded-lg">This week</button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg">+ Generate new plan</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg">Filter</button>
          </div>
        </div>

        {/* Meal Cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { 
              meal: 'Breakfast', 
              description: 'Pap/Garri with milk, Bean Pudding (moi moi) and fried fish' 
            },
            { 
              meal: 'Snack', 
              description: 'Meat pie and watermelon juice' 
            },
            { 
              meal: 'Lunch', 
              description: 'Jollof rice, fried plantain and roasted turkey with water' 
            },
            { 
              meal: 'Dinner', 
              description: 'Amala with Ewedus, efo riro and meat, with water' 
            }
          ].map((item, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-200 h-40"></div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">{item.meal}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                <button className="mt-2 w-full py-2 bg-green-500 text-white rounded-lg">
                  Select Meal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reminders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Reminders</h2>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
            + Create reminders
          </button>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          Its time for breakfast
        </div>
      </div>
    </div>
  );
};

export default Dashboard;