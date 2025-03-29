import type { Request, Response } from 'express';
import { prisma } from "../lib/prisma.js";

export async function editUser(req: Request, res: Response) {
  try {
    const user = req.body;
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
    res.json("Updated Successfully");
  } catch (error) {
    res.json(error);
  }
}
