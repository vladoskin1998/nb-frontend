import React, { useState } from "react"
import { PublicationMainComponent } from "./PublishMainComponent"
import { PublishAddLocation } from "./PublishAddLocation"
import {
    PublishPostHttp,
    PublishPostInterface,
} from "../../../http/publish-post-http"
import { useAppSelector } from "../../../utils/hooks"
import { success } from "../../ui/LoadSuccess"
import { CoordinatsInterface } from "../../../types/types"
import { PRIVACY } from "../../../types/enum"

export const PublishPost = ({
    currentPrivacy
}:{
    currentPrivacy: PRIVACY
}) => {
    const { _id } = useAppSelector((s) => s.userReducer)
    const profile = useAppSelector((s) => s.profileReducer)

    const [files, setFiles] = useState<File[]>([])
    const [text, setText] = useState("")
    const [title, setTitle] = useState("")
    const [coordinates, setCoordinates] = useState<CoordinatsInterface>(
        profile.coordinates
    )

    const validate = !Boolean(text && title && files.length)

    const handlerPublish = async () => {
        try {
            const formCatData = new FormData()
            let payload: {
                text: string
                title: string
                userId: string
                coordinates: CoordinatsInterface
                privacyPost: PRIVACY
            } = {
                text,
                title,
                coordinates,
                userId: _id,
                privacyPost: currentPrivacy
            }
            formCatData.append("payload", JSON.stringify(payload))

            for (let index = 0; index < files.length; index++) {
                formCatData.append("files", files[index])
            }

            const resPubPost: PublishPostInterface =
                await PublishPostHttp.addPost(formCatData)

            success()
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
            />
            <PublishAddLocation
                coordinates={coordinates}
                setCoordinates={setCoordinates}
            />
            <button
                className={`publish__publish ${
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
