import React from "react"
import { IconNeibs } from "../../svg/IconPassEye"
import { IconsNewsfeedPlus } from "../../svg/IconsNewsfeed"
import { useNavigate } from "react-router-dom"
import { roleUrl } from "../../../utils/config"
import { useAppSelector } from "../../../utils/hooks"

export const GetStartedMessenger = () => {

    const navigate = useNavigate()
    const {role} = useAppSelector(s => s.userReducer)

    const toUserChatList = () => {
        navigate(`${roleUrl(role)}/messeges/user-chat`)
    }

    return (
        <div className="messenger__getstarted">
            <div className="messenger__getstarted-body">
                <img src="/Images/chatstarted.png" alt="" />
                <h5 className="messenger__getstarted-title">Get Started</h5>
                <h6 className="messenger__getstarted-subtitle messenger__getstarted-subtitle-1">
                    Tap
                    <button className="messenger__getstarted-button messenger__getstarted-button-1">
                        <IconsNewsfeedPlus />
                    </button>
                    to send a messege.
                </h6>
                <h6 className="messenger__getstarted-subtitle messenger__getstarted-subtitle-2" onClick={toUserChatList}>
                    Tap
                    <button  className="messenger__getstarted-button messenger__getstarted-button-2">
                        <IconNeibs />
                    </button>
                    to find people
                </h6>
            </div>
        </div>
    )
}

