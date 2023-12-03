import React, { useState } from "react"
import { baseURL } from "../../../utils/config"
import { CommentInterface } from "../../../types/types"
import moment from "moment"
import { IconPostsRedLike, IconPostsLike } from "../../svg/IconPosts"
import { FeedBackHttp } from "../../../http/feedback-http"
import { useAppSelector } from "../../../utils/hooks"

export const PublicationPostCommentsList = ({
    comments,
    setComments,
}: {
    comments: CommentInterface[]
    setComments: (s: CommentInterface[]) => void
}) => {
    const { _id } = useAppSelector((s) => s.userReducer)

    const updateLike = async (likeId: string, commnetId: string) => {
        await FeedBackHttp.updateLike({
            likeId,
            userId: _id,
        })
        setComments(comments.map((p) => {
                if (p._id === commnetId) {
                    return {
                        ...p,
                        isLiked: !p.isLiked,
                        likes: p.isLiked ? p.likes - 1 : p.likes + 1,
                    }
                } else {
                    return p
                }
            })
        )
    }

    return (
        <>
            {comments.map((it) => (
                <div className="commenst__user commenst__item">
                    <button
                        className="commenst__item-like"
                        onClick={() => updateLike(it.likeId, it._id)}
                    >
                        {it.isLiked ? <IconPostsRedLike /> : <IconPostsLike />}
                    </button>
                    <div className="commenst__user-img">
                        <img
                            src={`${baseURL}/uploads/avatar/${it.userId.avatarFileName}`}
                            alt=""
                        />
                    </div>
                    <div className="commenst__item-body">
                        <p className="commenst__user-info-name commenst__item_body-user">
                            {it.userId.fullName}{" "}
                            <span className="commenst__user-info-time commenst__item_body-user">
                                {moment(it.createdDateComment).format(
                                    "MMM D, h:mm a"
                                )}
                            </span>
                        </p>
                        <div>
                            <p className="commenst__item_body-text">
                                {it.text}
                            </p>
                            <div className="commenst__item_body-likes">
                                <button className="commenst__user-info-time">
                                    Like {it.likes}
                                </button>
                                <button className="commenst__user-info-time">
                                    Reply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
