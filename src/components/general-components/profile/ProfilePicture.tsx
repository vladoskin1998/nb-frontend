import React, { useRef, useState } from "react"
import { IconAdminClose } from "../../svg/IconAdminHeader"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { profileUploadAvatar } from "../../../services/profile"
import { setValueProfileReducer, setLoader } from "../../../reducer/profile"
import { baseURL } from "../../../utils/config"
import { ProfileButtonSetupLater } from "./ProfileButtonSetupLater"

export const ProfilePicture = () => {
    const { _id } = useAppSelector((s) => s.userReducer)
    const {avatarFileName} = useAppSelector(s => s.profileReducer)
    const initAvatar = avatarFileName ? `${baseURL}/uploads/avatar/${avatarFileName}` : ""
    const [avatar, setAvatar] = useState<File | null>(null)
    const [photoUrl, setPhotoUrl] = useState<string>(initAvatar)
    const dispatch = useAppDispatch()
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()

    const takePhoto = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            })
            const videoElement = document.createElement("video")
            videoElement.srcObject = stream
            await videoElement.play()

            const canvas = document.createElement("canvas")
            canvas.width = videoElement.videoWidth
            canvas.height = videoElement.videoHeight
            const ctx = canvas.getContext("2d")
            ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height)

            const photoDataUrl = canvas.toDataURL("image/jpeg")
            setPhotoUrl(photoDataUrl)

            const blob = await (await fetch(photoDataUrl)).blob()

            const photoFile = new File([blob], "photo.jpg", {
                type: "image/jpeg",
            })

            setAvatar(photoFile)

            stream.getTracks().forEach((track) => track.stop())
        } catch (error: any) {
            alert("Camera Roll photo" + error)
        }
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null
        setAvatar(file)
        if (file) {
            const url = URL.createObjectURL(file)
            setPhotoUrl(url)
        }
    }

    const handlerRemoveImage = () => {
        fileInputRef.current = null
        setPhotoUrl("")
        setAvatar(null)
    }

    const uploadToServerAvatar = async () => {
        try {
            const formData = new FormData()
            const payload = { _id }

            formData.append("payload", JSON.stringify(payload))
            if (avatar) {
                formData.append("file", avatar)
            }

            dispatch(setLoader(true))

            const res = await profileUploadAvatar(formData)
            
            dispatch(setValueProfileReducer(res))
            dispatch(setLoader(false))

            navigate("/profile/interest-zone")
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
                        <button
                            className="profile__method-button profile__method-button--nobodrer"
                            onClick={takePhoto}
                        >
                            Camera Roll
                        </button>
                        <label
                            htmlFor="file-avatar-profile"
                            className="profile__method-button profile__method-button--nobodrer profile__method-button-2"
                        >
                            Take now
                        </label>
                        <input
                            id="file-avatar-profile"
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileSelect}
                        />
                        <span className="profile__method-parag">
                            Your profile picture will be public
                        </span>
                    </>
                ) : (
                    <div className="profile__method-avatar">
                        <img src={`${photoUrl}`} alt="" />
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
                ${!avatar && "profile__method-btlater--disabled"}
            `}
                disabled={!avatar}
                onClick={uploadToServerAvatar}
            >
                Continue
            </button>
        </>
    )
}
