import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ORIENTATION, SEX } from "../../../types/enum"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { setLoader, setValueProfileReducer } from "../../../reducer/profile"
import { profileTextInfo } from "../../../services/profile"

const list = Object.values(ORIENTATION)

export const ProfileSex = () => {
    const { _id } = useAppSelector((s) => s.userReducer)
    const initSex = useAppSelector((s) => s.profileReducer.sex)
    const initOrientation = useAppSelector((s) => s.profileReducer.orientation)
    const [sex, setSex] = useState<SEX | null>(initSex)
    const [orientation, setOrientation] = useState<ORIENTATION>(
        initOrientation
    )
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
            <button className="profile__method-btlater profile__method-btlater--inherit">
                {/* <Link to={"/admin"}> */}
                Setup later
                {/* </Link> */}
            </button>
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
