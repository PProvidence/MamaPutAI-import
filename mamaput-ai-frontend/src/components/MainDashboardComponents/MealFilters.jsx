import { useState } from "react";
import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";
// import { IoFilterOutline } from "react-icons/io5";

const MealFilters = ({ filters, setFilters, setFiltersActive }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle filter selection (Multi-select)
  const toggleFilter = (category, option) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(option)
        ? prevFilters[category].filter((item) => item !== option)
        : [...prevFilters[category], option],
    }));
  };

  // Apply filters and send them to the server
  const applyFilters = () => {
    toggleDropdown(); // Close dropdown on Apply

    // Send filters to the backend
    fetch("http://localhost:3005/apply-filters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    })
      .then((response) => response.json())
      .then((data) => console.log("Filters Applied:", data))
      .catch((error) => console.error("Error applying filters:", error));

    // Mark filters as active
    setFiltersActive(true);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-sm border text-gray-700"
      >
        Filter Meals <ChevronDown className="w-5 h-5 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-12 w-40 bg-white shadow-lg rounded-lg p-4 z-50">
          {/* Budget Filter */}
          <div className="mb-3">
            <h3 className="text-gray-700 font-semibold">Budget</h3>
            {["Na 2k I get", "Mid-range", "Baller levels"].map((option) => (
              <label key={option} className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={filters.budget.includes(option)}
                  onChange={() => toggleFilter("budget", option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>

          {/* Meal Type */}
          <div className="mb-3">
            <h3 className="text-gray-700 font-semibold">Meal Type</h3>
            {["Breakfast", "Lunch", "Dinner", "Snack"].map((option) => (
              <label key={option} className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={filters.mealType.includes(option)}
                  onChange={() => toggleFilter("mealType", option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>

          {/* Apply Button */}
          <button
            onClick={applyFilters}
            className="w-full mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

// Prop Validation
MealFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  setFiltersActive: PropTypes.func.isRequired,
};

export default MealFilters;
