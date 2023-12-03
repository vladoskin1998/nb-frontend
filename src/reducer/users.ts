import { createSlice } from "@reduxjs/toolkit"
import {
    authorization, confirmEmail, refresh,
} from "../services/auth"
import { ROLES } from "../types/enum"
import { Nullable } from "../types/types";

export interface UserInitialStateInterface {
    _id: string;
    isLoad: boolean
    email: string;
    role: ROLES;
    fullName: string;
    phone?: string
    isCheckedEmail: boolean
    avatarFileName: string | null;
}

const initialState: UserInitialStateInterface = {
    isLoad: false,
    _id: "",
    email: "",
    role: ROLES.ADMIN,
    fullName: "",
    phone: "",
    isCheckedEmail: false,
    avatarFileName:  null

}

export const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        setValueUserReducer: (state, { payload }: {
            payload: Nullable<UserInitialStateInterface>
        }) => {
            if (payload?._id) {
                delete payload._id
            }
            Object.assign(state, payload);
        },
        setLoader: (state, { payload }: {
            payload: boolean
        }) => {
            state.isLoad = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(refresh.fulfilled, (state, { payload }) => {
                Object.assign(state, payload.user);
            })
            .addCase(authorization.fulfilled, (state, { payload }) => {
                Object.assign(state, payload.user);
            })
            .addCase(confirmEmail.fulfilled, (state, { payload }) => {
                state.isCheckedEmail = payload.isCheckedEmail
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

export const { setLoader, setValueUserReducer } = userReducer.actions;
export default userReducer.reducer
