// app/api/courses/route.ts

import { NextResponse } from "next/server";
import { getAllCourses } from "@/lib/courses";

export async function GET() {
  try {
    const data = await getAllCourses();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch all courses" },
      { status: 500 }
    );
  }
}
