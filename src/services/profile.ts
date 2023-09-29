import { createAsyncThunk } from "@reduxjs/toolkit"
import $api from "../http"
import { Nullable } from "../types/types";
import { ProfileInitialStateInterface, _IdInterface} from "../reducer/profile";
import { FAMILYSTATUS, ORIENTATION, QUALITYENUM, SEX } from "../types/enum";

interface LocationPayload {
    coordinates: { lat: number, lng: number };
    city: string | null;
    country: string | null;
    houseNumber: string | null;
    street: string | null;
    _id: string;
}

interface LocationPayloadResponse {
    isLocationVerify: boolean
}

export interface UserIdentityInterface{
    isLocationVerify: boolean
    coordinates: { lat: number, lng: number };
    city: string | null;
    country: string | null;
    houseNumber: string | null;
    street: string | null;
    fullName: string;

    createdUserDate: Date;
    blockedUserDate: Date;

    avatarFileName: string | null;
    step: number;
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
}

export const getIdentityInforamation = createAsyncThunk<UserIdentityInterface, {_id:string}>(
    'identity/get-user-identity',
    async (payload) => {
        const response = await $api.post('identity/get-user-identity', payload)    
        return response.data
    }
)
 

export const profileChangeLocation = createAsyncThunk<LocationPayloadResponse, LocationPayload>(
    'identity/profile-location',
    async (payload) => {
        const response = await $api.post('identity/profile-location', payload)
        return response.data
    }
)


export const profileUploadAvatar = async (formData: FormData): Promise<{ avatarFileName: string }> => {
    try {
        const response = await $api.post('identity/upload-avatar', formData)
        return response.data
    } catch (error) {
        alert("upload avatar is faild")
        throw error
    }
}

export const profileUploadCertificates = async (formData: FormData): Promise<{ certificatesFileName: string[] }> => {
    try {
        const response = await $api.post('identity/upload-certificates', formData)
        return response.data
    } catch (error) {
        alert("upload certificates is faild")
        throw error
    }
}


type RequestInterface = Nullable<ProfileInitialStateInterface> & _IdInterface 


export const profileTextInfo = async (payload: RequestInterface ): Promise<Nullable<ProfileInitialStateInterface>> => {
    try {
        const response = await $api.post('identity/profile-text-info', payload)
        return response.data
    } catch (error) {
        alert(error + "faild")
        throw error
    }
}

type RequestSelectInterface = {
    value:{ _id: string | number, title: string }[],
    quality: QUALITYENUM,
} & _IdInterface 

export const profilePutIdentity = async (payload: RequestSelectInterface ): Promise<Nullable<ProfileInitialStateInterface>> => {
    try {
        const response = await $api.post('identity/put-profile-identity', payload)
        return response.data
    } catch (error) {
        alert(error + "faild")
        throw error
    }
}
