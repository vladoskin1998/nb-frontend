import { createAsyncThunk } from "@reduxjs/toolkit"
import $api from "../http";
import { AuthResponseInterface } from "../types/types";
import { METHOD_AUTH } from "../types/enum";
import { AxiosResponse } from "axios";

interface AuthorizationPayload {
    method: METHOD_AUTH;
    email: string;
    password: string;
    fullName?: string;
}

interface AuthorizationPayloadMessanger {
    method: METHOD_AUTH.GOOGLE | METHOD_AUTH.FACEBOOK;
}

export const refresh = createAsyncThunk<AuthResponseInterface, void>(
    'auth/refresh',
    async () => {
        const response = await $api.post('auth/refresh', {})
        return response.data
    }
)
//<respons axios, payload >
export const authorization = createAsyncThunk<AuthResponseInterface, AuthorizationPayload>(
    'auth/authorization',
    async (payload) => {
        try {
            const { method } = payload
            let requestData: { email: string, password: string, fullName?: string } = { email: payload.email, password: payload.password }
            if (payload?.fullName) {
                requestData.fullName = payload.fullName
            }
            const response = await $api.post(`auth/${method}`, requestData)
            return response.data

        } catch (error: any) {
            throw error.response.data.message;
        }
    }
)

export const authorizationMessenger = createAsyncThunk<AuthResponseInterface, AuthorizationPayloadMessanger>(
    'auth/messenger',
    async (payload) => {
        const { method } = payload
        const response = await $api.get(`auth/${method}`)
        return response.data
    }
)


export const logout = createAsyncThunk(
    `auth/logout`,
    async () => {
        await $api.post(`auth/logout`)
        localStorage.removeItem("accessToken")
        window.location.href = '/auth'
    }
)


export interface ConfirmEmailResponseInterface {
    isCheckedEmail: boolean
}

export interface ConfirmEmailPayloadInterface {
    email: string
    code: number
}
export const confirmEmail = createAsyncThunk<ConfirmEmailResponseInterface, ConfirmEmailPayloadInterface>(
    `auth/confirm-code-email`, async (payload) => {
        const res: AxiosResponse<ConfirmEmailResponseInterface> = await $api.post(`auth/confirm-account`, payload)
        return res.data
    }
) 
