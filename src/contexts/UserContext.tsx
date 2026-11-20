import { useState } from "react";
import { createContext, useContext } from "react";
import { type ReactNode } from "react";
import fetchCurrentUser from "../api/auth";
import { type User } from "../api/auth";
import { writeToken } from "../token/tokenStorage";

type UserState =
    | { status: "loading" }
    | { status: "anonymous" }
    | { status: "success"; user: User }
    | { status: "error"; message: string };

interface UserContextValue {
    userState: UserState;
    login: (email: string, password: string) => Promise<void>;
}

interface Token {
    access_token: string;
    token_type: string;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export default function useUserContext() {
    const context = useContext(UserContext)
    
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }

    return context;

}

export function UserProvider({ children }: {children: ReactNode}) {

    const [userState, setUserState] = useState<UserState>({status: "loading"})

    async function login (email: string, password: string): Promise<void> { 

    const response = await fetch(`${import.meta.env.VITE_TEAM_API_URL}/auth/login`
    , {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
    });

    const token: Token = await response.json()
    console.log(token)
    const user = await fetchCurrentUser(token.access_token)
    console.log(user)
    writeToken(token.access_token)
    setUserState({status: "success", user})
}

    return (
        <UserContext.Provider value={{userState, login}}>{children}</UserContext.Provider>
    )
}

// curl 'https://pokemon-team-api-xlvv.onrender.com/auth/me' \
//   --compressed \
//   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:160.0) Gecko/20100101 Firefox/160.0' \
//   -H 'Accept: */*' \
//   -H 'Accept-Language: en-GB,en;q=0.9' \
//   -H 'Accept-Encoding: gzip, deflate, br, zstd' \
//   -H 'Referer: http://localhost:5173/' \
//   -H 'Authorization: Bearer [object Object]' \
//   -H 'Origin: http://localhost:5173' \
//   -H 'Connection: keep-alive' \
//   -H 'Sec-Fetch-Dest: empty' \
//   -H 'Sec-Fetch-Mode: cors' \
//   -H 'Sec-Fetch-Site: cross-site' \
//   -H 'Priority: u=4' \
//   -H 'Pragma: no-cache' \
//   -H 'Cache-Control: no-cache' \
//   -H 'TE: trailers'


// curl 'https://pokemon-team-api-xlvv.onrender.com/auth/me' \
//   --compressed \
//   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:160.0) Gecko/20100101 Firefox/160.0' \
//   -H 'Accept: */*' \
//   -H 'Accept-Language: en-GB,en;q=0.9' \
//   -H 'Accept-Encoding: gzip, deflate, br, zstd' \
//   -H 'Referer: http://localhost:5173/' \
//   -H 'Authorization: Bearer [object Object]' \
//   -H 'Origin: http://localhost:5173' \
//   -H 'Connection: keep-alive' \
//   -H 'Sec-Fetch-Dest: empty' \
//   -H 'Sec-Fetch-Mode: cors' \
//   -H 'Sec-Fetch-Site: cross-site' \
//   -H 'Priority: u=4' \
//   -H 'Pragma: no-cache' \
//   -H 'Cache-Control: no-cache' \
//   -H 'TE: trailers'


