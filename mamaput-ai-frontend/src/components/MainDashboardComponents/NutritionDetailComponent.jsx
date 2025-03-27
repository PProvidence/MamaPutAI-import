import { useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useParams, useNavigate } from 'react-router-dom';
import { nutritionDetails } from './nutritionDetailsData';

const NutritionDetailComponent = () => {
  const { nutrient } = useParams();
  const navigate = useNavigate();

  // Use useMemo to memoize the nutrient matching logic
  const { matchedNutrientKey, nutrientData } = useMemo(() => {
    // Find the correct nutrient key with case-insensitive matching
    const matchedKey = Object.keys(nutritionDetails).find(
      key => key.toLowerCase() === nutrient.toLowerCase()
    );

    // Use the matched key or fallback to a default object
    const data = matchedKey 
      ? nutritionDetails[matchedKey] 
      : {
          summary: 'Information not available for this nutrient.',
          recommendedDailyIntake: 'N/A',
        };

    return { 
      matchedNutrientKey: matchedKey, 
      nutrientData: data 
    };
  }, [nutrient]);

  useEffect(() => {
    console.log('Current Nutrient (useParams):', nutrient);
    console.log('Matched Nutrient Key:', matchedNutrientKey);
    console.log('Nutrient Data:', nutrientData);
  }, [nutrient, matchedNutrientKey, nutrientData]);

  const data = [
    { day: 'Sun', value: 10 },
    { day: 'Mon', value: 15 },
    { day: 'Tue', value: 25 },
    { day: 'Wed', value: 22 },
    { day: 'Thu', value: 18 },
    { day: 'Fri', value: 20 },
    { day: 'Sat', value: 12 }
  ];

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 w-full font-instrument-sans">
      <div className="flex items-center space-x-4 mb-6">
        <button className="text-gray-600" onClick={handleGoBack}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">{matchedNutrientKey || nutrient}</h1>
      </div>
      <div className="mb-6">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            {['Day', 'Week', 'Month', '6 months', 'Year'].map((period) => (
              <button
                key={period}
                className={`px-4 py-2 rounded-lg ${period === 'Day' ? 'bg-black text-white' : 'bg-gray-100'}`}
              >
                {period}
              </button>
            ))}
          </div>
          <div>
            <span className="text-2xl font-bold">{nutrientData.recommendedDailyIntake || 'N/A'}</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Summary</h2>
        <p className="text-gray-700">{nutrientData.summary}</p>
      </div>
    </div>
  );
};

export default NutritionDetailComponent;