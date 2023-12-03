import React, { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { CommentInterface, PostUserInterface } from "../../../types/types"
import { PublishPostHttp } from "../../../http/publish-post-http"
import { useAppSelector } from "../../../utils/hooks"
import { PostSlick } from "../../ui/PostSlick"
import { baseURL } from "../../../utils/config"
import { ButtonBackRoute } from "../../ui/ButtonBackRoute"
import { IconServicesAllPoint } from "../../svg/IconServicesAll"
import moment from "moment"
import { IconProfileInfoBookmark } from "../../svg/IconProfileInfo"
import { PublishAddLocation } from "../publication/PublishAddLocation"
import {
    IconPostsLike,
    IconPostsRedLike,
    IconPostsRepost,
} from "../../svg/IconPosts"
import { IconComment } from "../../svg/IconFavor"
import { Loader } from "../../ui/Loader"
import { TextareaAutosize } from "@mui/material"
import { success } from "../../ui/LoadSuccess"
import { PublicationPostCommentsList } from "./PublicationPostCommentsList"
import { FeedBackHttp } from "../../../http/feedback-http"
import { PublicationPostCommentsView } from "./PublicationPostCommentsView"

export const PublicationPostComments = () => {
    const [searchParams] = useSearchParams()
    const [post, setPost] = useState<PostUserInterface>()
    const [comments, setComments] = useState<CommentInterface[]>([])
    const { _id, fullName } = useAppSelector((s) => s.userReducer)
    const { userIdentityId } = useAppSelector((s) => s.profileReducer)
    const [countComments, setCountComments] = useState(0)
    const navigate = useNavigate()
    const [text, setText] = useState("")

    const getPostData = async () => {
        const postId = searchParams.get("postId") || ""
        const { post } = await PublishPostHttp.getPost({
            postId,
            userId: _id,
        })
        setPost(post)
    }

    const getCommentData = async () => {
        const postId = searchParams.get("postId") || ""
        const { comments, countComments } = await PublishPostHttp.getComments({
            postId,
            userId: _id,
        })
        setCountComments(countComments)
        setComments(comments)
    }

    useEffect(() => {
        const bodyEffect = async () => {
            await getPostData()

            await getCommentData()
        }
        bodyEffect()
    }, [])

    const sendComment = async () => {
        const postId = searchParams.get("postId") || ""
        await PublishPostHttp.addComment({
            postId,
            userId: _id,
            userIdentityId,
            text,
        })
        success()
        getCommentData()
        setText("")
    }

    const updateLike = async (likeId: string, postId: string) => {
        await FeedBackHttp.updateLike({
            likeId,
            userId: _id,
        })
        setPost((p) =>
            p
                ? {
                      ...p,
                      isLiked: !p.isLiked,
                      likes: p.isLiked ? p.likes - 1 : p.likes + 1,
                  }
                : p
        )
    }

    const updateRepost = async ({
        postId,
        isReposted,
    }: {
        postId: string
        isReposted: boolean
    }) => {
        if (!isReposted ) {
            await PublishPostHttp.addRepost({
                postId,
                repostedUserId: _id,
            })
           
        }
        else{
            await PublishPostHttp.deleteRepost({
                postId,
                repostedUserId: _id,
            })
        }

        if(post){
            setPost((s) => ({
                ...post,
                isReposted: !isReposted,
                countReposts: !isReposted ? post.countReposts + 1 : post.countReposts - 1 ,
            }))
        }
    }

    const updateMark = async (postId: string, isMarked: boolean) => {
        if (isMarked) {
            await PublishPostHttp.deleteMark({
                postId,
                marckedUserId: _id,
            })
        } else {
            await PublishPostHttp.addMark({
                postId,
                marckedUserId: _id,
            })
        }

        if (post) {
            setPost({
                ...post,
                isMarked: !post.isMarked,
            })
        }
    }

    return post ? (
        <div className="commenst">
            <div className="commenst__slick">
                <div className="commenst__back">
                    <ButtonBackRoute click={() => navigate(-1)} />
                    <button className="ui-button-back-route">
                        <IconServicesAllPoint />
                    </button>
                </div>
                <PostSlick list={post?.filesName}>
                    {post?.filesName?.map((it) => (
                        <div className="commenst__slick-img">
                            <img
                                src={`${baseURL}/uploads/publish_post/${it}`}
                                alt=""
                            />
                        </div>
                    ))}
                </PostSlick>
                <div className="commenst__slick-bookmark">
                    <button className="ui-button-back-route">
                        <IconProfileInfoBookmark />
                    </button>
                </div>
            </div>
            <div className="commenst__content">
                <div className="commenst__user">
                    <div className="commenst__user-img">
                        <img
                            src={`${baseURL}/uploads/avatar/${post.userId?.avatarFileName}`}
                            alt=""
                        />
                    </div>
                    <div>
                        <p className="commenst__user-info-name">
                            {post.userId.fullName}
                        </p>
                        <p className="commenst__user-info-time">
                            {moment(post.createdRepostDate).format(
                                "MMM D, h:mm a"
                            )}
                        </p>
                    </div>
                </div>
                <h5 className="commenst-title">{post.title}</h5>
                <p className="commenst-subtitle">{post.text}</p>
                <div className="commenst__viewmap">
                    {comments.length > 2 ? (
                        <PublicationPostCommentsView
                            avatar={comments
                                .slice(0, 3)
                                .map((item) => item.userId.avatarFileName)}
                        />
                    ) : (
                        <></>
                    )}

                    <p className="commenst__view-text">
                        Views <b>{post.viewPost}</b>
                    </p>
                    <div className="commenst__map">
                        <PublishAddLocation
                            coordinates={post.coordinates}
                            setCoordinates={() => {}}
                            addressLocation={""}
                            setAddressLocation={() => {}}
                            isOpenInit={true}
                        />
                    </div>
                    <div className="commenst__map-text">
                        {post.addressLocation}
                    </div>
                </div>
                <div>
                    <h5 className="commenst-title">Comments</h5>
                    <PublicationPostCommentsList
                        comments={comments}
                        setComments={setComments}
                    />
                </div>
                <div className="admin__posts-list-row4">
                    <button onClick={() => updateLike(post.likeId, post._id)}>
                        {post.isLiked ? (
                            <IconPostsRedLike />
                        ) : (
                            <IconPostsLike />
                        )}

                        <span>{post.likes}</span>
                    </button>
                    <button>
                        <IconComment />
                        <span>{countComments}</span>
                    </button>
                    <button
                        onClick={() =>
                            updateRepost({
                                postId: post?._id,
                                isReposted: post.isReposted,
                            })
                        }
                        className={`${
                            (post.repostedUserId?._id === _id ||
                                post.userId._id === _id || post.isReposted) &&
                            "admin__posts-list-row4-repost--active"
                        }`}
                        disabled={!(post.userId._id !== _id)}
                    >
                        <IconPostsRepost />
                        <span>{post.countReposts}</span>
                    </button>
                    <div
                        onClick={() => updateMark(post._id, post.isMarked)}
                        className={`${
                            post.isMarked &&
                            "admin__posts-list-row4-repost--active"
                        }`}
                    >
                        <IconProfileInfoBookmark />
                    </div>
                </div>
                <div className="commenst__input">
                    <TextareaAutosize
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="messenger__chat-sender-autoresize"
                        minRows={1}
                        placeholder={`Comment as ${fullName}`}
                    />
                    <button
                        className={`messenger__chat-sender-send ${
                            !text && "messenger__chat-sender-send--disabled"
                        }`}
                        onClick={sendComment}
                        disabled={!text}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <Loader />
    )
}
