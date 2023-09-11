import { createSlice } from "@reduxjs/toolkit"
import { allCategories, allSubCategories, deleteCategories, deleteSubCategories, editCategories, editSubCategories, visiableCategories, visiableSubCategories } from "../services/categories"


interface Categories {
    _id: string
    name: string
    numberView: number
    isVisiable: boolean
}
interface SubCategories extends Categories { }

interface CategoriesInterface {
    isLoad: boolean;
    categories: Categories[]; // Вам также нужно определить тип Categories
    subCategories: SubCategories[]; // Замените 'any' на правильный тип, если это возможно
}

const initialState: CategoriesInterface = {
    isLoad: false,
    categories: [],
    subCategories: [],
};

export const categoriesReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /////////////////////////////////GET all categories subcategories
            .addCase(allCategories.fulfilled, (state, { payload }) => {

                state.categories = payload
            })
            .addCase(allSubCategories.fulfilled, (state, { payload }) => {

                state.subCategories = payload
            })
            /////////////////////////////////DELETE all categories subcategories
            .addCase(deleteCategories.fulfilled, (state, { payload }) => {

                state.categories = state.categories.filter(item => item._id !== payload)
            })
            .addCase(deleteSubCategories.fulfilled, (state, { payload }) => {
                state.subCategories = state.subCategories.filter(item => item._id !== payload)
            })
            /////////////////////////////////// Visiable
            .addCase(visiableCategories.fulfilled, (state, { payload }) => {
                state.categories = state.categories.map(item => item._id === payload.id ? { ...item, isVisiable: payload.isVisiable } : item)
            })
            .addCase(visiableSubCategories.fulfilled, (state, { payload }) => {
                state.subCategories = state.subCategories.map(item => item._id === payload.id ? { ...item, isVisiable: payload.isVisiable } : item)
            })
            /////////////////////////////////// edit
            .addCase(editCategories.fulfilled, (state, { payload }) => {
                state.categories = state.categories.map(item => item._id === payload.id ? { ...item, name: payload.name } : item)
            })
            .addCase(editSubCategories.fulfilled, (state, { payload }) => {
                state.subCategories = state.subCategories.map(item => item._id === payload.id ? { ...item, name: payload.name } : item)
            })
    },
})

export default categoriesReducer.reducer
