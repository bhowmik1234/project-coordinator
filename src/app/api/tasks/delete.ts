// pages/api/tasks/delete.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { id } = req.body;
    await prisma.task.delete({ where: { id } });
    res.status(204).end();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
