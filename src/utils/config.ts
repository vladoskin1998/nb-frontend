import { ROLES } from "../types/enum"

export const baseURL =
    window.location.host === "localhost:3000"
        ? "http://localhost:5000"
        : window.location.origin


export const roleUrl = (role: ROLES): "/admin" | "/user" => {
    if(role === ROLES.ADMIN){
        return "/admin"
    }
    else return "/user"
}