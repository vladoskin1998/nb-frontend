import { AxiosResponse } from "axios";
import $api from ".";
import { ROLES } from "../types/enum";
import { Activities, GetAllPublishServicetInterface } from "../types/types";
import { CategoriesItemInterface, SubCategoriesItemInterface } from "../reducer/categories";



export class ServiceHttp {
    static async getAllService(): Promise<CategoriesItemInterface[]> {
        const res: AxiosResponse<CategoriesItemInterface[]> = await $api.get("categories/all-categories")
        return res.data
    }

    static async getAllSubService({ id }: { id: string }): Promise<SubCategoriesItemInterface[]> {
        const res: AxiosResponse<SubCategoriesItemInterface[]> = await $api.get(`categories/sub-categories?id=${id}`)
        return res.data
    }


    static async addPublishService(payload: FormData) {
        const res: AxiosResponse<Activities> = await $api.post("categories/add-publish-service", payload)
        return res.data
    }


    static async getAllPublishService(payload: {
        pageNumber: number
        subServicesId: string
    }): Promise<GetAllPublishServicetInterface> {
        const res: AxiosResponse<GetAllPublishServicetInterface> = await $api.post(`categories/get-publish-service`, payload)
        return res.data
    }

    static async moveSubService(payload: {
        newCategoryId: string;
        subCategiryId: string;
    }) {
        const res: AxiosResponse<Activities> = await $api.post("categories/move-subcategory", payload)
        return res.data
    }

    

}