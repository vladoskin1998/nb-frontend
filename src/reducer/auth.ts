import { createSlice } from "@reduxjs/toolkit"
import {
    authorization,
    logout,
    authorizationMessenger,
    refresh,
    confirmEmail
} from "../services/auth"
import { ROLES } from "../types/enum"

interface InitialStateInterface {
    isAuth: boolean,
    isLoad: boolean,
    accessToken: string | null | undefined
    authError: string
    codeError: string
 
}

const initialState: InitialStateInterface = {
    isAuth: false,
    isLoad: false,
    accessToken: null,
    authError: "",
    codeError: "",

}

export const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        changeAuthError: (state, { payload }: {
            payload: string
        }) => {
            state.authError = payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(refresh.fulfilled, (state, { payload }) => {
                localStorage.setItem("accessToken", payload.accessToken)
                state.accessToken = payload.accessToken
                state.isAuth = true
            })
            .addCase(authorization.fulfilled, (state, { payload }) => {
                localStorage.setItem("accessToken", payload.accessToken)
                state.accessToken = payload.accessToken
                state.isAuth = true
            })
            .addCase(authorization.rejected, (state, action) => {
                state.authError = action.error?.message || ''
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.removeItem("accessToken")
                state.accessToken = null
                state.isAuth = false
            })

        // .addMatcher(
        //     (action) => {
        //         return (
        //             action.type.endsWith("/pending") ||
        //             action.type.endsWith("/fulfilled") ||
        //             action.type.endsWith("/rejected")
        //         )
        //     },
        //     (state, action) => {
        //         state.isLoad = action.type.endsWith("/pending")
        //     }
        // )
    },
})

export const { changeAuthError } = authReducer.actions;
export default authReducer.reducer
