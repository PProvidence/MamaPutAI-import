// import React from 'react';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { IoFilterOutline } from "react-icons/io5";
import pap from '../../assets/img/pap.svg'; 
import meatpie from '../../assets/img/meatpie.svg';// Corrected import
import jollof from '../../assets/img/jollof.svg';
import amala from '../../assets/img/amala.svg';


const MealPlans = () => {
  const mealPlans = [
    {
      type: 'Breakfast',
      name: 'Pap(Ogi) with milk Bean Pudding (mol mol) and fried fish',
      image: pap,
    },
    {
      type: 'Snack',
      name: 'Meat pie and watermelon juice',
      image: meatpie
    },
    {
      type: 'Lunch',
      name: 'Jollof rice, fried plantain and toasted turkey with water',
      image: jollof
    },
    {
      type: 'Dinner',
      name: 'Amala with ewedu, gbegiri, soap and meat, with water',
      image: amala
    }
  ];

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="p-6 font-instrument-sans">
        <div className="flex items-center mb-6">
        <ChevronLeft className="mr-4 cursor-pointer hover:text-pryGreen"  onClick={handleGoBack} />
        <h1 className="text-xl xl:text-2xl font-bold">Meal plans</h1>
        </div>
        <div className='my-10'>
            <h3 className='font-bold'>Your plans</h3>
            <p className="text-gray-600 py-3">Meal plan generation helps you to structure your meal ahead, so you can plan groceries and eat efficiently</p>
        </div>


      <div className="flex space-x-4 mb-6">
        <select className="border rounded-lg px-4 py-2 w-full">
          <option>Today</option>
          <option>This week</option>
          <option>This month</option>
          <option>This year</option>
        </select>
      </div>

      <div className='flex gap-5 py-3 my-4'>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition">
          <Sparkles className="w-6 h-6" />
          <span className='font-semibold'>Regenerate with AI</span>
        </button>

        <button className="border border-grey rounded-lg px-4 py-2 flex items-center space-x-2">
            <IoFilterOutline className="w-6 h-6" />
            <span className='font-semibold'>Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mealPlans.map((meal, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
            <img src={meal.image} alt={meal.name} className="w-full h-40 object-cover" />
            <div className="p-3">
              <h3 className="font-semibold text-sm mb-1">{meal.type}</h3>
              <p className="text-xs text-gray-600">{meal.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlans;