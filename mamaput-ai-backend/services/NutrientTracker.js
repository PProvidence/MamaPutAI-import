import dayjs from "dayjs";
import { prisma } from "../lib/prisma.js";

export const getNutrients= async (req, res)=>{
    try {
        const { userId } = req.params;
    
        // Fetch all meals for the user, including createdAt
        const meals = await prisma.meal.findMany({
          where: { userId },
          select: { nutrients: true, createdAt: true },
        });
    
        if (!meals.length) {
         res.status(404).json({ message: "No meals found for this user." });
        }
    
        // Group nutrients by day
        const dailyNutrients = {};
        const monthlyNutrients = {};
    
        meals.forEach((meal) => {
          const date = dayjs(meal.createdAt).format("YYYY-MM-DD"); // Format as "2025-03-29"
          const month = dayjs(meal.createdAt).format("YYYY-MM"); // Format as "2025-03"
    
          if (!dailyNutrients[date]) dailyNutrients[date] = {};
          if (!monthlyNutrients[month]) monthlyNutrients[month] = {};
    
          Object.entries(meal.nutrients || {}).forEach(([key, value]) => {
            dailyNutrients[date][key] = (dailyNutrients[date][key] || 0) + Number(value);
            monthlyNutrients[month][key] = (monthlyNutrients[month][key] || 0) + Number(value);
          });
        });
    
        res.status(200).json({ userId, dailyNutrients, monthlyNutrients });
      } catch (error) {
        console.error("Error fetching nutrients:", error);
        res.status(500).json({ error: "Internal server error" });
      }

}