import express from "express";
import { getMeals } from "../services/AIService.js";

export const aiRouter = express.Router()
 
aiRouter.post('/meals', getMeals)
