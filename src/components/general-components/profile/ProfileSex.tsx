import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ORIENTATION, SEX } from "../../../types/enum"

const list = Object.values(ORIENTATION)

export const ProfileSex = () => {
    const [sex, setSex] = useState<SEX | null>(null)
    const [orientation, setOrientation] = useState<ORIENTATION>(
        ORIENTATION.HETERO
    )

    return (
        <>
            <div className="profile__sex">
                <div className="profile__sex-radio">
                    <div
                        className={`profile__sex-radio-item ${
                            sex === SEX.MALE
                                ? "profile__sex-radio-item--active"
                                : ""
                        }`}
                        onClick={() => setSex(SEX.MALE)}
                    >
                        <img src="/Images/male.png" alt="" />
                        <p>{SEX.MALE}</p>
                    </div>
                    <div
                        className={`profile__sex-radio-item ${
                            sex === SEX.FEMALE
                                ? "profile__sex-radio-item--active"
                                : ""
                        }`}
                        onClick={() => setSex(SEX.FEMALE)}
                    >
                        <img src="/Images/female.png" alt="" />
                        <p>{SEX.FEMALE}</p>
                    </div>
                </div>
                <div className="profile__sex-orintation">
                    <h5 className="profile__sex-orintation-title">
                        Sexual Orientation
                    </h5>
                </div>
            </div>
            <div className="profile__sex-orintation-list">
                {list.map((item) => (
                    <div
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
            <button className="profile__method-btlater profile__method-btlater--inherit">
                {/* <Link to={"/admin"}> */}
                Setup later
                {/* </Link> */}
            </button>
            <button className={`profile__method-btlater`}>
                <Link to={"/profile/study"}>Continue</Link>
            </button>
        </>
    )
}
