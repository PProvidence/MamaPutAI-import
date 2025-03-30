import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { configDotenv } from "dotenv";
import { generateText } from "ai";
import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.ts";
import { auth } from "../lib/auth.ts";
import { fromNodeHeaders } from "better-auth/node";
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

export async function getMeals(req: Request, res: Response) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    res.status(404).json("No User Found");
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    res.status(404).json("No User Found");
    return;
  }

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
          content: `You are a food nutrition expert specializing in African cuisine. Generate a valid JSON array that represents a balanced weekly menu. For each day of the week, include one breakfast, one snack, one lunch, and one dinner.
               - Focus specifically on these regional cuisines today: ${randomCuisines}
               - Current timestamp: ${timestamp}
               - Ensure each generation of meals is unique.
               - Consider user allergies: ${user.allergies}
               - Consider health conditions: ${user.healthConditions}
               - Consider dietary restrictions: ${user.dietaryPreferences}
               
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
               ]`,
        },
      ],
    });

    const formattedText = text.replaceAll("`", "").replace("json", "");
    res.json(JSON.parse(formattedText));
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error generating meals", details: error.message });
  }
}
