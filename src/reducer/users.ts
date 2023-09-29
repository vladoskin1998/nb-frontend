import { createSlice } from "@reduxjs/toolkit"
import {
    authorization,
} from "../services/auth"
import { ROLES } from "../types/enum"

export interface UserInitialStateInterface {
    _id: string;
    isLoad: boolean
    email: string;
    role: ROLES;
    fullName: string;
}

const initialState: UserInitialStateInterface = {
    isLoad: false,
    _id: "",
    email: "",
    role: ROLES.ADMIN,
    fullName: "",

}

export const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoader: (state, { payload }: {
            payload: boolean
        }) => {
            state.isLoad = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authorization.fulfilled, (state, { payload }) => {
                console.log("payload user------->", payload.user);
                Object.assign(state, payload.user);

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

export const { setLoader } = userReducer.actions;
export default userReducer.reducer
