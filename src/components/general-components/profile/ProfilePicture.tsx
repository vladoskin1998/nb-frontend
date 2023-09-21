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
            <StandartTitleSubtitle
                title={"Profile Picture"}
                subTitle={
                    "Please upload a profile picture that allows other users to recognize you"
                }
            />
            <div className="pofile__method-body">
                {photo === null ? (
                    <>
                        <button
                            className="pofile__method-button pofile__method-button--nobodrer"
                            onClick={takePhoto}
                        >
                            Camera Roll
                        </button>
                        <label
                            htmlFor="file-avatar-profile"
                            className="pofile__method-button pofile__method-button--nobodrer pofile__method-button-2"
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
                        <span className="pofile__method-parag">
                            Your profile picture will be public
                        </span>
                    </>
                ) : (
                    <div className="pofile__method-avatar">
                        <img src={photoUrl} alt="" />
                        <button
                            className="pofile__method-avatar-close"
                            onClick={handlerRemoveImage}
                        >
                            <IconAdminClose />
                        </button>
                    </div>
                )}
            </div>

            <button className="pofile__method-btlater pofile__method-btlater--inherit">
                Setup later
            </button>
            <button className={`pofile__method-btlater
                ${!photoUrl && "pofile__method-btlater--disabled" }
            `} disabled={!photoUrl}>
                <Link to={'/profile/interest-zone'}>
                    Continue
                </Link>
                
            </button>
        </>
    )
}
