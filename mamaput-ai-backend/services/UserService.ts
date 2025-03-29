import type { Request, Response } from 'express';
import { prisma } from "../lib/prisma.ts";
import type { User } from '@prisma/client';

export async function editUser(req: Request, res: Response) {
  try {

    const id: string = req.params.id
    const user: Partial<User> = req.body;
    await prisma.user.update({
      where: {
        id,
      },
      data: user,
    });
    res.json("Updated Successfully");
  } catch (error) {
    res.json(error);
  }
}
