import { useState } from "react"
import { FAMILYSTATUS } from "../../../types/enum"
import { IconProfileCircle } from "../../svg/IconProfile"
import {  useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { setLoader, setValueProfileReducer } from "../../../reducer/profile"
import { profileTextInfo } from "../../../services/profile"
import { ProfileButtonSetupLater } from "./ProfileButtonSetupLater"

const list = Object.values(FAMILYSTATUS)

export const ProfileFamilyStatus = () => {
    const { _id } = useAppSelector((s) => s.userReducer)
    const initFamilyStatus = useAppSelector((s) => s.profileReducer.familyStatus)
    const [familyStatus, setFamilyStatus] = useState<FAMILYSTATUS | null>(initFamilyStatus)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handlerChangeFamilyStatus = async () => {
        try {
            dispatch(setLoader(true))
            const res = await profileTextInfo({
                familyStatus,
                _id,
            })

            dispatch(setValueProfileReducer(res))
            dispatch(setLoader(false))
            navigate("/profile/stay-touch")
        } catch (error) {
            dispatch(setLoader(false))
            alert(error + "familyStatus text error")
        }
    }
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
            <ProfileButtonSetupLater />
            <button
                className={`profile__method-btlater`}
                onClick={handlerChangeFamilyStatus}
            >
                Continue
            </button>
        </>
    )
}
