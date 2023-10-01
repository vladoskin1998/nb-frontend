import { useState } from "react"
import { PRIVACY } from "../../../types/enum"
import { IconOpenEye, IconClosedEye, IconNeibs } from "../../svg/IconPassEye"
import { Link } from "react-router-dom"
import { ProfileButtonSetupLater } from "./ProfileButtonSetupLater"

const PRIVACY_LIST = [
    {
        value: PRIVACY.EVERYONE,
        label: <IconOpenEye />,
    },
    {
        value: PRIVACY.ONLYME,
        label: <IconClosedEye />,
    },
    {
        value: PRIVACY.NEIBS,
        label: <IconNeibs />,
    },
]

export const ProfilePrivacy = () => {
    const [privacy, setPrivacy] = useState({
        value: PRIVACY.EVERYONE,
        label: <IconOpenEye />,
    })
    return (
        <>
            <div className="profile__method-body">
                <h6 className="profile__privacy-title">Category Name</h6>
                <div className="profile__privacy-list">
                    {PRIVACY_LIST.map((item, index) => (
                        <div
                            key={index}
                            className="profile__privacy-item"
                            onClick={() => setPrivacy(item)}
                        >
                            <div>Who can see my profile</div>
                            <div className="profile__privacy-item-icons">
                                <span>{item.value}</span>
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="profile__privacy-curren">
                    <h6 className="profile__privacy-title">Category Name</h6>
                    <div className="profile__privacy-item">
                        <div>Who can see my profile</div>
                        <div className="profile__privacy-item-icons">
                            <span>{privacy.value}</span>
                            {privacy.label}
                        </div>
                    </div>
                </div>
            </div>

            <ProfileButtonSetupLater />
            <button className={`profile__method-btlater`}>
                <Link to={"/profile/about"}>Continue</Link>
            </button>
        </>
    )
}
