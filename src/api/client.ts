export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
export class TeamError extends Error {
  code: "full" | "duplicate" | "unreadable" | "unavailable";
  constructor(message: string, code: TeamError["code"]) {
    super(message);
    this.name = "TeamError";
    this.code = code
  }
}



export const apiGet = async <T>(
  baseUrl: string,
  path: string,
  signal?: AbortSignal,
): Promise<T> => {
    const response = await fetch(`${baseUrl}${path}`, { signal });

    if (!response.ok) {
        throw new ApiError(`Request failed with status ${response.status}`, response.status,);
    }
    return (await response.json()) as T;
};

export const apiPost = async <T>(
  baseUrl: string,
  path: string,
  body: unknown
): Promise<T> => {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    });

    if (!response.ok) {
      const data = await response.json()
            if (data.detail === "Your team is full.") {
                throw new TeamError("Your team is full", "full")
            }
            if (data.detail === "That Pokémon is already on your team.") {
                throw new TeamError("That Pokémon is already on your team", "duplicate")
            }
        }
    return (await response.json()) as T;
};

export const apiDelete = async <T>(
  baseUrl: string,
  path: string,
): Promise<T> => {
    const response = await fetch(`${baseUrl}${path}`, {
    method: "DELETE",
    });

    if (!response.ok) {
        throw new ApiError(`Request failed with status ${response.status}`, response.status,);
    }
    return (await response.text()) as T;
};
