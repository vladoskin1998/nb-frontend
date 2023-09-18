import { createAsyncThunk } from "@reduxjs/toolkit"
import $api from "../http"

interface LocationPayload {
    coordinates: { lat: number | null, lng: number | null };
    city: string | null;
    country: string | null;
    houseNumber: string | null;
    street: string | null;
}

interface LocationPayloadResponse {
    isLocationVerify:boolean
}

export const userChangeLocation = createAsyncThunk<LocationPayloadResponse, LocationPayload>(
    'user/location',
    async (payload) => {
        const response = await $api.post('user/location', payload)
        return response.data
    }
)

