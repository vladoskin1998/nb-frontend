
import { AxiosResponse } from "axios";
import $api from ".";
import { UserIdentityInterface } from "../services/profile";

export class IdentityHttp {

    static async getUserIdentity(payload:{_id:string, options?: string[]}):Promise<UserIdentityInterface> {
        const res: AxiosResponse<UserIdentityInterface> = await $api.post('identity/get-user-identity', payload)  
        return res.data
    }
}