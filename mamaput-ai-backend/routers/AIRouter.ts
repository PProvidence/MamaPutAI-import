import express from "express";
import { getMeals } from "../services/AIService.ts";

export const aiRouter = express.Router()
 
aiRouter.post('/meals', getMeals)
