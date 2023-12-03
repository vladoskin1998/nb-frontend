import React, { useRef, useState } from "react"
import { Modal } from "../../ui/Modal"
import { baseURL } from "../../../utils/config"
import { IconsNewsfeedPlus } from "../../svg/IconsNewsfeed"
import { IconAdminClose } from "../../svg/IconAdminHeader"
import { IconProfileInfoBookmark, IconProfileInfoFlag, IconProfileInfoNotification } from "../../svg/IconProfileInfo"
import { IconPostModalHide, IconPostModalUnmute } from "../../svg/IconPostModal"

export const PublicationPostNeibModal = ({
    isOpen,
    setIsOpen,
    options,
}: {
    isOpen: boolean
    setIsOpen: (s: boolean) => void
    options: {
        postId: string
        avatarFileName: string
        fullName: string
    }
}) => {
    return (
        <div
            className={`activities__favor-modal  ${
                isOpen ? "activities__favor-modal--open" : ""
            }`}
        >
            <Modal setIsOpen={(s: boolean) => setIsOpen(s)}>
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
                        <div className="post__modal_item post__modal_item-img">
                            <div>
                                <img
                                    src={`${baseURL}/uploads/avatar/${options?.avatarFileName}`}
                                    alt=""
                                />
                            </div>
                            <div>
                                <h5 className="post__modal_title">Connect</h5>
                                <h6 className="post__modal-subtitle">
                                    Follow <b>{options.fullName}</b> posts
                                </h6>
                            </div>
                        </div>
                    </div>

                    <div className="post__modal_itembg">
                        <div className="post__modal_item">
                            <div>
                                <IconsNewsfeedPlus />
                            </div>
                            <div>
                                <h5 className="post__modal_title">
                                More
                                </h5>
                                <h6 className="post__modal-subtitle">
                                We will show more content like this
                                </h6>
                            </div>
                        </div>
                 
                        <div className="post__modal_item">
                            <div>
                                <IconAdminClose />
                            </div>
                            <div>
                                <h5 className="post__modal_title">
                                Less
                                </h5>
                                <h6 className="post__modal-subtitle">
                                We will show less content like this
                                </h6>
                            </div>
                        </div>

                    </div>


                    <div className="post__modal_itembg">

                        <div className="post__modal_item">
                            <div  className="post__modal_item-button-1">
                                <IconProfileInfoNotification />
                            </div>
                            <div>
                                <h5 className="post__modal_title">
                                Turn on notifications
                                </h5>
                                <h6 className="post__modal-subtitle">
                                Get notified about new comments
                                </h6>
                            </div>
                        </div>
                 
                        <div className="post__modal_item">
                            <div  className="post__modal_item-button-1">
                                <IconProfileInfoFlag />
                            </div>
                            <div>
                                <h5 className="post__modal_title">
                                Report
                                </h5>
                                <h6 className="post__modal-subtitle">
                                Flag for review
                                </h6>
                            </div>
                        </div>

                        <div className="post__modal_item">
                            <div  className="post__modal_item-button-1">
                                <IconPostModalHide />
                            </div>
                            <div>
                                <h5 className="post__modal_title">
                                Hide
                                </h5>
                                <h6 className="post__modal-subtitle">
                                Remove post from your feed
                                </h6>
                            </div>
                        </div>

                        <div className="post__modal_item">
                            <div  className="post__modal_item-button-1">
                                <IconPostModalUnmute />
                            </div>
                            <div>
                                <h5 className="post__modal_title">
                                Mute Username
                                </h5>
                                <h6 className="post__modal-subtitle">
                                Hide all posts from this neighbor
                                </h6>
                            </div>
                        </div>

                        <div className="post__modal_item">
                            <div  className="post__modal_item-button">
                                <IconProfileInfoBookmark />
                            </div>
                            <div>
                                <h5 className="post__modal_title">Bookmark</h5>
                                <h6 className="post__modal-subtitle">
                                    Save post for later
                                </h6>
                            </div>
                        </div>
                 

                    </div>

                    


                </div>

               
            </Modal>
        </div>
    )
}
