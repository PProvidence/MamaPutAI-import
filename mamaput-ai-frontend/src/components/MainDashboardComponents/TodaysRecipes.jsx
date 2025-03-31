import { useState } from "react";
import PropTypes from "prop-types"; // Import prop-types
import { Heart, HeartFill } from "lucide-react";
import mealData from "../../data/mealData";
import MealFilters from "./MealFilters";

const TodaysRecipes = () => {
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    budget: [],
    mealType: [],
  });

  // Toggle favorite status
  const toggleFavorite = (mealId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(mealId)
        ? prevFavorites.filter((id) => id !== mealId)
        : [...prevFavorites, mealId]
    );
  };

  // Apply filtering logic
  const filteredMeals = mealData.filter((meal) => {
    if (filters.mealType.length > 0 && !filters.mealType.includes(meal.type)) {
      return false;
    }
    if (filters.budget.length > 0 && !filters.budget.includes(meal.budget)) {
      return false;
    }
    return true;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Today&apos;s Recipes</h2>
        <MealFilters filters={filters} setFilters={setFilters} />
      </div>

      {/* Recipes List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <div
              key={meal.id}
              className="border rounded-lg p-4 flex flex-col shadow-sm relative"
            >
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(meal.id)}
                className="absolute top-2 right-2"
              >
                {favorites.includes(meal.id) ? (
                  <HeartFill className="text-red-500 w-6 h-6" />
                ) : (
                  <Heart className="text-gray-500 hover:text-red-500 w-6 h-6" />
                )}
              </button>

              {/* Recipe Image */}
              <img
                src={meal.image}
                alt={meal.name}
                className="rounded-md mb-3 w-full h-40 object-cover"
              />

              {/* Recipe Details */}
              <h3 className="text-lg font-semibold">{meal.name}</h3>
              <p className="text-gray-600">{meal.description}</p>

              {/* Nutritional Info */}
              <div className="flex justify-between mt-3 text-sm text-gray-500">
                <span>{meal.calories} kcal</span>
                <span>{meal.protein}g Protein</span>
                <span>{meal.carbs}g Carbs</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No meals match your filters.</p>
        )}
      </div>
    </div>
  );
};

// Prop Validation
TodaysRecipes.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.func,
};

export default TodaysRecipes;
