import React, { useState } from "react"
import { TextareaAutosize } from "@mui/base/TextareaAutosize"
import { Link, useNavigate } from "react-router-dom"
import { profileTextInfo } from "../../../services/profile"
import { setLoader, setValueProfileReducer } from "../../../reducer/profile"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"

const maxLength = 250
export const ProfileAbout = () => {
    const initAboutMe = useAppSelector((s) => s.profileReducer).aboutMe
    const [aboutMe, setAboutMe] = useState(initAboutMe)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { _id } = useAppSelector((s) => s.userReducer)

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
                        minRows={3}
                        placeholder="Be concise, authentic, and feel free to let your personality shine through"
                    />
                    <button className="profile__about-resize">
                        <span>
                            {aboutMe.length}/{maxLength}
                        </span>
                        {/* <IconProfileTextareaCorner/> */}
                    </button>
                </div>
            </div>
            <button className="profile__method-btlater profile__method-btlater--inherit">
                {/* <Link to={"/admin"}> */}
                Setup later
                {/* </Link> */}
            </button>
            <button
                className={`profile__method-btlater`}
                onClick={handlerChangeAboutMe}
            >
                Continue
            </button>
        </>
    )
}
