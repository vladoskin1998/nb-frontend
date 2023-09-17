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
        email: string;
        role: ROLES;
        _id: string;
        coordinars: { lat: number | null, lng: number | null };
        city: string | null;
        country: string | null;
        houseNumber: string | null;
        street: string | null;
        fullName: string;
    },
}

const initialState: InitialStateInterface = {
    isAuth: false,
    isLoad: false,
    payloadUser: {
        email: "",
        role: ROLES.ADMIN,
        _id: "",
        coordinars: { lat: null, lng: null },
        city: null,
        country: null,
        houseNumber: null,
        street: null,
        fullName:""
    },
}

export const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCoordinatesAndAddress: (state, { payload }: {
            payload: {
                coordinates: { lat: number | null; lng: number | null };
                city: string | null;
                country: string | null;
                houseNumber: string | null;
                street: string | null;
            }
        }) => {
            const { coordinates, city, country, houseNumber, street } = payload;
            state.payloadUser.coordinars = coordinates

            state.payloadUser.city = city
            state.payloadUser.country = country
            state.payloadUser.houseNumber = houseNumber
            state.payloadUser.street = street
        }
    },
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

export const { setCoordinatesAndAddress } = authReducer.actions;
export default authReducer.reducer
