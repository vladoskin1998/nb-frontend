import { createSlice } from "@reduxjs/toolkit"
import {
    authorization,
    logout,
    authorizationMessenger,
} from "../services/auth"
import { ROLES } from "../types/enum"

export const authReducer: any = createSlice({
    name: "auth",
    initialState: {
        isAuth: false,
        isLoad: false,
        payloadUser: {
            email: "",
            role: ROLES.ADMIN,
            id: "",
        },
    },
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
