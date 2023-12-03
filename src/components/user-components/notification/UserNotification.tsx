import React from "react"
import { UserNotificationList } from "./UserNotificationList"
import { UserNotificationMarkList } from "./UserNotificationMarkList"
import { Routes, Route } from "react-router-dom"
import { UserHeaderNotification } from "../header/UserHeaderNotification"

export const UserNotification = () => {
    return (
      <div className="user user--body">
      <UserHeaderNotification />
        <Routes>
         
            <Route path="notification-mark" element={<UserNotificationMarkList />} />
            <Route path="notification-list" element={<UserNotificationList />} />
            <Route path="*" element={<UserNotificationList />} />
        </Routes>
        </div>
    )
}
