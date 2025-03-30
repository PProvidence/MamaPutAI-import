import express from "express";
import { getMeals } from "../services/AIService.ts";
import {storeFeedback, getFeedback} from "../services/Feedback.ts";
import {getNutrients, storeMeal} from "../services/NutrientTracker.ts";



export const aiRouter = express.Router()
 
aiRouter.post('/meals', getMeals)
aiRouter.post('/store-meals', storeMeal)
aiRouter.get('/get-nutrients/:userId', getNutrients)
aiRouter.post('/store-feedback', storeFeedback);
aiRouter.get('/get-feedback', getFeedback);

