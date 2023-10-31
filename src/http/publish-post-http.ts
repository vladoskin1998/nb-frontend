import { AxiosResponse } from "axios";
import $api from ".";
import { GetAllPostInterface, CommentInterface, PostUserInterface, PublishPostInterface } from "../types/types";



export class PublishPostHttp {

    static async getPosts(payload: {pageNumber:number,userId:string}) {
        const res: AxiosResponse<GetAllPostInterface> = await $api.post("posts/get-posts",payload)
        return res.data
    }

    static async getPost(payload: {postId:string,userId:string}) {
        const res: AxiosResponse<{post:PostUserInterface}> = await $api.post("posts/get-post",payload)
        return res.data
    }

    static async getComments(payload: {postId:string,userId:string}):Promise<{comments:CommentInterface[], countComments:number}> {
        const res: AxiosResponse<{comments:CommentInterface[], countComments:number}> = await $api.post("posts/get-comments",payload)
        return res.data
    }

    static async addPost(payload: FormData) {
        const res: AxiosResponse<PublishPostInterface> = await $api.post("posts/add-post",payload)
        return res.data
    }

    
    static async addComment(payload: {postId:string,userId:string, userIdentityId:string,text:string,}) {
        const res: AxiosResponse<GetAllPostInterface> = await $api.post("posts/add-comment",payload)
        return res.data
    }
}