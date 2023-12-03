import React, { useEffect, useState } from "react"
import { useActionData } from "react-router-dom"
import { PublishPostHttp } from "../../../http/publish-post-http"
import { CommentInterface } from "../../../types/types"
import { useAppSelector } from "../../../utils/hooks"
import { PublicationPostCommentsList } from "../publication-lists/PublicationPostCommentsList"

export const ListCommentsPost = () => {

    const {_id} = useAppSelector(s => s.userReducer)
    const [comments, setComments] = useState<CommentInterface[]>([])
    useEffect(() => {
        PublishPostHttp.getMyComments({_id})
            .then(res => setComments(res.map(item => ({...item, likes: item.likes}))))
    }, [])

    return <div>
       <PublicationPostCommentsList comments={comments} setComments={setComments}/>
    </div>
}
