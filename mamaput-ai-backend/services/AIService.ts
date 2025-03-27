import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { configDotenv } from "dotenv";
import { generateText } from "ai";
import type { Request, Response } from "express";
configDotenv({ path: "./.env" });
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function getMeals(req: Request, res: Response) {
  const { allergies, health_conditions, dietary_conditions } = req.body;

  const uniqueSeed = Date.now();

  try {
    const { text } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `You are a food nutrition expert specializing in African cuisine. Generate a valid JSON array that represents a balanced weekly menu. For each day of the week, include one breakfast, one snack, one lunch, and one dinner. Each meal object should contain the following fields:

    type: (e.g., 'Breakfast', 'Snack', 'Lunch', 'Dinner')

    name: a detailed description of the dish

    numCalories: estimated calorie count

    carbohydrates: estimated carbohydrate content

    protein: estimated protein content

    fats: estimated fat content

Ensure that every day’s menu features unique dishes and that you keep the following constraints in mind:

    Allergies: Do not include any dishes containing any of these ingredients ${allergies}

    Health conditions: Take this into consideration ${health_conditions}

    Dietary conditions: Take this into consideration ${dietary_conditions}
    All meals must be authentic African dishes, and every dish should be unique and not repeated on any day of the week. Please randomize the dishes for each generation. The current seed is ${uniqueSeed}.
 The output should follow this example format:

[
  {
    "day": "Monday",
    "meals": [
      { "type": "Breakfast", "name": "...", "numCalories": ..., "carbohydrates": ..., "protein": ..., "fats": ... },
      { "type": "Snack", "name": "...", "numCalories": ... },
      { "type": "Lunch", "name": "...", "numCalories": ... },
      { "type": "Dinner", "name": "...", "numCalories": ... }
    ]
  },
  { "day": "Tuesday", "meals": [ ... ] },
  ...
]

Generate this JSON array with different meals for each day of the week."`,
    });
    const formattedText = text.replaceAll("`", "").replace("json", "");
    res.json(JSON.parse(formattedText));
  } catch (error) {
    res.json(error);
  }
}
