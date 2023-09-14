import { createSlice } from "@reduxjs/toolkit"
import { addActivities, allActivities, deleteActivities } from "../services/activities"

interface Activities {
    _id: string
    name: string
    numberView: number
    isVisiable: boolean
}

interface ActivitiesInterface {
    isLoad: boolean
    activities: Activities[]
}

const initialState: ActivitiesInterface = {
    isLoad: false,
    activities: [],
}

export const activitiesReducer = createSlice({
    name: "activities",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allActivities.fulfilled, (state, { payload }) => {
                state.activities = payload
            })
            .addCase(addActivities.fulfilled, (state, { payload }) => {
                state.activities = [...state.activities, payload]
            })
            .addCase(deleteActivities.fulfilled, (state, { payload }) => {
                state.activities = state.activities.filter(
                    (item) => item._id !== payload
                )
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
                }
            )
    },
})

export default activitiesReducer.reducer
