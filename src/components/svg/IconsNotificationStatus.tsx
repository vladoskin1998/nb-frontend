import React from "react"
import { IconPickerSmoll } from "./IconFavor"
import { IconsNewsfeedPlus } from "./IconsNewsfeed"

export const IconsNotificationStatusPen = () => {
    return (
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
            >
                <path
                    d="M3.77379 12.0774H4.51395C4.68345 12.0774 4.75126 12.0435 4.87556 11.9474L5.25412 11.6593C5.46317 11.8683 5.77393 11.9135 6.08468 11.7779L7.95487 10.9982C8.09612 10.9417 8.16957 10.8852 8.25997 10.7948L13.718 5.37634C14.2604 4.83393 14.2604 4.18417 13.7123 3.63046L12.4863 2.39873C11.9382 1.85067 11.2884 1.84502 10.746 2.38743L5.28802 7.80024C5.19196 7.89629 5.14111 7.96409 5.07896 8.111L4.28795 9.97553C4.15799 10.275 4.19189 10.5688 4.40095 10.8004L3.58733 11.6423C3.41218 11.8288 3.49693 12.0774 3.77379 12.0774ZM11.3732 3.13325C11.5201 2.99199 11.6952 2.98634 11.8308 3.1276L12.9835 4.28587C13.1247 4.42712 13.1191 4.59663 12.9665 4.74353L12.5993 5.11079L11.0003 3.50615L11.3732 3.13325ZM6.28809 8.1901L10.3901 4.11637L11.9834 5.721L7.88707 9.79473L6.28809 8.1901ZM5.97168 10.7778C5.86433 10.8174 5.79088 10.8174 5.69482 10.7213L5.33887 10.371C5.24847 10.2806 5.24847 10.1959 5.28802 10.0998L5.79653 8.91896L7.15255 10.2863L5.97168 10.7778ZM3.58168 14.0832H14.4242C14.6955 14.0832 14.9158 13.8515 14.9158 13.5803C14.9158 13.3091 14.6955 13.0831 14.4242 13.0831H3.58168C3.30483 13.0831 3.08447 13.3091 3.08447 13.5803C3.08447 13.8515 3.31048 14.0832 3.58168 14.0832Z"
                    fill="#F7F8FA"
                />
            </svg>
        </div>
    )
}

export const IconsNotificationStatusEvent = () => {
    return (
        <div className="notification-status-item notification-status-1">
            <IconPickerSmoll />
        </div>
    )
}

export const IconsNotificationStatusServices = () => {
    return (
        <div className="notification-status-item notification-status-2">
            < IconsNewsfeedPlus/>
        </div>
    )
}

export const IconsNotificationStatusPost = () => {
    return (
        <div className="notification-status-item notification-status-3">
            <IconsNotificationStatusPen />
        </div>
    )
}

export const IconsNotificationStatusMessage = () => {
    return (
        <div className="notification-status-item notification-status-4">
            <IconsNotificationStatusPen />
        </div>
    )
}
