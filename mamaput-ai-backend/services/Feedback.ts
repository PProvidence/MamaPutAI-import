import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const storeFeedback = async (req: express.Request, res: express.Response): Promise<void> =>{
    try {
        const { emotion, message } = req.body;
    
        if (!emotion || !message) {
        res.status(400).json({ error: "Missing required fields" });
        }
    
        const feedback = await prisma.feedback.create({
          data: { emotion, message },
        });
    
        res.status(201).json({ message: "Feedback submitted successfully", feedback });
      } catch (error) {
        console.error("Error storing feedback:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    
}

export const getFeedback = async (req: express.Request, res: express.Response): Promise<void> =>{
    try {
        const feedback = await prisma.feedback.findMany();
        res.json(feedback);
      } catch (error) {
        console.error("Error getting feedback:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}