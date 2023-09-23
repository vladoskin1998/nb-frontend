import React, { useRef, useState } from "react"
import { StandartTitleSubtitle } from "../../ui/StandartTitleSubtitle"
import { IconAdminClose } from "../../svg/IconAdminHeader"
import { Link } from "react-router-dom"

export const ProfilePicture = () => {
    const [photo, setPhoto] = useState<File | null>(null)
    const [photoUrl, setPhotoUrl] = useState<string>("")

    const fileInputRef = useRef<HTMLInputElement | null>(null)

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

            setPhoto(photoFile)

            stream.getTracks().forEach((track) => track.stop())
        } catch (error) {
            console.error("Ошибка при съемке фотографии:", error)
        }
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null
        setPhoto(file)
        if (file) {
            const url = URL.createObjectURL(file)
            setPhotoUrl(url)
        }
    }

    const handlerRemoveImage = () => {
        fileInputRef.current = null
        setPhotoUrl("")
        setPhoto(null)
    }

    return (
        <>
            <div className="profile__method-body">
                {photo === null ? (
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
            <button className={`profile__method-btlater
                ${!photoUrl && "profile__method-btlater--disabled" }
            `} disabled={!photoUrl}>
                <Link to={'/profile/interest-zone'}>
                    Continue
                </Link>
                
            </button>
        </>
    )
}
