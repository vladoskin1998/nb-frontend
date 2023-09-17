import { ROLES } from "./enum";

export type RoleType = ROLES.ADMIN | ROLES.USER

export interface AuthResponseInterface{
    user: {
        email: string;
        role: ROLES;
        _id: string;
        coordinars: {lat: number | null, lng: number | null };
        city: string  | null;
        country: string  | null;
        houseNumber: string  | null;
        street: string  | null;
        fullName: string;

    };
    accessToken: string;
    refreshToken: string;
}


export interface CoordinatsInterface{
    lat: number , lng: number  
}




