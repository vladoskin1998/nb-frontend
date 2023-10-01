import React from "react"
import { EDUCATION } from "../../../types/enum"

const list = Object.values(EDUCATION)

export const ProfileEducationList = (
    {
        education,
        setEducation,
    }:{
        education: EDUCATION | null,
        setEducation: (s:EDUCATION) => void,
    }
) => {
    return (
        <div className="profile__sex-orintation-list" style={{ flexGrow: 0 }}>
            {list.map((item, index) => (
                <div
                    key={index}
                    className={`profile__sex-orintation-list-item ${
                        item === education
                            ? "profile__sex-orintation-list-item--active"
                            : ""
                    }`}
                    onClick={() => setEducation(item)}
                >
                    {item}
                </div>
            ))}
        </div>
    )
}
