import { apiGet } from "./client";

// export class TeamError extends Error {
//   code: "full" | "duplicate" | "unreadable" | "unavailable";
//   constructor(message: string, code: TeamError["code"]) { /* ... */ }

import type { TeamMember } from "../types";


export const getTeam = async (user_id: number): Promise<TeamMember[]> => {
    const data = await apiGet<TeamMember[]>(import.meta.env.VITE_TEAM_API_URL ,`/public/users/${user_id}/team`);
    return data
};






// export const addToTeam = (member: NewTeamMember): Promise<TeamMember> => { /* ... */ };




// export const removeFromTeam = (id: number): Promise<void> => { /* ... */ };