// pages/api/tasks/update.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { id, ...data } = req.body;
    const updatedTask = await prisma.task.update({
      where: { id },
      data,
    });
    res.status(200).json(updatedTask);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
