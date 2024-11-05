// pages/api/tasks/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { status, priority, sort } = req.query;
  let tasks;
//   const tasks = await prisma.task.findMany({
//     where: {
//       status: status ? String(status) : undefined,
//       priority: priority ? String(priority) : undefined,
//     },
//     orderBy: { dueDate: sort === "asc" ? "asc" : "desc" },
//   });
  res.status(200).json(tasks);
}
