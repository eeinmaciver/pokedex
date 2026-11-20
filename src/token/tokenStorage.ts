const TOKEN_KEY = "pokedex.token"

export const readToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY)
};
export const writeToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token)
};
export const clearToken = (): void => {
    localStorage.removeItem(TOKEN_KEY)
};