import express from "express";
import { getMeals } from "../services/AIService.js";
import {storeFeedback, getFeedback} from "../services/Feedback.js";
import {getNutrients, storeMeal} from "../services/NutrientTracker.js";



export const aiRouter = express.Router()
 
aiRouter.post('/meals', getMeals)
aiRouter.post('/store-meals', storeMeal)
aiRouter.get('/get-nutrients/:userId', getNutrients)
aiRouter.post('/store-feedback', storeFeedback);
aiRouter.get('/get-feedback', getFeedback);