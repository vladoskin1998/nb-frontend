import { AxiosResponse } from "axios";
import $api from ".";
import { GetAllPostInterface, CommentInterface, PostUserInterface, PublishPostInterface } from "../types/types";



export class PublishPostHttp {

    static async getPosts(payload: {pageNumber:number,userId:string, isMarkedOption?:boolean}) {
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

    
    static async getMyComments(payload: {_id:string}):Promise<CommentInterface[]> {
        const res: AxiosResponse<CommentInterface[]> = await $api.post("posts/get-my-comments",payload)
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


    static async addRepost(payload: {postId:string,repostedUserId:string}): Promise<void> {
        const res: AxiosResponse<void> = await $api.post("posts/add-repost",payload)
        return res.data
    }

    static async deleteRepost(payload: {postId:string,repostedUserId:string}): Promise<void> {
        const res: AxiosResponse<void> = await $api.post("posts/delete-repost",payload)
        return res.data
    }

    
    static async addMark(payload: {postId:string,marckedUserId:string}): Promise<void> {
        const res: AxiosResponse<void> = await $api.post("posts/add-mark",payload)
        return res.data
    }

    
    static async deleteMark(payload: {postId:string,marckedUserId:string}): Promise<void> {
        const res: AxiosResponse<void> = await $api.post("posts/delete-mark",payload)
        return res.data
    }

}