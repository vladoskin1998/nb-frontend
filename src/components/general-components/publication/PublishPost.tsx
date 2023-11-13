import React, { useState } from "react"
import { PublicationMainComponent } from "./PublishMainComponent"
import { PublishAddLocation } from "./PublishAddLocation"
import {
    PublishPostHttp,
} from "../../../http/publish-post-http"
import { useAppSelector } from "../../../utils/hooks"
import { success } from "../../ui/LoadSuccess"
import { CoordinatsInterface, PublishPostInterface } from "../../../types/types"
import { PRIVACY } from "../../../types/enum"
import { useNavigate } from "react-router-dom"
import { roleUrl } from "../../../utils/config"

export const PublishPost = ({
    currentPrivacy,
}: {
    currentPrivacy: PRIVACY
}) => {
    const navigate = useNavigate()
    const { _id, role } = useAppSelector((s) => s.userReducer)
    const profile = useAppSelector((s) => s.profileReducer)

    const [addressLocation, setAddressLocation] = useState(
        `${profile.country}, ${profile.city}, ${profile.street}, ${profile.houseNumber}`
    )
    const [files, setFiles] = useState<File[]>([])
    const [text, setText] = useState("")
    const [title, setTitle] = useState("")
    const [coordinates, setCoordinates] = useState<CoordinatsInterface>(
        profile.coordinates
    )

    const validate = !Boolean(text && title && files.length && addressLocation)

    const handlerPublish = async () => {
        try {
            const formCatData = new FormData()
            let payload: {
                text: string
                title: string
                userId: string
                userIdentityId: string
                coordinates: CoordinatsInterface
                privacyPost: PRIVACY
                addressLocation: string
            } = {
                text,
                title,
                coordinates,
                userId: _id,
                userIdentityId: profile.userIdentityId,
                privacyPost: currentPrivacy,
                addressLocation
            }
            formCatData.append("payload", JSON.stringify(payload))

            for (let index = 0; index < files.length; index++) {
                formCatData.append("files", files[index])
            }

            const resPubPost: PublishPostInterface =
                await PublishPostHttp.addPost(formCatData)

            success()
            navigate(`${roleUrl(role)}/posts`)
        } catch (error) {
            alert("publish post new" + error)
        }
    }
    return (
        <div className="user">
            <PublicationMainComponent
                files={files}
                setFiles={setFiles}
                text={text}
                setText={setText}
                title={title}
                setTitle={setTitle}
                placeholderTitle="Title Name"
                placeholderText="what’s in your mind ?"
            />
            <PublishAddLocation
                coordinates={coordinates}
                setCoordinates={setCoordinates}
                addressLocation={addressLocation}
                setAddressLocation={setAddressLocation}
            />
            <button
                className={`publish__publish user--footer--button ${
                    validate && "services__add-button--disabled"
                }`}
                onClick={handlerPublish}
                disabled={validate}
            >
                Publish
            </button>
        </div>
    )
}
