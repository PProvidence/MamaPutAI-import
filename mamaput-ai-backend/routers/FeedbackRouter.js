import express from "express";
import { getFeedback, storeFeedback } from "../services/Feedback.js";



export const feedbackRouter = express.Router()
 
aiRouter.post('/store-feedback', storeFeedback);
aiRouter.get('/get-feedback', getFeedback);