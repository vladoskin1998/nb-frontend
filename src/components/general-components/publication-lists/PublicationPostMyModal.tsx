import React, { useRef, useState } from "react"
import { Modal } from "../../ui/Modal"
import {
    IconPostModalPromote,
    IconPostModalPin,
    IconPostModalDelete,
} from "../../svg/IconPostModal"
import {
    IconProfileInfoBookmark,
    IconProfileInfoNotification,
    IconProfileInfoPen,
} from "../../svg/IconProfileInfo"
import { IconOpenEye } from "../../svg/IconPassEye"
import { IconComment } from "../../svg/IconFavor"
import { PostUserInterface } from "../../../types/types"
import { useLocation, useNavigate } from "react-router-dom"
import { PublishPrivacyModal } from "../publication/PublishPrivacyModal"
import { NOTIFICATION_POST, PRIVACY } from "../../../types/enum"
import { PublishPostHttp } from "../../../http/publish-post-http"
import { baseURL, roleUrl } from "../../../utils/config"
import { useAppSelector } from "../../../utils/hooks"
export const PublicationPostMyModal = ({
    isOpen,
    setIsOpen,
    item,
    updateMark,
    getAllPostReload,
    updateNotification,
    updatePin,
}: {
    isOpen: boolean
    setIsOpen: (s: boolean) => void
    item: PostUserInterface | null
    getAllPostReload?: () => Promise<void>
    updateMark: (postId: string, isMarked: boolean) => void
    updateNotification: (postId: string, typeNotification: NOTIFICATION_POST) => Promise<void>
    updatePin: (repostedId: string,) => void
}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const {role} = useAppSelector(s=>s.userReducer)
    const updateBookMark = () => {
        if (item?._id) {
            updateMark(item?._id, item?.isMarked)
        }
    }

    const [openPrivacy, setOpenPrivacy] = useState(false)
    const [currentPrivacy, setCurrentPrivacy] = useState(
        item?.privacyPost || PRIVACY.EVERYONE
    )

    const [openPrivacyComment, setOpenPrivacyComment] = useState(false)
    const [currentPrivacyComment, setCurrentPrivacyComment] = useState(
        item?.privacyComment || PRIVACY.EVERYONE
    )

    const editPost = () => {
        navigate("/publish/post", {
            state: {
                postId: item?._id,
                files: item?.filesName,
                text: item?.text,
                title: item?.title,
                coordinates: item?.coordinates,
            },
        })
    }

 

    const openChangePrivacy = () => {
        setOpenPrivacy(true)
        setIsOpen(false)
    }

    const openChangePrivacyComment = () => {
        setOpenPrivacyComment(true)
        setIsOpen(false)
    }

    const changePrivacy = () => {
        if (item?._id) {
            PublishPostHttp.changePostPrivacy({
                postId: item?._id,
                privacyPost: currentPrivacy,
            })
        }
    }

    const changePrivacyComment = () => {
        if (item?._id) {
            PublishPostHttp.changePostPrivacy({
                postId: item?._id,
                privacyComment: currentPrivacyComment,
            })
        }
    }

    const deletePost = async () => {
        if (item?._id) {
            await PublishPostHttp.deletePost({ postId: item?._id })
        }
        if(getAllPostReload){
            await getAllPostReload()
        }
        setIsOpen(false)
        if(location.pathname === `${roleUrl(role)}/comments`){
           navigate(-1)
        }
        
    }

    return (
        <>
            <div
                className={`activities__favor-modal  ${
                    isOpen ? "activities__favor-modal--open" : ""
                }`}
            >
                <Modal className="" setIsOpen={(s: boolean) => setIsOpen(s)}>
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsOpen(false)
                        }}
                        className="activities__favor-modal-linebody"
                    >
                        <button className="activities__favor-modal-line" />
                    </div>
                    <div className="publish__modaladd post__modal">
                        <div className="post__modal_itembg">
                            <div className="post__modal_item">
                                <div>
                                    <IconPostModalPromote />
                                </div>
                                <div>
                                    <h5 className="post__modal_title">
                                        Promote Publiction
                                    </h5>
                                    <h6 className="post__modal-subtitle">
                                        We will show more content like this
                                    </h6>
                                </div>
                            </div>
                        </div>

                        <div className="post__modal_itembg">
                        <div className="post__modal_item" onClick={() => updatePin(item?.repostId || '')}>
                                <div
                                    className={`post__modal_item-button-1 ${
                                        item?.isPined &&
                                        "admin__posts-list-row4-repost--active"
                                    }`}
                                >
                                    <IconPostModalPin />
                                </div>
                                <div>
                                    <h5 className="post__modal_title">
                                        Pin Post
                                    </h5>
                                    <h6 className="post__modal-subtitle">
                                        Elevate this publication for increased
                                        visibility in the community
                                    </h6>
                                </div>
                            </div>

                            <div
                                className="post__modal_item"
                                onClick={updateBookMark}
                            >
                                <div
                                    className={`post__modal_item-button ${
                                        item?.isMarked &&
                                        "admin__posts-list-row4-repost--active"
                                    }`}
                                >
                                    <IconProfileInfoBookmark />
                                </div>
                                <div>
                                    <h5 className="post__modal_title">
                                        Bookmark
                                    </h5>
                                    <h6 className="post__modal-subtitle">
                                        Save post for later
                                    </h6>
                                </div>
                            </div>

                            <div
                                className="post__modal_item"
                                onClick={editPost}
                            >
                                <div className="post__modal_item-button-1">
                                    <IconProfileInfoPen />
                                </div>
                                <div>
                                    <h5 className="post__modal_title">
                                        Edit Post
                                    </h5>
                                    <h6 className="post__modal-subtitle">
                                        Make changes of this publication
                                    </h6>
                                </div>
                            </div>

                            <div
                                className="post__modal_item"
                                onClick={openChangePrivacy}
                            >
                                <div className="post__modal_item-button-1">
                                    <IconOpenEye />
                                </div>
                                <div>
                                    <h5 className="post__modal_title">
                                        Change Privacy
                                    </h5>
                                    <h6 className="post__modal-subtitle">
                                        Control who can see your post
                                    </h6>
                                </div>
                            </div>

                            <div
                                className="post__modal_item"
                                onClick={openChangePrivacyComment}
                            >
                                <div className="post__modal_item-button-1">
                                    <IconComment />
                                </div>
                                <div>
                                    <h5 className="post__modal_title">
                                        Comments
                                    </h5>
                                    <h6 className="post__modal-subtitle">
                                        Control who can comment your post
                                    </h6>
                                </div>
                            </div>

                            <div className="post__modal_item" onClick={() => updateNotification(item?._id || '', NOTIFICATION_POST.COMMENT)}>
                                <div
                                    className={`post__modal_item-button-1 ${
                                        item?.isNotificatedComment &&
                                        "admin__posts-list-row4-repost--active"
                                    }`}
                                >
                                    <IconProfileInfoNotification />
                                </div>
                                <div>
                                    <h5 className="post__modal_title">
                                        Turn on Notifications
                                    </h5>
                                    <h6 className="post__modal-subtitle">
                                        Get notified about new comments
                                    </h6>
                                </div>
                            </div>

                            <div
                                className="post__modal_item"
                                onClick={deletePost}
                            >
                                <div className="post__modal_item-button-1">
                                    <IconPostModalDelete />
                                </div>
                                <div>
                                    <h5 className="post__modal_title">
                                        Delete Post
                                    </h5>
                                    <h6 className="post__modal-subtitle">
                                        Delete this post forever
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>

            <PublishPrivacyModal
                isOpen={openPrivacy}
                setIsOpen={setOpenPrivacy}
                currentPrivacy={currentPrivacy}
                setCurrentPrivacy={setCurrentPrivacy}
                applyMethod={changePrivacy}
            />

            <PublishPrivacyModal
                isOpen={openPrivacyComment}
                setIsOpen={setOpenPrivacyComment}
                currentPrivacy={currentPrivacyComment}
                setCurrentPrivacy={setCurrentPrivacyComment}
                applyMethod={changePrivacyComment}
                title={"Select Privacy Comment"}
                subtitle={"Control who can comment your post"}
            />
        </>
    )
}
