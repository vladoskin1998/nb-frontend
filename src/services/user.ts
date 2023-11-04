import $api from "../http"
import { UserInitialStateInterface } from "../reducer/users"
import { Nullable } from "../types/types"

export const userTextInfo = async (payload: Nullable<UserInitialStateInterface>): Promise<Nullable<UserInitialStateInterface>> => {
    try {
        const response = await $api.post('user/user-text-info', payload)
        return response.data
    } catch (error) {
        alert(error + "faild")
        throw error
    }
}

export type ChangePasswordType = {
    _id: string
    password: string
    newPassword1: string
    newPassword2: string
}

export const userChangePassword = async (payload: ChangePasswordType): Promise<string> => {
    try {
        const response = await $api.post('/user/user-change-password', payload)
        alert(response.data)
        return response.data
    } catch (error) {
        alert(error + "Password change faild")
        throw error
    }
}


