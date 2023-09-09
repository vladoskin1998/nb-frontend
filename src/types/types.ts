import { ROLES } from "./enum";

export type RoleType = ROLES.ADMIN | ROLES.USER

export interface AuthResponseInterface{
    user: {
        email: string;
        role: ROLES;
        id: string;
    };
    accessToken: string;
    refreshToken: string;
}



