// app/api/tasks/update/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const { id, ...data } = await req.json();
    
    const updatedTask = await prisma.task.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update task" }, { status: 500 });
  }
}
