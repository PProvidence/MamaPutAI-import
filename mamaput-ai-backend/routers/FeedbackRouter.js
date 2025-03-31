import express from "express";
import { getFeedback, storeFeedback } from "../services/Feedback.js";



export const feedbackRouter = express.Router()
 
feedbackRouter.post('/store-feedback', storeFeedback);
feedbackRouter.get('/get-feedback', getFeedback);