
import $api from ".";



interface RegenereteCodeByEmailInterface{
    email: string,
}


export class AuthHttp {

    static async regenereteCodeByEmail(payload:RegenereteCodeByEmailInterface):Promise<void> {
        await $api.post('auth/regenerete-code-email', payload)  
    }
}