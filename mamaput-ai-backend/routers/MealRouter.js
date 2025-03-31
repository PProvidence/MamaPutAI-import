import express from "express";
import { getMeals } from "../services/AIService.js";
import { getNutrients, storeMeal } from "../services/NutrientTracker.js";



export const mealRouter = express.Router()
 
aiRouter.post('/get-meals', getMeals)
aiRouter.post('/store-meals', storeMeal)
aiRouter.get('/get-nutrients/:userId', getNutrients)