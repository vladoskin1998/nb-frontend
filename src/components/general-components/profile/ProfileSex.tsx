import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ORIENTATION, SEX } from "../../../types/enum"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { setLoader, setValueProfileReducer } from "../../../reducer/profile"
import { profileTextInfo } from "../../../services/profile"
import { ProfileButtonSetupLater } from "./ProfileButtonSetupLater"
import { ProfileSexList } from "./ProfileSexList"
import { ProfileSexOrintationList } from "./ProfileSexOrintationList"

const list = Object.values(ORIENTATION)

export const ProfileSex = () => {
    const { _id } = useAppSelector((s) => s.userReducer)
    const initSex = useAppSelector((s) => s.profileReducer.sex)
    const initOrientation = useAppSelector((s) => s.profileReducer.orientation)
    const [sex, setSex] = useState<SEX | null>(initSex)
    const [orientation, setOrientation] = useState<ORIENTATION>(initOrientation)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handlerChangeSexOrientation = async () => {
        try {
            dispatch(setLoader(true))
            const res = await profileTextInfo({
                orientation,
                sex,
                _id,
            })

            dispatch(setValueProfileReducer(res))
            dispatch(setLoader(false))
            navigate("/profile/education")
        } catch (error) {
            dispatch(setLoader(false))
            alert(error + "sex error")
        }
    }

    return (
        <>
            <div className="profile__sex">
                <ProfileSexList setSex={setSex} sex={sex} />
                <div className="profile__sex-orintation">
                    <h5 className="profile__sex-orintation-title">
                        Sexual Orientation
                    </h5>
                </div>
            </div>
            <ProfileSexOrintationList
                orientation={orientation}
                setOrientation={setOrientation}
            />
            <ProfileButtonSetupLater />
            <button
                className={`profile__method-btlater
                ${!(sex && orientation) && "profile__method-btlater--disabled"}
            `}
                disabled={!(sex && orientation)}
                onClick={handlerChangeSexOrientation}
            >
                Continue
            </button>
        </>
    )
}
