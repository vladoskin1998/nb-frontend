import React, { useEffect, useState } from "react"
import { UserHeaderChat } from "../header/UserHeaderChat"
import {
    NotificationHttp,
    NotificationListInterface,
} from "../../../http/notification-http"
import { useAppSelector } from "../../../utils/hooks"
import { baseURL } from "../../../utils/config"
import { notificationDirname } from "../../../utils/titles"

export const UserNotificationList = () => {
    const [notificationList, setNotificationList] = useState<
        NotificationListInterface[]
    >([])
    const { _id } = useAppSelector((s) => s.userReducer)
    useEffect(() => {
        NotificationHttp.getNotificationList({ userId: _id }).then((s) =>
            setNotificationList(s)
        )
    }, [])

    return (
        <div className="admin">
            <UserHeaderChat />
            <div className="notification__list">
                {notificationList.map((item) => (
                    <div className="notification__list-item">
                        <div className="notification__alert-img">
                            <img
                                src={`${baseURL}/uploads/${notificationDirname(item.event)}/${item.fileName}`}
                                alt=""
                            />
                        </div>
                        <div>
                            <h5 className="notification__alert-text">
                                {item.name}
                            </h5>
                            <h6 className="notification__alert-text">
                                {item.title}
                            </h6>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
