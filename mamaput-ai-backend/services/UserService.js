import { prisma } from "../lib/prisma.js";

export async function editUser(req, res) {
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
    res.json(erorr);
  }
}
