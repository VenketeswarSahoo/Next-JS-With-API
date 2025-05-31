// app/page.tsx
import React from "react";

type Course = {
  id: number;
  course_name: string;
};

type ApiResponse = {
  Course: Course[];
  top_courses: Course[];
  // ...many other fields you don't care about
};

async function getCourses(endpoint: string): Promise<Course[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api${endpoint}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  const data: ApiResponse = await res.json();

  // Return only the courses array if endpoint is "/courses"
  if (endpoint === "/courses") {
    return data.Course;
  }

  // Return top courses array if endpoint is "/courses/top"
  if (endpoint === "/courses/top") {
    return data.top_courses;
  }

  // fallback
  return [];
}

export default async function Home() {
  const [allCourses, topCourses] = await Promise.all([
    getCourses("/courses"),
    getCourses("/courses/top"),
  ]);

  console.log(allCourses);
  console.log(topCourses);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>
      <div className="grid grid-cols-2 gap-4">
        {allCourses &&
          allCourses.length > 0 &&
          allCourses.map((course) => (
            <div key={course.id} className="border p-4 rounded shadow">
              <h2 className="text-lg mt-2">{course.course_name}</h2>
            </div>
          ))}
      </div>

      <h1 className="text-2xl font-bold mt-12 mb-4">Top Courses</h1>
      <div className="grid grid-cols-2 gap-4">
        {topCourses &&
          topCourses.length > 0 &&
          topCourses.map((course) => (
            <div key={course.id} className="border p-4 rounded shadow">
              <h2 className="text-lg mt-2">{course.course_name}</h2>
            </div>
          ))}
      </div>
    </main>
  );
}
