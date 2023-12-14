import { AxiosResponse } from "axios";
import $api from ".";
import { ROLES } from "../types/enum";
import { Activities, GetAllPublishServicetInterface, PublishServiceItemInterface, PublishServiceOneItemInterface } from "../types/types";
import { CategoriesItemInterface, SubCategoriesItemInterface } from "../reducer/categories";



export class ServiceHttp {
    static async getAllService(): Promise<CategoriesItemInterface[]> {
        const res: AxiosResponse<CategoriesItemInterface[]> = await $api.get("categories/all-categories")
        return res.data
    }

    static async getAllServiceByName({title}:{title:string}): Promise<PublishServiceItemInterface[]> {
        const res: AxiosResponse<PublishServiceItemInterface[]> = await $api.get(`categories/all-services?name=${title}`)
        console.log("title:"+title)
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

    static async getOnePublishService(): Promise<PublishServiceItemInterface[]> {
        const res: AxiosResponse<PublishServiceItemInterface[]> = await $api.post(`categories/get-ten-publish-service`)
        return res.data
    }

    static async getTenPublishService(): Promise<PublishServiceItemInterface[]> {
        const res: AxiosResponse<PublishServiceItemInterface[]> = await $api.post(`categories/get-ten-publish-service`)
        return res.data
    }


    static async getOnePublsihService(body:{publishServiceId:string}): Promise<PublishServiceOneItemInterface>{
        const res: AxiosResponse<PublishServiceOneItemInterface> = await $api.post(`categories/get-one-publish-service`, body)
        return res.data
    }
}