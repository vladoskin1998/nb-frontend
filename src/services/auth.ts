import { createAsyncThunk } from "@reduxjs/toolkit"
import $api  from "../http";
import { AuthResponseInterface } from "../types/types";
import { METHOD_AUTH } from "../types/enum";

interface AuthorizationPayload {
    method:  METHOD_AUTH;
    email: string;
    password: string;
  }

  interface AuthorizationPayloadMessanger {
    method:  METHOD_AUTH.GOOGLE | METHOD_AUTH.FACEBOOK;
  }

export const refresh = createAsyncThunk<AuthResponseInterface,void>(
    'auth/authorization',
    async () => {
        const response = await $api.post('auth/refresh', {})
        return response.data
    }
)
//<respons axios, payload >
export const authorization = createAsyncThunk<AuthResponseInterface, AuthorizationPayload>(
    'auth/authorization',
    async (payload) => {

        const { method, email, password } = payload
        const response = await $api.post(`auth/${method}`, { email, password })
        return response.data
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await $api.delete('auth/logout')
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


export const Logout = async () => {
    await $api.post(`auth/logout`)
    localStorage.removeItem("accessToken")
    return window.location.href = '/auth'; 
} 