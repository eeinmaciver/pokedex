class UnauthorisedError extends Error {}

export interface User {
    id: number;
    email: string;
}

export default async function fetchCurrentUser(token: string): Promise<User> {
  const response = await fetch(`${import.meta.env.VITE_TEAM_API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) throw new UnauthorisedError();
  if (!response.ok) throw new Error("Unable to fetch user");

  return response.json();
}