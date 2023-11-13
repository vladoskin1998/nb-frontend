import React from "react"
import { SEX } from "../../../types/enum"

export const ProfileSexList = ({
    sex,
    setSex,
}: {
    sex: SEX | null
    setSex: (s: SEX) => void
}) => {
    return (
        <div className="profile__sex-radio">
            <div
                className={`profile__sex-radio-item ${
                    sex === SEX.MALE ? "profile__sex-radio-item--active" : ""
                }`}
                onClick={() => setSex(SEX.MALE)}
            >
                <div className="profile__sex-radio-item-body">
                    <img src="/Images/male.png" alt="" />
                    <p>{SEX.MALE}</p>
                </div>
            </div>
            <div
                className={`profile__sex-radio-item ${
                    sex === SEX.FEMALE ? "profile__sex-radio-item--active" : ""
                }`}
                onClick={() => setSex(SEX.FEMALE)}
            >
                <div className="profile__sex-radio-item-body">
                    <img src="/Images/female.png" alt="" />
                    <p>{SEX.FEMALE}</p>
                </div>
            </div>
        </div>
    )
}
