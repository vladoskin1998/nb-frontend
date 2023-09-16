import { createSlice } from "@reduxjs/toolkit"
import {
    authorization,
    logout,
    authorizationMessenger,
} from "../services/auth"
import { ROLES } from "../types/enum"

interface InitialStateInterface {
    isAuth: boolean,
    isLoad: boolean,
    payloadUser: {
        email: string,
        role: ROLES,
        id: string,
        coordinars: { lat: number | null, lng: number | null }
    },
}

const initialState: InitialStateInterface = {
    isAuth: false,
    isLoad: false,
    payloadUser: {
        email: "",
        role: ROLES.ADMIN,
        id: "",
        coordinars: { lat: null, lng: null }
    },
}

export const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authorization.fulfilled, (state, { payload }) => {
                localStorage.setItem("accessToken", payload.accessToken)
                state.isAuth = true
                state.payloadUser = payload.user
            })
            .addCase(logout.fulfilled, (state, { payload }) => {
                localStorage.removeItem("accessToken")
                state.isAuth = false
            })
    },
})

export default authReducer.reducer
