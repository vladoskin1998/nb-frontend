import { AxiosResponse } from "axios";
import $api from ".";

export interface PublishPostInterface {
    userId: string;
    title: string;
    text: string;
    filesName: string[];
    coordinates: { lat: number; lng: number };
}

export class PublishPostHttp {
    static async addPost(payload: FormData) {
        const res: AxiosResponse<PublishPostInterface> = await $api.post("posts/add-post",payload)
        return res.data
    }
}