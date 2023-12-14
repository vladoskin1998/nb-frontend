import React, { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
    CommentInterface,
    PostUserInterface,
    PublishActivitiesOneItemInterface,
    PublishServiceOneItemInterface,
} from "../../../types/types"
import { PublishPostHttp } from "../../../http/publish-post-http"
import { useAppSelector } from "../../../utils/hooks"
import { PostSlick } from "../../ui/PostSlick"
import { baseURL } from "../../../utils/config"
import { ButtonBackRoute } from "../../ui/ButtonBackRoute"
import { IconServicesAllPoint } from "../../svg/IconServicesAll"
import moment from "moment"
import { IconProfileInfoBookmark } from "../../svg/IconProfileInfo"
import { PublishAddLocation } from "../../general-components/publication/PublishAddLocation"
import {
    IconPostsLike,
    IconPostsRedLike,
    IconPostsRepost,
} from "../../svg/IconPosts"
import { IconComment, IconStars } from "../../svg/IconFavor"
import { Loader } from "../../ui/Loader"
import { TextareaAutosize } from "@mui/material"
import { success } from "../../ui/LoadSuccess"
import { ServiceHttp } from "../../../http/service-http"
import { ActivitiesHttp } from "../../../http/activities-http"

export const UserPublishActivitiesItem = () => {
    // const [myModalOpen, setMyModalOpen] = useState(false)
    // const [neibModalOpen, setNeibModalOpen] = useState(false)

    const [searchParams] = useSearchParams()
    const [publishService, setPublishService] =
        useState<PublishActivitiesOneItemInterface>()
    const { _id, fullName } = useAppSelector((s) => s.userReducer)
    const { userIdentityId } = useAppSelector((s) => s.profileReducer)

    const [comments, setComments] = useState<CommentInterface[]>([])
    const [countComments, setCountComments] = useState(0)
    const navigate = useNavigate()
    const [text, setText] = useState("")

    const getPublishServiceData = async () => {
        const publishActivitiesId = searchParams.get("publishActivitiesId") || ""
        const publishActivities = await ActivitiesHttp.getOnePublsihActivities({
            publishActivitiesId,
        })
        if (publishActivities) {
            setPublishService(publishActivities)
        }
    }

    // const getCommentData = async () => {
    //     const postId = searchParams.get("postId") || ""
    //     const { comments, countComments } = await PublishPostHttp.getComments({
    //         postId,
    //         userId: _id,
    //     })
    //     setCountComments(countComments)
    //     setComments(comments)
    // }

    useEffect(() => {
        const bodyEffect = async () => {
            await getPublishServiceData()

            // await getCommentData()
        }
        bodyEffect()
    }, [])

    // const sendComment = async () => {
    //     const postId = searchParams.get("postId") || ""
    //     await PublishPostHttp.addComment({
    //         postId,
    //         userId: _id,
    //         userIdentityId,
    //         text,
    //     })
    //     success()
    //     getCommentData()
    //     setText("")
    // }

    // const updateLike = async (likeId: string, postId: string) => {
    //     await FeedBackHttp.updateLike({
    //         likeId,
    //         userId: _id,
    //     })
    //     setPost((p) =>
    //         p
    //             ? {
    //                   ...p,
    //                   isLiked: !p.isLiked,
    //                   likes: p.isLiked ? p.likes - 1 : p.likes + 1,
    //               }
    //             : p
    //     )
    // }

    // const updateRepost = async ({
    //     postId,
    //     isReposted,
    // }: {
    //     postId: string
    //     isReposted: boolean
    // }) => {
    //     await PublishPostHttp.updateRepost({
    //         postId,
    //         repostedUserId: _id,
    //     })

    //     if (post) {
    //         setPost((s) => ({
    //             ...post,
    //             isReposted: !isReposted,
    //             countReposts: !isReposted
    //                 ? post.countReposts + 1
    //                 : post.countReposts - 1,
    //         }))
    //     }
    // }

    // const updateMark = async (postId: string, isMarked: boolean) => {
    //     if (isMarked) {
    //         await PublishPostHttp.deleteMark({
    //             postId,
    //             marckedUserId: _id,
    //         })
    //     } else {
    //         await PublishPostHttp.addMark({
    //             postId,
    //             marckedUserId: _id,
    //         })
    //     }

    //     if (post) {
    //         setPost({
    //             ...post,
    //             isMarked: !post.isMarked,
    //         })
    //     }
    // }

    // const updateNotification = async (
    //     postId: string,
    //     typeNotification: NOTIFICATION_POST
    // ) => {
    //     if (post) {
    //         await PublishPostHttp.updateNotification({
    //             postId: postId,
    //             userId: _id,
    //             typeNotification,
    //         })

    //         setPost({
    //             ...post,
    //             [NOTIFICATION_POST.COMMENT === typeNotification
    //                 ? "isNotificatedComment"
    //                 : "isNotificatedPost"]:
    //                 NOTIFICATION_POST.COMMENT === typeNotification
    //                     ? !post.isNotificatedComment
    //                     : !post.isNotificatedPost,
    //         })
    //     }
    // }

    // const updatePin = async (repostId: string) => {
    //     if (post) {
    //         await PublishPostHttp.updatePin({
    //             repostId: repostId,
    //             userId: _id,
    //         })

    //         setPost({
    //             ...post,
    //             isPined: !post.isPined,
    //         })
    //     }
    // }

    // const hidePost = async (body: {
    //     hideUserId?: string
    //     hideRepostId?: string
    // }) => {
    //     if (post) {
    //         await PublishPostHttp.hidePost({
    //             ownerId: _id,
    //             ...body,
    //         })
    //         navigate(-1)
    //     }
    // }

    const toProfileInfo = (prop: {
        _id: string
        email: string
        role: string
        fullName: string
        avatarFileName: string
    }) => {
        navigate("/profileinfo", {
            state: prop,
        })
    }

    // const openModal = () => {
    //     if (post) {
    //         if (post.userId._id === _id) {
    //             setMyModalOpen(true)
    //         } else {
    //             setNeibModalOpen(true)
    //         }
    //     }
    // }

    return publishService ? (
        <div className="commenst user__publish-service">
            <div className="commenst__slick">
                <div className="commenst__back">
                    <ButtonBackRoute click={() => navigate(-1)} />
                    <button
                        className="ui-button-back-route"
                        // onClick={openModal}
                    >
                        <IconServicesAllPoint />
                    </button>
                </div>
                <PostSlick list={publishService?.filesName}>
                    {publishService?.filesName?.map((it) => (
                        <div className="commenst__slick-img">
                            <img
                                src={`${baseURL}/uploads/publish_activities/${it}`}
                                alt=""
                            />
                        </div>
                    ))}
                </PostSlick>
                <div className="commenst__slick-bookmark">
                    <button
                        // onClick={() => updateMark(post._id, post.isMarked)}
                        className={`ui-button-back-route ${
                            // post.isMarked &&
                            "admin__posts-list-row4-repost--active"
                        }`}
                    >
                        <IconProfileInfoBookmark />
                    </button>
                </div>
                <div className="user__publish-service-imgrating">
                    <IconStars />
                    <b>4.5</b>
                    {"(808)"}
                </div>
            </div>
            <div className="commenst__content">
                <div className="commenst__user">
                    <div className="commenst__user-img">
                        <img
                            src={`${baseURL}/uploads/avatar/${publishService.userId?.avatarFileName}`}
                            alt=""
                        />
                    </div>
                    <div>
                        <p className="commenst__user-info-name">
                            {publishService.userId.fullName}
                        </p>
                        <p className="commenst__user-info-time">
                            {moment(
                                publishService.createEventDate
                            ).format("MMM D, h:mm a")}
                        </p>
                    </div>
                </div>
                <h5 className="commenst-title">{publishService.title}</h5>
                <p className="commenst-subtitle">{publishService.text}</p>
                <div className="commenst__viewmap">
                    {/* {comments.length > 2 ? (
                        <PublicationPostCommentsView
                            avatar={comments
                                .slice(0, 3)
                                .map((item) => item.userId.avatarFileName)}
                        />
                    ) : (
                        <></>
                    )} */}
                    {/* <p className="commenst__view-text">
                        Views <b>{post.viewPost}</b>
                    </p> */}
                    <div className="commenst__map">
                        <div className="user__publish-service-location">
                            <div className="user__publish-service-location-img">
                                <img
                                    src={`${baseURL}/uploads/activities/${publishService?.activitiesId?.fileName}`}
                                    alt=""
                                />
                            </div>

                            <div className="user__publish-service-location-text">
                                <h6 className="user__publish-service-location-sub">
                                    {publishService?.activitiesId?.name}
                                </h6>
                            </div>
                        </div>
                        <PublishAddLocation
                            coordinates={publishService.coordinates}
                            setCoordinates={() => {}}
                            addressLocation={""}
                            setAddressLocation={() => {}}
                            isOpenInit={true}
                        />
                    </div>
                    <div className="commenst__map-text">
                        {publishService.addressLocation}
                    </div>
                </div>
                <div>
                    <h5 className="commenst-title user__publish-service-review-title">
                        <IconStars />
                        <b>4.5</b> (808 reviews)
                        <button >Add Review</button>
                    </h5>
                    {/* <PublicationPostCommentsList
                        comments={comments}
                        setComments={setComments}
                    /> */}
                </div>
                <div className="admin__posts-list-row4">
                    {/* <button onClick={() => updateLike(post.likeId, post._id)}>
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
                                post.userId._id === _id ||
                                post.isReposted) &&
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
                    </div> */}
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
                        // onClick={sendComment}
                        disabled={!text}
                    >
                        Send
                    </button>
                </div>
            </div>
            {/* <PublicationPostMyModal
                item={post}
                isOpen={myModalOpen}
                setIsOpen={setMyModalOpen}
                updateMark={updateMark}
                updateNotification={updateNotification}
                updatePin={updatePin}
            />
            <PublicationPostNeibModal
                item={post}
                isOpen={neibModalOpen}
                setIsOpen={setNeibModalOpen}
                updateMark={updateMark}
                updateNotification={updateNotification}
                toProfileInfo={toProfileInfo}
                hidePost={hidePost}
            /> */}
        </div>
    ) : (
        <Loader />
    )
}
