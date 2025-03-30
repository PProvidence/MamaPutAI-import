import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.ts";
import type { User } from "@prisma/client";
import { auth } from "../lib/auth.ts";
import { fromNodeHeaders } from "better-auth/node";

export async function editUser(req: Request, res: Response) {
  if (req.method !== "POST") {
    res.status(405).json("Method Not Allowed");
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
    const user: Partial<User> = req.body;
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: user,
    });
    res.json("Updated Successfully");
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getUser(req: Request, res: Response) {
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
