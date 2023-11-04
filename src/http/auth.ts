
import { AxiosResponse } from "axios";
import $api from ".";
import { METHOD_FORGET_PASSWORD } from "../types/enum";



interface RegenereteCodeByEmailInterface{
    email: string,
    sendMethod: METHOD_FORGET_PASSWORD
}


export class AuthHttp {

    static async regenereteCodeByEmail(payload:RegenereteCodeByEmailInterface):Promise<void> {
        await $api.post('auth/regenerete-code-email', payload)  
    }

    
    static async getPhone(payload:{email:string}):Promise<{email:string, phone:string}> {
        const res:AxiosResponse<{email:string, phone:string}> = await $api.post('auth/get-phone-number', payload)  
        return res.data
    }

      
    static async forgetPassword(payload:{email:string,code:number}):Promise<{hashPassword:string}> {
        const res:AxiosResponse<{hashPassword:string}> = await $api.post('auth/forget-password', payload)  
        return res.data
    }

    static async changePassword(payload:{ email: string, oldPassword?: string, hashPassword?: string, newPassword: string }):Promise<void> {
        await $api.post('auth/change-password', payload)  
    }

  

}