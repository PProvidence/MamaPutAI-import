import express from "express";
import { getMeals } from "../services/AIService.js";
import { getNutrients, storeMeal } from "../services/NutrientTracker.js";



export const mealRouter = express.Router()
 
mealRouter.post('/get-meals', getMeals)
mealRouter.post('/store-meals', storeMeal)
mealRouter.get('/get-nutrients/:userId', getNutrients)