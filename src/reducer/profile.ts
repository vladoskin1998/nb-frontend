import { createSlice } from "@reduxjs/toolkit"
import {
    authorization,
} from "../services/auth"
import { ROLES } from "../types/enum"
import { Nullable } from "../types/types"
import { profileChangeLocation } from "../services/profile";

export interface _IdInterface {
    _id: string;
}

export interface InitialStateUserInterface {
    isLoad: boolean
    email: string;
    role: ROLES;
    coordinates: { lat: number , lng: number };
    city: string | null;
    country: string | null;
    houseNumber: string | null;
    street: string | null;
    fullName: string;
    isLocationVerify: boolean;
    createdUserDate: Date;
    blockedUserDate: Date;

    avatarFileName: string | null;
    step: number;
    aboutMe: string;
    dateBirth: null | Date;
    cityBirth: null | string;
}


const initCoordinates = {     
    lat:50.440569860389814,
    lng:30.540884262459286
}

export type InitialStateUserWithIdInterface = InitialStateUserInterface & _IdInterface

const initialState: InitialStateUserWithIdInterface = {
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

    avatarFileName: null,
    step:5,
    aboutMe: "",
    dateBirth: null,
    cityBirth: null
}

export const profileReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        setValueProfileReducer: (state, { payload }: {
            payload: Nullable<InitialStateUserInterface>}) => {
            Object.assign(state, payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authorization.fulfilled, (state, { payload }) => {
                console.log("payload user------->", payload.user);
                Object.assign(state, payload.user);
               
            })
            .addCase(profileChangeLocation.fulfilled, (state, { payload }) => {
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

export const { setValueProfileReducer } = profileReducer.actions;
export default profileReducer.reducer
