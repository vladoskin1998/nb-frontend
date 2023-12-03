import { useEffect, useState } from "react"
import { PRIVACY } from "../../../types/enum"
import { IconOpenEye, IconClosedEye, IconNeibs } from "../../svg/IconPassEye"
import { Link, useNavigate } from "react-router-dom"
import { ProfileButtonSetupLater } from "./ProfileButtonSetupLater"
import { setValueProfileReducer } from "../../../reducer/profile"
import { setLoader } from "../../../reducer/users"
import { profileTextInfo } from "../../../services/profile"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"

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
    const initPrivacy = useAppSelector((s) => s.profileReducer).privacy
    const [privacy, setPrivacy] = useState({
        value: PRIVACY.EVERYONE,
        label: <IconOpenEye />,
    })

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { _id } = useAppSelector((s) => s.userReducer)

    useEffect(() => {
        const initState = PRIVACY_LIST.find(
            (item) => item.value === initPrivacy
        )
        if (initState) {
            setPrivacy(initState)
        }
    }, [initPrivacy])

    const handlerChangePrivacy = async () => {
        try {
            dispatch(setLoader(true))
            const res = await profileTextInfo({
                lastStepChangeProfile: "/profile/interest-zone",
                privacy: privacy.value,
                _id,
            })

            dispatch(setValueProfileReducer(res))
            dispatch(setLoader(false))
            navigate("/profile/interest-zone")
        } catch (error) {
            dispatch(setLoader(false))
            alert(error + "privacy")
        }
    }

    return (
        <>
            <div className="profile__method-body">
                <h6 className="profile__privacy-title">Who can see my profile</h6>
                <div className="profile__privacy-list">
                    {PRIVACY_LIST.map((item, index) => (
                        <div
                            key={index}
                            className={`profile__privacy-item`}
                            onClick={() => setPrivacy(item)}
                        >
                            <div>Who can see my profile</div>
                            <div className={`profile__privacy-item-icons  ${item.value === privacy.value && "profile__privacy-item--active"}`}>
                                <span>{item.value}</span>
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ProfileButtonSetupLater />
            <button
                className={`profile__method-btlater`}
                onClick={handlerChangePrivacy}
            >
                Continue
            </button>
        </>
    )
}
