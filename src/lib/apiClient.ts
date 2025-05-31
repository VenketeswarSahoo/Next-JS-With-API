// lib/apiClient.ts
import { v4 as uuidv4 } from "uuid";

let cachedToken: string | null = null;

export async function getAccessToken(): Promise<string> {
  if (cachedToken) return cachedToken;

  const res = await fetch("https://api.bidyasagar.tech/api/users/guestlogin/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      APIKEY: "bidyasagardev09012024",
      DeviceID: uuidv4(),
    },
  });

  if (!res.ok) throw new Error("Failed to log in as guest");

  const data = await res.json();
  cachedToken = data.access;
  return cachedToken as string;
}
