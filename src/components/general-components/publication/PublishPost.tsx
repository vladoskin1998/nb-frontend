import React, { useState } from "react"
import { PublicationMainComponent } from "./PublishMainComponent"
import { PublishAddLocation } from "./PublishAddLocation"
import { PublishPostHttp } from "../../../http/publish-post-http"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { success } from "../../ui/LoadSuccess"
import { CoordinatsInterface, PublishPostInterface } from "../../../types/types"
import { PRIVACY } from "../../../types/enum"
import { useLocation, useNavigate } from "react-router-dom"
import { baseURL, roleUrl } from "../../../utils/config"
import { profileTextInfo } from "../../../services/profile"
import { setValueProfileReducer } from "../../../reducer/profile"

export const PublishPost = ({
    currentPrivacy,
}: {
    currentPrivacy: PRIVACY
}) => {

    const location = useLocation();

    const props: {
        postId: string,
        files: string[],
        text: string,
        title:string,
        coordinates: CoordinatsInterface,
    } = location.state;

    const navigate = useNavigate()
    const { _id, role } = useAppSelector((s) => s.userReducer)
    const profile = useAppSelector((s) => s.profileReducer)
    const dispatch = useAppDispatch()

    const [addressLocation, setAddressLocation] = useState(
        `${profile.country}, ${profile.city}, ${profile.street}, ${profile.houseNumber}`
    )
    const [files, setFiles] = useState<(File | string)[]>(props?.files?.map(item => `${baseURL}/uploads/publish_post/${item}`) || [])
    const [text, setText] = useState(props?.text || '')
    const [title, setTitle] = useState(props?.title || '')
    const [coordinates, setCoordinates] = useState<CoordinatsInterface>(
        props?.coordinates || profile.coordinates
    )
    console.log(files);
    const validate = !Boolean(text && title && files.length && addressLocation)

    const handlerPublish = async () => {
        try {
            const formCatData = new FormData()

            const remainedFiles = (files.filter(item => typeof item === 'string') as string[]).map(item => item.replace(`${baseURL}/uploads/publish_post/`, ''))
            const deletedFiles = props?.files.filter(item => remainedFiles.includes(item)) || []

            let payload: {
                text: string
                title: string
                userId: string
                userIdentityId: string
                coordinates: CoordinatsInterface
                privacyPost: PRIVACY
                addressLocation: string
                deletedFiles?: string[]
                postId?: string
            } = {
                text,
                title,
                coordinates,
                userId: _id,
                userIdentityId: profile.userIdentityId,
                privacyPost: currentPrivacy,
                addressLocation,
                deletedFiles,
                postId: props?.postId || ''
            }

         
            

            formCatData.append("payload", JSON.stringify(payload))

            for (let index = 0; index < files.length; index++) {
                formCatData.append("files", files[index])
            }

            const resPubPost: PublishPostInterface =
                await PublishPostHttp.addPost(formCatData)

            if (!profile.isAddedPost) {
                const res = await profileTextInfo({
                    isAddedPost: true,
                    _id,
                })
                dispatch(setValueProfileReducer(res))
            }

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
