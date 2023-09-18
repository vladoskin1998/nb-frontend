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
    accessToken: string | null | undefined
}

const initialState: InitialStateInterface = {
    isAuth: false,
    isLoad: false,
    accessToken: null
}

export const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(authorization.fulfilled, (state, { payload }) => {
                localStorage.setItem("accessToken", payload.accessToken)
                state.accessToken = payload.accessToken
                state.isAuth = true
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.removeItem("accessToken")
                state.accessToken = null
                state.isAuth = false
            })
            .addMatcher(
                (action) => {
                    return (
                        action.type.endsWith("/pending") ||
                        action.type.endsWith("/fulfilled") ||
                        action.type.endsWith("/rejected")
                    )
                },
                (state, action) => {
                    state.isLoad = action.type.endsWith("/pending")
                }
            )
    },
})

export const { } = authReducer.actions;
export default authReducer.reducer
