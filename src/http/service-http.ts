import { AxiosResponse } from "axios";
import $api from ".";
import { ROLES } from "../types/enum";
import { Activities } from "../types/types";
import { Categories } from "../services/categories";



export class ServiceHttp {
    static async getAllService(): Promise<Categories[]> {
        const res: AxiosResponse<Categories[]> = await $api.get("categories/all-categories")
        return res.data
    }

    static async getAllSubService({id}:{id:string}): Promise<Categories[]> {
        const res: AxiosResponse<Categories[]> = await $api.get(`categories/sub-categories?id=${id}`)
        return res.data
    }


    static async addPublishService(payload: FormData) {
        const res: AxiosResponse<Activities> = await $api.post("categories/add-publish-service", payload)
        return res.data
    }


}