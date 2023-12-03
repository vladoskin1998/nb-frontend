import React, { useRef, useState } from "react"
import { Modal } from "../../ui/Modal"
import { PHOTO_ADD_METHOD } from "../../../types/enum"
import { IconPostModalPromote, IconPostModalPin, IconPostModalDelete } from "../../svg/IconPostModal"
import { IconProfileInfoBookmark, IconProfileInfoNotification, IconProfileInfoPen } from "../../svg/IconProfileInfo"
import { IconOpenEye } from "../../svg/IconPassEye"
import { IconComment } from "../../svg/IconFavor"

export const PublicationPostMyModal = ({
    isOpen,
    setIsOpen,
    options,
}: {
    isOpen: boolean
    setIsOpen: (s: boolean) => void
    options: {
        postId: string,
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
                        <div className="post__modal_item">
                            <div>
                                <IconPostModalPin />
                            </div>
                            <div>
                                <h5 className="post__modal_title">Pin Post</h5>
                                <h6 className="post__modal-subtitle">
                                    Elevate this publication for increased
                                    visibility in the community
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
                 

                   
                        <div className="post__modal_item">
                            <div  className="post__modal_item-button-1">
                                <IconProfileInfoPen />
                            </div>
                            <div>
                                <h5 className="post__modal_title">Edit Post</h5>
                                <h6 className="post__modal-subtitle">
                                    Make changes of this publication
                                </h6>
                            </div>
                        </div>
                

               
                        <div className="post__modal_item">
                            <div  className="post__modal_item-button-1">
                                <IconOpenEye />
                            </div>
                            <div>
                                <h5 className="post__modal_title">Change Privacy</h5>
                                <h6 className="post__modal-subtitle">
                                    Control who can see your post
                                </h6>
                            </div>
                        </div>
   

                  
                        <div className="post__modal_item">
                            <div  className="post__modal_item-button-1">
                                <IconComment />
                            </div>
                            <div>
                                <h5 className="post__modal_title">Comments</h5>
                                <h6 className="post__modal-subtitle">
                                    Control who can comment your post
                                </h6>
                            </div>
                        </div>
      
              
                        <div className="post__modal_item">
                            <div  className="post__modal_item-button-1">
                                <IconProfileInfoNotification />
                            </div>
                            <div>
                                <h5 className="post__modal_title">Comments</h5>
                                <h6 className="post__modal-subtitle">
                                    Control who can comment your post
                                </h6>
                            </div>
                        </div>
                

                    
                        <div className="post__modal_item">
                            <div  className="post__modal_item-button-1">
                                <IconPostModalDelete />
                            </div>
                            <div>
                                <h5 className="post__modal_title">Delete Post</h5>
                                <h6 className="post__modal-subtitle">
                                    Delete this post forever
                                </h6>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
        </div>
    )
}
