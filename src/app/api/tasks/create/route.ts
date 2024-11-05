// pages/api/tasks/create.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse JSON body
    const { title, description, dueDate, status, priority } = body;

    if (!title || !description || !dueDate || !status || !priority) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: { 
        slno: 0, 
        title, 
        description, 
        dueDate: new Date(dueDate), 
        status, 
        priority: priority.toUpperCase() 
      },
    });
    console.log(newTask)
    return NextResponse.json(newTask, { status: 200 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ message: "Failed to create task." }, { status: 500 });
  }
}
