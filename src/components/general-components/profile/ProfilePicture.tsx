import React, { useRef, useState } from "react"
import { IconAdminClose } from "../../svg/IconAdminHeader"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import $api from "../../../http"
import { profileUploadAvatar } from "../../../services/profile"
import { setValueProfileReducer } from "../../../reducer/profile"

export const ProfilePicture = () => {
    const [avatar, setAvatar] = useState<File | null>(null)
    const [photoUrl, setPhotoUrl] = useState<string>("")
    const dispatch = useAppDispatch()
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const { _id } = useAppSelector((s) => s.profileReducer)
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
            alert("Ошибка при съемке фотографии" + error)
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

            const res = await profileUploadAvatar(formData)
            console.log(res);
            
            dispatch(
                  setValueProfileReducer(res)
            )
          
            
            navigate("/profile/interest-zone")
        } catch (error) {
            alert("upload file is faild" + error)
        }
    }

    return (
        <>
            <div className="profile__method-body">
                {avatar === null ? (
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
                        <img src={photoUrl} alt="" />
                        <button
                            className="profile__method-avatar-close"
                            onClick={handlerRemoveImage}
                        >
                            <IconAdminClose />
                        </button>
                    </div>
                )}
            </div>

            <button className="profile__method-btlater profile__method-btlater--inherit">
                Setup later
            </button>
            <button
                className={`profile__method-btlater
                ${!photoUrl && "profile__method-btlater--disabled"}
            `}
                disabled={!photoUrl}
                onClick={uploadToServerAvatar}
            >
                Continue
            </button>
        </>
    )
}
