import { createSlice } from "@reduxjs/toolkit"
import {
    authorization,
} from "../services/auth"
import { EDUCATION, FAMILYSTATUS, ONLINEOFFLINE, ORIENTATION, PRIVACY, ROLES, SEX } from "../types/enum"
import { Nullable } from "../types/types"
import { getIdentityInforamation, profileChangeLocation } from "../services/profile";

export interface _IdInterface {
    _id: string
}

export interface userIdentityIdInterface {
    userIdentityId: string
}



export interface ProfileInitialStateInterface extends _IdInterface {


    isLoad: boolean
 
    isLocationVerify: boolean;
    isGotAllProfileInfo: boolean;

    coordinates: { lat: number, lng: number };
    city: string | null;
    country: string | null;
    houseNumber: string | null;
    street: string | null;

    createdUserDate: Date;
    blockedUserDate: Date;

    step: number;

    privacy: PRIVACY;

    aboutMe: string;
    dateBirth: null | Date;
    cityBirth: null | string;
    sex: null | SEX,
    orientation: ORIENTATION,
    familyStatus: null | FAMILYSTATUS

    nationality: { _id: string | number, title: string }[] 
    profession: { _id: string | number, title: string }[]
    interests:  { _id: string | number, title: string }[]
    skills:  { _id: string | number, title: string }[]

    certificatesFileName: string[] | []

    studySchool:string,
    education: EDUCATION | null,

    isAddedServices:boolean,
    isAddedPost:boolean,
    isExploreDone:boolean,

    lastStepChangeProfile: string

    online: ONLINEOFFLINE

}

const initCoordinates = {
    lat: 50.440569860389814,
    lng: 30.540884262459286
}

export type ProfileInitialStateWithIdInterface = ProfileInitialStateInterface & userIdentityIdInterface 

const initialState: ProfileInitialStateWithIdInterface = {

    _id: '',
    isLoad: false,
    userIdentityId: "",

    isLocationVerify: false,
    isGotAllProfileInfo: false,

    coordinates: initCoordinates,
    city: null,
    country: null,
    houseNumber: null,
    street: null,

    createdUserDate: new Date(),
    blockedUserDate: new Date(),

    step: 5,

    privacy: PRIVACY.EVERYONE,

    aboutMe: "",
    dateBirth: null,
    cityBirth: null,
    sex: null,
    orientation: ORIENTATION.HETERO,
    familyStatus: null,
    nationality:  [],

    profession: [],
    interests: [],
    skills: [],

    certificatesFileName: [],

    studySchool:"",
    education: null,

    isAddedServices:false,
    isAddedPost:false,
    isExploreDone:false,

    lastStepChangeProfile: '/profile',

    online: ONLINEOFFLINE.ONLINE
}

export const profileReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        setValueProfileReducer: (state, { payload }: {
            payload: Nullable<ProfileInitialStateInterface>
        }) => {
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
            .addCase(getIdentityInforamation.fulfilled, (state, {payload}) => {
                Object.assign(state, payload);
            })
            .addCase(profileChangeLocation.fulfilled, (state, { payload }) => {
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

export const { setValueProfileReducer, setLoader } = profileReducer.actions;
export default profileReducer.reducer
