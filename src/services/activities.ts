import { createAsyncThunk } from "@reduxjs/toolkit"
import $api from "../http"
import { Activities } from "../types/types"
import { ActivitiesHttp } from "../http/activities-http"



export const allActivities = createAsyncThunk<Activities[], void>(
    "activities/all-activities",
    async () => {
        const response = await ActivitiesHttp.getAllActivities()
        return response
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
  
