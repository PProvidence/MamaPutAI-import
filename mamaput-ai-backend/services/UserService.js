import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { prisma } from "../lib/prisma.js";

export async function editUser(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res.status(404).json({ error: "No User Found" });
      return;
    }

    const user = req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: user,
    });

    // ✅ Return JSON instead of a string
    res.json({
      message: "Updated Successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getUser(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res.status(404).json("No User Found");
      return;
    }
    const user = await prisma.user.findFirst({
      where: { id: session.user.id },
    });

    if (!user) {
      res.status(404).json({ error: "No User Found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
