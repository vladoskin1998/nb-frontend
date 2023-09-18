import { createSlice } from "@reduxjs/toolkit"
import {
    authorization,
    logout,
    authorizationMessenger,
} from "../services/auth"
import { ROLES } from "../types/enum"
import { userChangeLocation } from "../services/user";

interface InitialStateInterface {
    isLoad: boolean
    email: string;
    role: ROLES;
    _id: string;
    coordinates: { lat: number | null, lng: number | null };
    city: string | null;
    country: string | null;
    houseNumber: string | null;
    street: string | null;
    fullName: string;
    isLocationVerify: boolean;
}


const initialState: InitialStateInterface = {
    isLoad: false,
    email: "",
    role: ROLES.ADMIN,
    _id: "",
    coordinates: { lat: null, lng: null },
    city: null,
    country: null,
    houseNumber: null,
    street: null,
    fullName: "",
    isLocationVerify: false,
}

export const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCoordAndAddr: (state, { payload }: {
            payload: {
                coordinates: { lat: number | null; lng: number | null };
                city: string | null;
                country: string | null;
                houseNumber: string | null;
                street: string | null;
            }
        }) => {
            const { coordinates, city, country, houseNumber, street } = payload;
            state.coordinates = coordinates
            state.city = city
            state.country = country
            state.houseNumber = houseNumber
            state.street = street
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authorization.fulfilled, (state, { payload }) => {
                console.log("payload user------->", payload);
                const { coordinates, city, country, houseNumber, street, isLocationVerify } = payload.user;

                // Object.assign(state, payload.user);

                state.coordinates = coordinates
                state.city = city
                state.country = country
                state.houseNumber = houseNumber
                state.street = street
                state.isLocationVerify = isLocationVerify
            })
            .addCase(userChangeLocation.fulfilled, (state, { payload }) => {
                console.log("payload userChangeLocation------->", payload);
                const { isLocationVerify } = payload;
                state.isLocationVerify = isLocationVerify
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

export const { setCoordAndAddr } = userReducer.actions;
export default userReducer.reducer
