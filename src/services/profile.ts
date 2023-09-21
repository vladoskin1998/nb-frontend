import { createAsyncThunk } from "@reduxjs/toolkit"
import $api from "../http"

interface LocationPayload {
    coordinates: { lat: number, lng: number};
    city: string | null;
    country: string | null;
    houseNumber: string | null;
    street: string | null;
    _id: string;
}

interface LocationPayloadResponse {
    isLocationVerify:boolean
}

export const profileChangeLocation = createAsyncThunk<LocationPayloadResponse, LocationPayload>(
    'user/profile-location',
    async (payload) => {
        const response = await $api.post('user/profile-location', payload)
        return response.data
    }
)

