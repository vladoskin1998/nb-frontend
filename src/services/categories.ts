import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../http";
import { ServiceHttp } from "../http/service-http";


export interface Categories {
  _id: string
  name: string
  numberView: number
  isVisiable:boolean
  fileName: string
}

//<respons axios, payload >
/////////////////////////////////////get all
export const allCategories = createAsyncThunk<Categories[], void>(
  'categories/all-categories',
  async () => {
    const response = await ServiceHttp.getAllService()
    return response
  }
)

export const allSubCategories = createAsyncThunk<Categories[], {id:string}>(
  `categories/sub-categories`,
  async (payload) => {
    const response = await ServiceHttp.getAllSubService(payload)
    return response
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



