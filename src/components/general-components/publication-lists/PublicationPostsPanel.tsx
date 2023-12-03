import React from "react"
import { IconComment } from "../../svg/IconFavor"
import {
    IconPostsLike,
    IconPostsRedLike,
    IconPostsRepost,
} from "../../svg/IconPosts"
import { IconProfileInfoBookmark } from "../../svg/IconProfileInfo"
import { PostUserInterface } from "../../../types/types"
import { PublishPostHttp } from "../../../http/publish-post-http"
import { useAppSelector } from "../../../utils/hooks"

export const PublicationPostsPanel = ({
    item,
    updateLike,
    navigateToComments,
    updateMark,
    updateRepost,
}: {
    item: PostUserInterface
    updateLike: (likeId: string, postId: string) => void
    navigateToComments: (postId: string) => void
    updateMark: (postId: string, isMarked: boolean) => void
    updateRepost: ({
        postId,
        isReposted,
    }: {
        postId: string
        isReposted: boolean
    }) => void
}) => {
    const { _id } = useAppSelector((s) => s.userReducer)

    return (
        <div className="admin__posts-list-row4">
            <button onClick={() => updateLike(item.likeId, item._id)}>
                {item.isLiked ? <IconPostsRedLike /> : <IconPostsLike />}

                <span>{item?.likes}</span>
            </button>
            <button onClick={() => navigateToComments(item?._id)}>
                <IconComment />
                <span>{item?.countComments}</span>
            </button>
            <button
                onClick={() =>
                    updateRepost({
                        postId: item?._id,
                        isReposted: item.isReposted,
                    })
                }
                className={`${
                    (item.repostedUserId?._id === _id ||
                        item.userId._id === _id) &&
                    "admin__posts-list-row4-repost--active"
                }`}
                disabled={item.userId._id === _id}
            >
                <IconPostsRepost />
                <span>{item.countReposts}</span>
            </button>
            <div
                onClick={() => updateMark(item._id, item.isMarked)}
                className={`${
                    item.isMarked && "admin__posts-list-row4-repost--active"
                }`}
            >
                <IconProfileInfoBookmark />
            </div>
        </div>
    )
}
