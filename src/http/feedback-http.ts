
import $api from ".";

interface UpdateLikeInterface{
    likeId: string,
    userId: string
}

export class FeedBackHttp {

    static async updateLike(payload: UpdateLikeInterface):Promise<void> {
        await $api.post('likes/update-like', payload)  
    }
}