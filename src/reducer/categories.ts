import { createSlice } from "@reduxjs/toolkit"
import {
    allCategories,
    allSubCategories,
    deleteCategories,
    deleteSubCategories,
    visiableCategories,
    visiableSubCategories,
} from "../services/categories"
import { Nullable } from "../types/types"

export interface CategoriesItemInterface {
    _id: string
    name: string
    numberView: number
    isVisiable: boolean
    fileName: string
    categoryId?: string
}

export interface SubCategoriesItemInterface extends CategoriesItemInterface {
    subCategoryId?: string
}

interface CategoriesInterface {
    isLoad: boolean
    categories: SubCategoriesItemInterface[] 
    subCategories: CategoriesItemInterface[] 
}

const initialState: CategoriesInterface = {
    isLoad: false,
    categories: [],
    subCategories: [],
}

export const categoriesReducer = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategorie: (state, { payload }: {
            payload: CategoriesItemInterface
        }) => {
            state.categories = [...state.categories, payload]
        },
    },
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
                state.categories = state.categories.filter(
                    (item) => item._id !== payload
                )
            })
            .addCase(deleteSubCategories.fulfilled, (state, { payload }) => {
                state.subCategories = state.subCategories.filter(
                    (item) => item._id !== payload
                )
            })
            /////////////////////////////////// Visiable
            .addCase(visiableCategories.fulfilled, (state, { payload }) => {
                state.categories = state.categories.map((item) =>
                    item._id === payload.id
                        ? { ...item, isVisiable: payload.isVisiable }
                        : item
                )
            })
            .addCase(visiableSubCategories.fulfilled, (state, { payload }) => {
                state.subCategories = state.subCategories.map((item) =>
                    item._id === payload.id
                        ? { ...item, isVisiable: payload.isVisiable }
                        : item
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

export const { addCategorie } = categoriesReducer.actions;
export default categoriesReducer.reducer
