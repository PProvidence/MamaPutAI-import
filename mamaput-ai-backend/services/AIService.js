import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { configDotenv } from "dotenv";
configDotenv({ path: "./.env" });
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function getRandomCuisines() {
  const cuisines = [
    "West African",
    "North African",
    "East African",
    "South African",
    "Central African",
    "Ethiopian",
    "Nigerian",
    "Moroccan",
    "Egyptian",
    "Kenyan",
    "Ghanaian",
    "Senegalese",
    "Tunisian",
    "Algerian",
  ];

  const shuffled = [...cuisines].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3 + Math.floor(Math.random() * 2)).join(", ");
}

export async function getMeals(req, res) {
  const { allergies, health_conditions, dietary_conditions } = req.body;

  const timestamp = new Date().toISOString();
  const randomCuisines = getRandomCuisines();

  try {
    const { text } = await generateText({
      temperature: 2,
      topP: 0.95,
      model: google("gemini-2.0-flash-001"),
      messages: [
        {
          role: "user",
          content: `You are a food nutrition expert specializing in African cuisine. Generate a valid JSON array that represents a balanced weekly menu, including mineral water intake and detailed nutrients for each meal.
               - Focus specifically on these regional cuisines today: ${randomCuisines}
               - Current timestamp: ${timestamp}
               - Ensure each generation of meals is unique.
               - Consider user allergies: ${allergies}
               - Consider health conditions: ${health_conditions}
               - Consider dietary restrictions: ${dietary_conditions}
               - Include a recommended **water intake** (in liters) for each meal.

               The output should follow this example format:
               [
               {
               "day": "Monday",
               "meals": [
                 { 
                   "type": "Breakfast", 
                   "name": "Ogi with Akara", 
                   "numCalories": 400, 
                   "carbohydrates": 50, 
                   "protein": 20, 
                   "fats": 10, 
                     "calcium": 50, 
                     "iron": 8, 
                     "magnesium": 30,
                   "waterIntake": 0.5
                 },
                 { 
                   "type": "Snack", 
                   "name": "Roasted Plantain", 
                   "numCalories": 250, 
                     "potassium": 60, 
                     "iron": 5,
                   "waterIntake": 0.3
                 },
                 { 
                   "type": "Lunch", 
                   "name": "Jollof Rice with Grilled Chicken", 
                   "numCalories": 600, 
                   "carbohydrates": 70, 
                   "protein": 40, 
                   "fats": 25, 
                     "zinc": 10, 
                     "selenium": 4
                   "waterIntake": 0.6
                 },
                 { 
                   "type": "Dinner", 
                   "name": "Vegetable Soup with Pounded Yam", 
                   "numCalories": 550, 
                   "carbohydrates": 60, 
                   "protein": 30, 
                   "fats": 20, 

                     "calcium": 40, 
                     "magnesium": 20,
                   "waterIntake": 0.7
                 }
               ]
               },
               { "day": "Tuesday", "meals": [ ... ] },
               ...
               ]`,
        },
      ],
    });

    const formattedText = text.replaceAll("`", "").replace("json", "");
    res.json(JSON.parse(formattedText));
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error generating meals", details: error.message });
  }
}
