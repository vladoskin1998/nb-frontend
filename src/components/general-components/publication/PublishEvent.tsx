import React, { useState } from "react"
import { PublicationMainComponent } from "./PublishMainComponent"
import { PublishAddLocation } from "./PublishAddLocation"
import { useAppSelector } from "../../../utils/hooks"
import { success } from "../../ui/LoadSuccess"
import { Activities, CoordinatsInterface } from "../../../types/types"
import { PRIVACY } from "../../../types/enum"
import { PublishEventList } from "./PublishEventList"
import UiDateTimePicker from "../../ui/UiDataTimePicker"
import { IconTicket } from "../../svg/IconTicket"
import dayjs from "dayjs"
import { ActivitiesHttp } from "../../../http/activities-http"

export const PublishEvent = ({
    currentPrivacy,
}: {
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
    const [startDate, setStartDate] = useState<dayjs.Dayjs>(dayjs(new Date()))
    const [activitiesId, setActivitiesId] = useState<string>("")
    const [addressLocation, setAddressLocation] = useState(
        `${profile.country}, ${profile.city}, ${profile.street}, ${profile.houseNumber}`)
    const validate = !Boolean(text && title && files.length && activitiesId)

    

    const handlerPublish = async () => {
        try {
            const formCatData = new FormData()
            let payload: {
                text: string
                title: string
                userId: string
                coordinates: CoordinatsInterface
                privacyEvent: PRIVACY
                startDate: Date
                activitiesId: string
                userIdentityId: string
                addressLocation:string
            } = {
                text,
                title,
                coordinates,
                userId: _id,
                privacyEvent: currentPrivacy,
                startDate: new Date(startDate?.toDate()),
                activitiesId,
                userIdentityId: profile.userIdentityId,
                addressLocation
            }
            formCatData.append("payload", JSON.stringify(payload))

            for (let index = 0; index < files.length; index++) {
                formCatData.append("files", files[index])
            }

            const resPubPost: Activities =
                await ActivitiesHttp.addPublishActivitie(formCatData)

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
                placeholderTitle="Activity Name"
                placeholderText="describe your activity"
            />
            <PublishAddLocation
                coordinates={coordinates}
                setCoordinates={setCoordinates}
                addressLocation={addressLocation}
                setAddressLocation={setAddressLocation}
            />
            <PublishEventList
                activitiesId={activitiesId}
                setActivitiesId={setActivitiesId}
            />
            <div className="publish__activities-picker">
                <UiDateTimePicker
                    startDate={startDate}
                    setStartDate={setStartDate}
                />
            </div>
            <div className="publish__activities-ticket">
                <IconTicket />
                Tickets
            </div>
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
