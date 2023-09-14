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

export const addActivities = createAsyncThunk<Activities, FormData>(
    "activities/add-activitie",
    async (payload) => {
        const response = await $api.post("activities/add-activitie", payload)
        return response.data
    }
)


export const deleteActivities = createAsyncThunk<string, { id: string }>(
    `activities/delete-activities`,
    async (payload) => {
        const response = await $api.post(`activities/delete-activities`, { id: payload.id })
        return response.data
    }
)

export const visiableActivities = createAsyncThunk<{id:string, isVisiable: boolean}, {id:string, isVisiable: boolean}>(
    `activities/visiable-activities`,
    async (payload) => {
      const response = await $api.post(`activities/visiable-activities`, payload)
      return response.data
    }
  )
  
