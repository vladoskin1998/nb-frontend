import React, { useEffect, useState } from "react"
import { TextareaAutosize } from "@mui/base/TextareaAutosize"
import { useNavigate } from "react-router-dom"
import { profileTextInfo } from "../../../services/profile"
import { setLoader, setValueProfileReducer } from "../../../reducer/profile"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { ProfileButtonSetupLater } from "./ProfileButtonSetupLater"

const maxLength = 250
export const ProfileAbout = () => {
    const initAboutMe = useAppSelector((s) => s.profileReducer).aboutMe
    const [aboutMe, setAboutMe] = useState(initAboutMe)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { _id, role } = useAppSelector((s) => s.userReducer)

    useEffect(() => {
        setAboutMe(initAboutMe)
    }, [initAboutMe])

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value
        if (newText.length <= maxLength) {
            setAboutMe(newText)
        }
    }

    const handlerChangeAboutMe = async () => {
        try {
            dispatch(setLoader(true))
            const res = await profileTextInfo({
                lastStepChangeProfile:"/profile/profession",
                aboutMe,
                _id,
            })

            dispatch(setValueProfileReducer(res))
            dispatch(setLoader(false))
            navigate("/profile/profession")
        } catch (error) {
            dispatch(setLoader(false))
            alert(error + "about text error")
        }
    }

    return (
        <>
            <div className="profile__method-body">
                <div className="profile__about-body">
                    <TextareaAutosize
                        value={aboutMe}
                        onChange={handleChange}
                        className="profile__about-autoresize"
                        minRows={7}
                        placeholder="Be concise, authentic, and feel free to let your personality shine through"
                    />
                    <button className="profile__about-resize">
                        <span>
                            {aboutMe.length}/{maxLength}
                        </span>
                    </button>
                </div>
            </div>
            <ProfileButtonSetupLater />

            <button
                className={`profile__method-btlater
                  ${!aboutMe && "profile__method-btlater--disabled"}`}
                onClick={handlerChangeAboutMe}
                disabled={!aboutMe}
            >
                Continue
            </button>
        </>
    )
}
