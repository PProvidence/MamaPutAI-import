import { useState } from 'react';
import { ChevronLeft, Search, X } from 'lucide-react';

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotification, setShowNotification] = useState(true);

  // const historyItems = [
  //   { 
  //     date: 'Yesterday', 
  //     meals: [
  //       { name: 'Lunch', description: 'Amala & Ewedus' },
  //       { name: 'Dinner', description: 'Jollof Rice and Chicken' }
  //     ]
  //   },
  //   { 
  //     date: '2 Days Ago', 
  //     meals: [
  //       { name: 'Breakfast', description: 'Pap and Akara' },
  //       { name: 'Lunch', description: 'Egusi Soup with Pounded Yam' }
  //     ]
  //   }
  // ];

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    setSearchTerm('');
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="p-6 font-instrument-sans">
      <div className="flex items-center mb-6">
        <ChevronLeft className="mr-4 cursor-pointer hover:text-pryGreen"  onClick={handleGoBack} />
        <h1 className="text-2xl font-bold">History</h1>
      </div>

      <div className="relative mb-10">
        <Search onClick={handleSearch} className="absolute pl-1 left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
        <input 
          type="text" 
          placeholder="Search history" 
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full p-3 pl-10 border border-grey rounded-4xl focus:outline-green-500"
        />
      </div>

      <h3 className='text-sm font-bold text-trueGrey my-6'>Yesterday</h3>

      {showNotification && (
        <div className="bg-pricingGreen text-sm font-bold text-pryGreen border border-green-200 py-2 rounded-lg mb-6 flex justify-between items-center">
          <p className="text-center flex-grow">You had <span>Amala & Ewedu</span> for <span>lunch yesterday</span> - craving it again?</p>
          <X 
            className="mx-2 h-6 w-6 cursor-pointer" 
            onClick={() => setShowNotification(false)} 
          />
        </div>
      )}
      {/* Search results template */}
      {/* {historyItems.map((dayHistory, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{dayHistory.date}</h3>
          {dayHistory.meals.map((meal, mealIndex) => (
            <div 
              key={mealIndex} 
              className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium">{meal.name}</h4>
                <p className="text-gray-600">{meal.description}</p>
              </div>
              <button className="text-green-500 hover:bg-green-50 px-3 py-1 rounded">
                View Details
              </button>
            </div>
          ))}
        </div>
      ))} */}
    </div>
  );
};

export default History;