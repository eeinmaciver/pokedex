export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
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

// export const apiPost = async <T>(
//   path: string,
//   body: unknown
// ): Promise<T> => {
//   const response = await fetch(`${BASE_URL}${path}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//         throw new ApiError(`Request failed with status ${response.status}`, response.status,);
//     }
//     return (await response.json()) as T;
// };

// export const apiDelete = async <T>(
//   path: string,
// ): Promise<T> => {
//     const response = await fetch(`${BASE_URL}${path}`, {
//     method: "DELETE",
//     });

//     if (!response.ok) {
//         throw new ApiError(`Request failed with status ${response.status}`, response.status,);
//     }
//     return (await response.text()) as T;
// };
