import React from "react"
import { IosTougle } from "../../ui/IosTougle"

export const ProfileInfoNotification = () => {
    return (
        <div className="profileinfo__skillsinterets">
            <h5
                className="profileinfo__edit-title "
                style={{ marginTop: "20px" }}
            >
                General
            </h5>
            <div className="profileinfo__notification-list">
                <div className="profileinfo__notification-item">
                    <span>Who can see my profile</span>
                    <IosTougle isTougle={true} setIsTougle={() => {}} />
                </div>
                <div className="profileinfo__notification-item">
                    <span>Who can see my profile</span>
                    <IosTougle isTougle={true} setIsTougle={() => {}} />
                </div>

                <div className="profileinfo__notification-item">
                    <span>Who can see my profile</span>
                    <IosTougle isTougle={true} setIsTougle={() => {}} />
                </div>

                <div className="profileinfo__notification-item">
                    <span>Who can see my profile</span>
                    <IosTougle isTougle={true} setIsTougle={() => {}} />
                </div>

                <h5
                    className="profileinfo__edit-title "
                    style={{ marginTop: "20px" }}
                >
                    Discovery
                </h5>
                <div className="profileinfo__notification-item">
                    <span>Who can see my profile</span>
                    <IosTougle isTougle={true} setIsTougle={() => {}} />
                </div>

                <div className="profileinfo__notification-item">
                    <span>Who can see my profile</span>
                    <IosTougle isTougle={true} setIsTougle={() => {}} />
                </div>

                <div className="profileinfo__notification-item">
                    <span>Who can see my profile</span>
                    <IosTougle isTougle={true} setIsTougle={() => {}} />
                </div>

                <div className="profileinfo__notification-item">
                    <span>Who can see my profile</span>
                    <IosTougle isTougle={true} setIsTougle={() => {}} />
                </div>
            </div>
            <button className={`profile__method-btlater `}>
                Update Notifications
            </button>
        </div>
    )
}
