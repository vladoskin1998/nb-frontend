import { createSlice } from "@reduxjs/toolkit"
import { allCategories, allSubCategories, deleteCategories, deleteSubCategories, editCategories, editSubCategories, visiableCategories, visiableSubCategories } from "../services/categories"


// interface Categories {
//     _id: string
//     name: string
//     numberView: number
//     isVisiable: boolean
// }
// interface SubCategories extends Categories { }

interface ActivitiesInterface {
    isLoad: boolean;

}

const initialState: ActivitiesInterface = {
    isLoad: false,
};

export const activitiesReducer = createSlice({
    name: "activities",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => {
                    return (
                        action.type.endsWith("/pending") ||
                        action.type.endsWith("/fulfilled") ||
                        action.type.endsWith("/rejected")
                    );
                },
                (state, action) => {
                    state.isLoad = action.type.endsWith("/pending");
                }
            )
    },
})

export default activitiesReducer.reducer
