// app/api/courses/top/route.ts

import { NextResponse } from "next/server";
import { getTopCourses } from "@/lib/courses";

export async function GET() {
  try {
    const data = await getTopCourses();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch top courses" },
      { status: 500 }
    );
  }
}
