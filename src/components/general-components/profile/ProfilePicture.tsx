import React, { useEffect, useRef, useState } from "react"
import { IconAdminClose } from "../../svg/IconAdminHeader"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { profileTextInfo,  } from "../../../services/profile"
import { setValueProfileReducer, setLoader } from "../../../reducer/profile"
import { baseURL } from "../../../utils/config"
import { ProfileButtonSetupLater } from "./ProfileButtonSetupLater"
import { PHOTO_ADD_METHOD } from "../../../types/enum"
import { profileUploadAvatar } from "../../../services/user"
import { setValueUserReducer } from "../../../reducer/users"

export const ProfilePicture = () => {
    const { _id, avatarFileName } = useAppSelector((s) => s.userReducer)
 
    const initAvatar = avatarFileName
        ? `${baseURL}/uploads/avatar/${avatarFileName}`
        : ""
    const [avatar, setAvatar] = useState<File | null>(null)
    const [photoUrl, setPhotoUrl] = useState<string>(initAvatar)
    const dispatch = useAppDispatch()

    let fileCameraRollRef = useRef<HTMLInputElement | null>(null)
    let fileTakeNowlRef = useRef<HTMLInputElement | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        setPhotoUrl(initAvatar)
    }, [avatarFileName])

   

    console.log(photoUrl)

    const handleFileSelect = (method: PHOTO_ADD_METHOD) => {
        let fileInput =
            PHOTO_ADD_METHOD.TAKE_NOW === method
                ? fileTakeNowlRef?.current
                : fileCameraRollRef?.current

        if (fileInput && fileInput?.files && fileInput.files[0]) {
            const file = fileInput?.files[0]
            setAvatar(file)
            const url = URL.createObjectURL(file)
            setPhotoUrl(url)
        }
    }

    const handlerRemoveImage = () => {
        if (fileTakeNowlRef.current) {
            fileTakeNowlRef.current.value = ""
        }

        if (fileCameraRollRef.current) {
            fileCameraRollRef.current.value = ""
        }
        setPhotoUrl("")
        setAvatar(null)
    }

    const uploadToServerAvatar = async () => {
        try {
            if (avatar) {
                const formData = new FormData()
                const payload = { _id }

                formData.append("payload", JSON.stringify(payload))
                if (avatar) {
                    formData.append("file", avatar)
                }

                dispatch(setLoader(true))

                const res = await profileUploadAvatar(formData)

                const reslastStepChangeProfile = await profileTextInfo({
                    lastStepChangeProfile:"/profile/privacy",
                    _id,
                })
    

                dispatch(setValueUserReducer({...res,...reslastStepChangeProfile}))
                dispatch(setLoader(false))
            }

            navigate("/profile/privacy")

            
        } catch (error) {
            dispatch(setLoader(false))
            alert("upload file is faild" + error)
        }
    }

    return (
        <>
            <div className="profile__method-body">
                {!photoUrl ? (
                    <>
                        <label
                            htmlFor="avatar-take-file"
                            className="profile__method-button profile__method-button--nobodrer "
                        >
                            Take now
                        </label>
                        <input
                            id="avatar-take-file"
                            type="file"
                            ref={fileTakeNowlRef}
                            style={{ display: "none" }}
                            onChange={() =>
                                handleFileSelect(PHOTO_ADD_METHOD.TAKE_NOW)
                            }
                            accept={"image/*"}
                            capture="user"
                        />
                        <label
                            htmlFor="avatar-camera-roll"
                            className="profile__method-button profile__method-button--nobodrer profile__method-button--nobodrer profile__method-button-2"
                            // onClick={takePhoto}
                        >
                            Camera Roll
                        </label>
                        <input
                            id="avatar-camera-roll"
                            type="file"
                            ref={fileCameraRollRef}
                            style={{ display: "none" }}
                            onChange={() =>
                                handleFileSelect(PHOTO_ADD_METHOD.CAMERA_ROLL)
                            }
                        />
                        <span className="profile__method-parag">
                            Your profile picture will be public
                        </span>
                    </>
                ) : (
                    <div className="profile__method-avatar">
                        <div className="profile__method-avatar-img">
                            <img src={`${photoUrl}`} alt="" />
                        </div>

                        <button
                            className="profile__method-avatar-close"
                            onClick={handlerRemoveImage}
                        >
                            <IconAdminClose />
                        </button>
                    </div>
                )}
            </div>

            <ProfileButtonSetupLater />
            <button
                className={`profile__method-btlater
                ${!(avatar || photoUrl) && "profile__method-btlater--disabled"}
            `}
                disabled={!(avatar || photoUrl)}
                onClick={uploadToServerAvatar}
            >
                Continue
            </button>
        </>
    )
}
