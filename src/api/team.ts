import { apiDelete, apiGet, apiPost } from "./client";
import { type NewTeamMember } from "../types";



import type { TeamMember } from "../types";


export const getTeam = (user_id: number): Promise<TeamMember[]> => {
    return apiGet<TeamMember[]>(import.meta.env.VITE_TEAM_API_URL ,`/public/users/${user_id}/team`);

};


export const addToTeam = (user_id: number, member: NewTeamMember): Promise<TeamMember> => {

        return apiPost<TeamMember>(
        import.meta.env.VITE_TEAM_API_URL,
        `/public/users/${user_id}/team`,
        member
        )

};

export const removeFromTeam = (user_id: number, member_id: number): Promise<void> => {
    return apiDelete<void>(
        import.meta.env.VITE_TEAM_API_URL,
        `/public/users/${user_id}/team/${member_id}`
    )
};
