import { AxiosResponse } from "axios";
import $api from ".";
import { UserChat } from "../components/general-components/profile-info/ProfileInfoHelpCenter";
import { LocationPayload } from "../services/profile";
import { ROLES } from "../types/enum";
import { UserInitialStateInterface } from "../reducer/users";

interface GetClosestUserInterface {
    role: ROLES;
    myLat: number;
     myLng: number
}

interface GetUsersInterface{
    _id: string,
    role: ROLES,
    searchName: string,
}


export class UserHttp {

    static async changeLocation(payload:LocationPayload) {
        return await $api.post('identity/profile-location', payload)  
    }

    
    static async getClosestUser(payload: GetClosestUserInterface ): Promise<UserChat> {
        const res:AxiosResponse<UserChat> = await $api.post('user/get-closest-user', payload)
        return res.data
    }

    static async getUsers(payload: GetUsersInterface ): Promise<UserInitialStateInterface[]> {
        const res:AxiosResponse<UserInitialStateInterface[]> = await $api.post('user/get-users', payload)
        return res.data
    }

 

}