import { useNavigate } from "react-router-dom"
import { IconProfileInfoNotification } from "../../svg/IconProfileInfo"
import {
    IconsNewsfeedMessenger,
    IconsNewsfeedPlus,
} from "../../svg/IconsNewsfeed"
import { UserHeader } from "./UserHeader"
import { useState } from "react"
import { IconNeibs } from "../../svg/IconPassEye"
import { IconLeftChevrons } from "../../svg/IconChevrons"
import { roleUrl } from "../../../utils/config"
import { useAppSelector } from "../../../utils/hooks"

export const UserHeaderChat = () => {
    const { role } = useAppSelector((s) => s.userReducer)

    const navigate = useNavigate()
    const [openPublish, setOpenPublish] = useState(false)

    const toFriendUserChatList = () => {
        navigate(`${roleUrl(role)}/messeges/friend-user-chat`)
    }

    const toAllUserChatList = () => {
        navigate(`${roleUrl(role)}/messeges/all-user-chat`)
    }
    return (
        <UserHeader>
            <div className="user__header-main">
                <h5 className="user__header-title">NeighborHarbor</h5>
                <div className="user__header-main-buttons">
                    <button
                        className="user__header-main-button"
                        onClick={toFriendUserChatList}
                        
                    >
                        <IconNeibs />
                    </button>
                    <button
                        className="user__header-main-button"
                        onClick={toAllUserChatList}
                    >
                        <IconsNewsfeedPlus />
                    </button>
                </div>
            </div>
        </UserHeader>
    )
}

export const UserHeaderUserChatList = ({
    headerTitle,
}: {
    headerTitle: string
}) => {
    const navigate = useNavigate()

    return (
        <UserHeader>
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="user__header-chatuser"
                >
                    <IconLeftChevrons />
                    <h5 className="user__header-title">{headerTitle}</h5>
                </button>
            </div>
        </UserHeader>
    )
}
