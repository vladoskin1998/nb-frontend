import { AxiosResponse } from "axios";
import $api from ".";
import { GetAllPostInterface, PublishPostInterface } from "../types/types";



export class PublishPostHttp {

    static async getPost(payload: {pageNumber:number}) {
        const res: AxiosResponse<GetAllPostInterface> = await $api.post("posts/get-posts",payload)
        return res.data
    }

    static async addPost(payload: FormData) {
        const res: AxiosResponse<PublishPostInterface> = await $api.post("posts/add-post",payload)
        return res.data
    }
}