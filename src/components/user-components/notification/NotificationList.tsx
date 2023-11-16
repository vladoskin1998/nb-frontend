import React, { useEffect, useState } from "react"
import {
    NotificationHttp,
    NotificationListInterface,
} from "../../../http/notification-http"
import { useAppSelector } from "../../../utils/hooks"
import { baseURL } from "../../../utils/config"
import {
    notificationDirname,
    notificationTypeTitle,
} from "../../../utils/titles"
import { UserHeaderNotification } from "../header/UserHeaderNotification"
import moment from "moment"
import { IconArrowRight } from "../../svg/IconArrow"
import { useNavigate } from "react-router-dom"
import { NOTIFICATION_EVENT } from "../../../types/enum"

export const UserNotificationList = () => {
    const navigate = useNavigate()
    const [notificationList, setNotificationList] = useState<
        NotificationListInterface[]
    >([])
    const { _id } = useAppSelector((s) => s.userReducer)
    useEffect(() => {
        NotificationHttp.getNotificationList({ userId: _id }).then((s) =>
            setNotificationList(s)
        )
    }, [])

    const navigateTo = (key:NOTIFICATION_EVENT) => {
        navigate(`/user/${notificationTypeTitle(key).link}`)
    }
    return (
        <div className="admin">
            <UserHeaderNotification />
            <div className="notification__list">
                {notificationList.map((item, index) => (
                    <>
                        {!index && (
                            <div className="notification__list-date">
                                {notificationList[0].dateNotificationCreated ===
                                new Date()
                                    ? "Today"
                                    : moment(
                                          item?.dateNotificationCreated
                                      ).format("DD MMM YYYY HH:mm")}
                            </div>
                        )}

                        { moment(item?.dateNotificationCreated).format("DD MMM YYYY") !==
                            moment(notificationList[index - 1]?.dateNotificationCreated)
                                .format("DD MMM YYYY")  && index ? (
                            <div className="notification__list-date">
                                {item?.dateNotificationCreated === new Date()
                                    ? "Today"
                                    : moment(
                                          item?.dateNotificationCreated
                                      ).format("DD MMM YYYY HH:mm")}
                            </div>
                        ) : (
                            <></>
                        )}

                        <div className="notification__list-item">
                            <div className="notification__list-item-img">
                                <img
                                    src={`${baseURL}/uploads/avatar/${item.ownerIdentityId.avatarFileName}`}
                                    alt=""
                                />
                                <div className="notification__list-item-img-status">
                                    {notificationTypeTitle(item.event).label()}
                                </div>
                            </div>
                            <div className="notification__list-item-bodyline" >
                                <div className="notification__list-item-text">
                                    <b>{item.ownerId.fullName}</b>{" "}
                                    <span>
                                        {notificationTypeTitle(item.event).text}
                                    </span>{" "}
                                    <b>{item.name}</b>
                                </div>
                                <div className="notification__list-item-time">
                 
                                    {moment(item.dateNotificationCreated).format('h:mm A')}
                                </div>
                            </div>
                            <div className="notification__list-item-arrow" onClick={() => navigateTo(item.event)}>
                                <IconArrowRight/>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}
