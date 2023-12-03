import { useNavigate } from "react-router-dom"
import { IconProfileInfoNotification } from "../../svg/IconProfileInfo"
import {
    IconsNewsfeedMessenger,
    IconsNewsfeedPlus,
} from "../../svg/IconsNewsfeed"
import { UserHeader } from "./UserHeader"
import { useState } from "react"
import { PublishModalRoute } from "../../general-components/publication/PublishModalRoute"
import { useAppDispatch } from "../../../utils/hooks"
import { logout } from "../../../services/auth"

export const UserHeaderMain = (props:{
    // notification:()=>void
    // messenger:()=>void
    // publish:()=>void
}) => {

    const navigate = useNavigate()
    const [isOpenPublish, setIsOpenPublish] = useState(false)
    const dispatch = useAppDispatch()

    const messenger = () => {
        navigate('/user/messeges')
    }
    const  publish = () => {
        setIsOpenPublish(true)
    }

    const notification = () => {
        navigate('/user/notification')
    }

  
    return (
        <UserHeader>
            <div className="user__header-main">
                <h5 className="user__header-title"
                onClick={() => dispatch(logout())}>NeighborHarbor</h5>
                <div className="user__header-main-buttons">
                    <button className="user__header-main-button"
                        onClick={notification}
                    >
                        <IconProfileInfoNotification />
                    </button>
                    <button className="user__header-main-button"
                           onClick={messenger}
                    >
                        <IconsNewsfeedMessenger />
                    </button>
                    <button className="user__header-main-button"
                         onClick={publish}
                    >
                        <IconsNewsfeedPlus />
                    </button>{
                        isOpenPublish &&
                        <PublishModalRoute setIsOpen={setIsOpenPublish}/>
                    }  
                </div>
            </div>
        </UserHeader>
    )
}
