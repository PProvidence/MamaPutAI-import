import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { prisma } from "../lib/prisma.js";

export const storeMeal = async (req, res) => {
  const { name, description, numCalories, nutrients } = req.body;
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res.status(404).json("Session Not Found");
      return;
    }
    const user = await prisma.user.findFirst({
      where: { id: session.user.id },
    });

    if (!user) {
      res.status(404).json("No User Found");
    }
    if (
      !name ||
      !description ||
      !numCalories ||
      Object.keys(nutrients).length === 0
    ) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const meal = await prisma.meal.create({
      data: {
        userId: user.id,
        name,
        description,
        calories: numCalories,
        nutrients: nutrients,
      },
    });

    res.status(201).json({ message: "Meal saved successfully", meal });
  } catch (error) {
    console.error("Error storing meal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
