import { useState } from "react"
import { EDUCATION } from "../../../types/enum"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { setLoader, setValueProfileReducer } from "../../../reducer/profile"
import { profileTextInfo } from "../../../services/profile"

const list = Object.values(EDUCATION)

export const ProfileEducation = () => {
    const { _id } = useAppSelector((s) => s.userReducer)
    const initEducation = useAppSelector((s) => s.profileReducer.education)
    const initStudySchool = useAppSelector((s) => s.profileReducer.studySchool)
    const [education, setEducation] = useState<EDUCATION | null>(
        initEducation || null
    )
    const [studySchool, setStudySchool] = useState(initStudySchool || "")

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handlerChangeEducation = async () => {
        try {
            dispatch(setLoader(true))
            const res = await profileTextInfo({
                education,
                studySchool,
                _id,
            })

            dispatch(setValueProfileReducer(res))
            dispatch(setLoader(false))
            navigate("/profile/family-status")
        } catch (error) {
            dispatch(setLoader(false))
            alert(error + "education error")
        }
    }

    return (
        <>
            <div className="profile__method-body">
                <div
                    className="profile__sex-orintation-list"
                    style={{ flexGrow: 0 }}
                >
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
                <div className="profile__sex-orintation">
                    <h5 className="profile__sex-orintation-title">
                        Where did you study?
                    </h5>
                    <div className="profile__sex-orintation-list">
                        <input
                            type="text"
                            value={studySchool}
                            onChange={(e) => setStudySchool(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <button className="profile__method-btlater profile__method-btlater--inherit">
                Setup later
            </button>
            <button
                disabled={!(education && studySchool)}
                className={`profile__method-btlater
            ${
                !(education && studySchool) &&
                "profile__method-btlater--disabled"
            }`}
                onClick={handlerChangeEducation}
            >
                Continue
            </button>
        </>
    )
}
