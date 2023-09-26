import { useState } from "react"
import { FAMILYSTATUS } from "../../../types/enum"
import { IconProfileCircle } from "../../svg/IconProfile"
import { Link } from "react-router-dom"

const list = Object.values(FAMILYSTATUS)

export const ProfileFamilyStatus = () => {
    const [familyStatus, setFamilyStatus] = useState<FAMILYSTATUS | null>(null)

    return (
        <>
            <div className="profile__method-body">
                <div className="profile__family">
                    {list.map((item) => (
                        <div
                            className={`profile__family_item
                        ${
                            item === familyStatus
                                ? "profile__family_item--active"
                                : ""
                        }
                        `}
                            onClick={() => setFamilyStatus(item)}
                        >
                            <IconProfileCircle />
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
            <button className="profile__method-btlater profile__method-btlater--inherit">
                Setup later
            </button>
            <button className={`profile__method-btlater`}>
                <Link to={"/profile/stay-touch"}>Continue</Link>
            </button>
        </>
    )
}
