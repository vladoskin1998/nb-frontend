import { ROLES } from "./enum";

export type RoleType = ROLES.ADMIN | ROLES.USER

export interface AuthResponseInterface{
    user: {
        email: string;
        role: ROLES;
        id: string;
        coordinars: {lat: number | null, lng: number | null };
    };
    accessToken: string;
    refreshToken: string;
}



