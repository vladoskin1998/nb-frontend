import { createSlice } from "@reduxjs/toolkit"
import {
    authorization,
} from "../services/auth"
import { ROLES } from "../types/enum"
import { userChangeLocation } from "../services/user";

export interface InitialStateUserInterface {
    isLoad: boolean
    email: string;
    role: ROLES;
    _id: string;
    coordinates: { lat: number , lng: number };
    city: string | null;
    country: string | null;
    houseNumber: string | null;
    street: string | null;
    fullName: string;
    isLocationVerify: boolean;
    createdUserDate: Date;
    blockedUserDate: Date;
}


const initCoordinates = {     
    lat:50.440569860389814,
    lng:30.540884262459286
}

const initialState: InitialStateUserInterface = {
    isLoad: false,
    email: "",
    role: ROLES.ADMIN,
    _id: "",
    coordinates: initCoordinates,
    city: null,
    country: null,
    houseNumber: null,
    street: null,
    fullName: "",
    isLocationVerify: false,
    createdUserDate: new Date(),
    blockedUserDate:  new Date(),
}

export const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCoordAndAddr: (state, { payload }: {
            payload: {
                coordinates: { lat: number ; lng: number };
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
                console.log("payload user------->", payload.user);
                Object.assign(state, payload.user);
               
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
                    state.coordinates = state.coordinates.lat === null || state.coordinates.lng === null 
                        ? initCoordinates : state.coordinates
                }
            )
    },
})

export const { setCoordAndAddr } = userReducer.actions;
export default userReducer.reducer
