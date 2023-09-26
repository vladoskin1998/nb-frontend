import { createAsyncThunk } from "@reduxjs/toolkit"
import $api from "../http"
import { Nullable } from "../types/types";
import { InitialStateUserInterface ,_IdInterface} from "../reducer/profile";

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

export const profileChangeLocation = createAsyncThunk<LocationPayloadResponse, LocationPayload>(
    'user/profile-location',
    async (payload) => {
        const response = await $api.post('user/profile-location', payload)
        return response.data
    }
)


export const profileUploadAvatar = async (formData: FormData): Promise<{ avatarFileName: string }> => {
    try {
        const response = await $api.post('user/upload-avatar', formData)
        return response.data
    } catch (error) {
        alert("upload avatar is faild")
        throw error
    }
}

type RequestInterface = Nullable<InitialStateUserInterface> & _IdInterface 

export const profileTextInfo = async (payload: RequestInterface ): Promise<Nullable<InitialStateUserInterface>> => {
    try {
        const response = await $api.post('user/profile-text-info', payload)
        return response.data
    } catch (error) {
        alert(error + "faild")
        throw error
    }
}
