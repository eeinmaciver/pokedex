const BASE_URL = import.meta.env.VITE_API_URL


export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const apiGet = async <T>(
  path: string,
  signal?: AbortSignal,
): Promise<T> => {
    const response = await fetch(`${BASE_URL}${path}`, { signal });

    if (!response.ok) {
        throw new ApiError(`Request failed with status ${response.status}`, response.status,);
    }
    return (await response.json()) as T;
};