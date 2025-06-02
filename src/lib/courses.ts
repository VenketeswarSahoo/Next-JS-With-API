// lib/courses.ts

import { getAccessToken } from "./apiClient";

export async function getAllCourses() {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.API_BASE_URL}/api/courseservice/courses/course/getallcourse`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch all courses");

  return res.json();
}

export async function getTopCourses() {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.API_BASE_URL}/api/courseservice/courses/course/topcoursees/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch top courses");

  return res.json();
}
