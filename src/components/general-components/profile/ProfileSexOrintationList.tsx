import React from "react"
import { ORIENTATION } from "../../../types/enum"
const list = Object.values(ORIENTATION)

export const ProfileSexOrintationList = (
    {
        orientation,
        setOrientation,
    }:{
        orientation:ORIENTATION,
        setOrientation:(s:ORIENTATION) => void,
    }
) => {
    return (
        <div className="profile__sex-orintation-list">
            {list.map((item, index) => (
                <div
                    key={index}
                    className={`profile__sex-orintation-list-item ${
                        item === orientation
                            ? "profile__sex-orintation-list-item--active"
                            : ""
                    }`}
                    onClick={() => setOrientation(item)}
                >
                    {item}
                </div>
            ))}
        </div>
    )
}
