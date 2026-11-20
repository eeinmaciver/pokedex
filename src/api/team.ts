import { apiDelete, apiGet, apiPost, TeamError } from "./client";
import { type NewTeamMember } from "../types";
import type { TeamMember } from "../types";


export const getTeam = (user_id: number): Promise<TeamMember[]> => {
    return apiGet<TeamMember[]>(import.meta.env.VITE_TEAM_API_URL ,`/public/users/${user_id}/team`);

};


export const addToTeam = (user_id: number, member: NewTeamMember): Promise<TeamMember> => {

    try {
        return apiPost<TeamMember>(
            import.meta.env.VITE_TEAM_API_URL, `/public/users/${user_id}/team`, member
        )
    } catch (err) {
        
        throw new TeamError("Could not reach the team server", "unavailable")
    }
};


export const removeFromTeam = (user_id: number, member_id: number): Promise<void> => {
    return apiDelete<void>(
        import.meta.env.VITE_TEAM_API_URL,
        `/public/users/${user_id}/team/${member_id}`
    )
};
