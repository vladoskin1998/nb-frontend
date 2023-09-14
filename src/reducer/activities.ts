import { createSlice } from "@reduxjs/toolkit"
import { allActivities } from "../services/activities"

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
