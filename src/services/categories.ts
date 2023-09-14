import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";


interface Categories {
  _id: string
  name: string
  numberView: number
  isVisiable:boolean
}

//<respons axios, payload >
/////////////////////////////////////get all
export const allCategories = createAsyncThunk<Categories[], void>(
  'categories/all-categories',
  async () => {
    const response = await $api.get("categories/all-categories")
    return response.data
  }
)

export const allSubCategories = createAsyncThunk<Categories[], {id:string}>(
  `categories/sub-categories`,
  async (payload) => {
    const response = await $api.get(`categories/sub-categories?id=${payload.id}`)
    return response.data
  }
)

//////////////////////////// delete

export const deleteCategories = createAsyncThunk<string, {id:string}>(
  `categories/delete-category`,
  async (payload) => {
    const response = await $api.post(`categories/delete-category`, {id:payload.id})
    return response.data
  }
)

export const deleteSubCategories = createAsyncThunk<string, {id:string}>(
  `categories/delete-subcategory`,
  async (payload) => {
    const response = await $api.post(`categories/delete-subcategory`, {id:payload.id})
    return response.data
  }
)

///////////////////////// visiable


export const visiableCategories = createAsyncThunk<{id:string, isVisiable: boolean}, {id:string, isVisiable: boolean}>(
  `categories/visiable-category`,
  async (payload) => {
    const response = await $api.post(`categories/visiable-category`, payload)
    return response.data
  }
)

export const visiableSubCategories = createAsyncThunk<{id:string, isVisiable: boolean},  {id:string, isVisiable: boolean}>(
  `categories/visiable-subcategory`,
  async (payload) => {
    const response = await $api.post(`categories/visiable-subcategory`, payload)
    return response.data
  }
)


////////////////////////////// edit


export const editCategories = createAsyncThunk<{id:string, name: string}, {id:string,  name: string}>(
  `categories/edit-category`,
  async (payload) => {
    const response = await $api.post(`categories/edit-category`, payload)
    return response.data
  }
)

export const editSubCategories = createAsyncThunk<{id:string,  name: string},  {id:string,  name: string}>(
  `categories/edit-subcategory`,
  async (payload) => {
    const response = await $api.post(`categories/edit-subcategory`, payload)
    return response.data
  }
)

export const addCategories = createAsyncThunk<Categories,  {link:string,  formData: FormData}>(
  `categories/add-category-subcategory`,
  async (payload) => {
    const response = await $api.post(payload.link, payload.formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
  }
)

