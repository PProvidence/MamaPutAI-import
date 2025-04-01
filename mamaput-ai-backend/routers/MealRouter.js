import express from "express";
import { getMeals } from "../services/AIService.js";
import { getNutrients } from "../services/NutrientTracker.js";
import { storeMeal } from "../services/MealService.js";



export const mealRouter = express.Router()
 
mealRouter.get('/get-meals', getMeals)
mealRouter.post('/store-meals', storeMeal)
mealRouter.post('/get-nutrients/:userId', getNutrients)