import { createAsyncThunk } from "@reduxjs/toolkit"
import $api from "../http"

interface Activities {
    _id: string
    name: string
    numberView: number
    isVisiable: boolean
}

export const allActivities = createAsyncThunk<Activities[], void>(
    "activities/all-activities",
    async () => {
        const response = await $api.get("activities/all-activities")
        return response.data
    }
)

export const addActivities = createAsyncThunk<void, FormData>(
    "activities/add-activitie",
    async (payload) => {
        const response = await $api.post("activities/add-activitie", payload)
        return response.data
    }
)
