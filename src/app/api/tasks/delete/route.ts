// app/api/tasks/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    console.log("Deleting task with ID:", id); // Log the received ID

    const a = await prisma.task.delete({
      where: { id },
    });

    console.log(a);
    return new Response(null, { status: 204 });

  } catch (error) {
    console.error("Error deleting task:", error); // Log the error for debugging
    return NextResponse.json({ message: "Failed to delete task" }, { status: 500 });
  }
}
