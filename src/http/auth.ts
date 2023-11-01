
import { AxiosResponse } from "axios";
import $api from ".";



interface RegenereteCodeByEmailInterface{
    email: string,
}


export class AuthHttp {

    static async regenereteCodeByEmail(payload:RegenereteCodeByEmailInterface):Promise<void> {
        await $api.post('auth/regenerete-code-email', payload)  
    }

    
    static async getPhone(payload:{email:string}):Promise<{email:string, phone:string}> {
        const res:AxiosResponse<{email:string, phone:string}> = await $api.post('auth/get-phone-number', payload)  
        return res.data
    }
}