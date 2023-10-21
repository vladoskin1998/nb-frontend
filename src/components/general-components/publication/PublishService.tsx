import { useState } from "react"
import { PublicationMainComponent } from "./PublishMainComponent"
import { PublishAddLocation } from "./PublishAddLocation"
import { useAppSelector } from "../../../utils/hooks"
import { success } from "../../ui/LoadSuccess"
import { CoordinatsInterface, OptionsType } from "../../../types/types"
import { PRIVACY } from "../../../types/enum"
import { Categories } from "../../../services/categories"
import { ServiceHttp } from "../../../http/service-http"
import { PublishServiceCategorie } from "./PublishServiceCategorie"

export const PublishService = ({
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
    const [servicesValue, setServicesValue] = useState<OptionsType>([])
    const [subServicesValue, setSubServicesValue] = useState<OptionsType>([])
    const [addressLocation, setAddressLocation] = useState("")
    const validate = !Boolean(
        text && title && files.length && servicesValue?.[0]._id
    )

    const handlerPublish = async () => {
        try {
            const formCatData = new FormData()
            let payload: {
                text: string
                title: string
                userId: string
                coordinates: CoordinatsInterface
                privacyPost: PRIVACY
                servicesId: string
                subServicesId: string
            } = {
                text,
                title,
                coordinates,
                userId: _id,
                privacyPost: currentPrivacy,
                servicesId: "",
                subServicesId: "",
            }
            formCatData.append("payload", JSON.stringify(payload))

            for (let index = 0; index < files.length; index++) {
                formCatData.append("files", files[index])
            }

            const res: Categories = await ServiceHttp.addPublishService(
                formCatData
            )

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
                placeholderTitle="Service Name"
                placeholderText="describe your service ?"
            />
            <div className="publish__service-categorie">
                <PublishServiceCategorie
                    servicesValue={servicesValue}
                    setServicesValue={setServicesValue}
                    subServicesValue={subServicesValue}
                    setSubServicesValue={setSubServicesValue}
                />
            </div>
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
