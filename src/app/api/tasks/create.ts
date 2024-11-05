// pages/api/tasks/create.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, description, dueDate, status, priority } = req.body;

    if (!title || !description || !dueDate || !status || !priority) {
      return res.status(400).json({ message: "All fields are required." });
    }

    prisma.task.create({
      data: { 
        slno: 0,
        title, 
        description, 
        dueDate: new Date(dueDate), 
        status, 
        priority 
      },
    })
    .then((newTask) => {
      res.status(200).json(newTask);
    })
    .catch((error) => {
      console.error("Error creating task:", error);
      res.status(500).json({ message: "Failed to create task." });
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
