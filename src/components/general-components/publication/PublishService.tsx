import { useEffect, useState } from "react"
import { PublicationMainComponent } from "./PublishMainComponent"
import { PublishAddLocation } from "./PublishAddLocation"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { success } from "../../ui/LoadSuccess"
import { CoordinatsInterface, LocationType, OptionsType } from "../../../types/types"
import { PRIVACY } from "../../../types/enum"
import { ServiceHttp } from "../../../http/service-http"
import { PublishServiceCategorie } from "./PublishServiceCategorie"
import { useNavigate } from "react-router-dom"
import { profileTextInfo } from "../../../services/profile"
import { setValueProfileReducer } from "../../../reducer/profile"
import { PublishFindZone } from "./PublishFindZone"

export const PublishService = ({
    currentPrivacy,
}: {
    currentPrivacy: PRIVACY
}) => {
    const { _id } = useAppSelector((s) => s.userReducer)
    const profile = useAppSelector((s) => s.profileReducer)
    const dispatch = useAppDispatch()
    
    const [files, setFiles] = useState<(File | string)[]>([])
    const [text, setText] = useState("")
    const [title, setTitle] = useState("")
    const [coordinates, setCoordinates] = useState<CoordinatsInterface>(
        profile.coordinates
    )
    const [search, setSearch] = useState<LocationType[]>([])
    const [servicesValue, setServicesValue] = useState<OptionsType>([])
    const [subServicesValue, setSubServicesValue] = useState<OptionsType>([])
    const [addressLocation, setAddressLocation] = useState(
        `${profile.country}, ${profile.city}, ${profile.street}, ${profile.houseNumber}`)
    const validate = !Boolean(
        text && title && files.length && servicesValue?.[0]?._id && subServicesValue?.[0]?._id
    )
    const navigate = useNavigate()
   console.log(servicesValue, subServicesValue );
   

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
                userIdentityId: string
                addressLocation: string
            } = {
                text,
                title,
                coordinates,
                userId: _id,
                privacyPost: currentPrivacy,
                servicesId: servicesValue?.[0]._id.toString(),
                subServicesId: subServicesValue?.[0]._id.toString(),
                userIdentityId: profile.userIdentityId,
                addressLocation
            }
            formCatData.append("payload", JSON.stringify(payload))

            for (let index = 0; index < files.length; index++) {
                formCatData.append("files", files[index])
            }

            await ServiceHttp.addPublishService(
                formCatData
            )

            if (!profile.isAddedServices) {
                const res = await profileTextInfo({
                    isAddedServices: true,
                    _id,
                })
                dispatch(setValueProfileReducer(res))
            }

            success()
            navigate(-1)
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
            <div className="publish__zone">
                <PublishFindZone search={search} setSearch={setSearch} />
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
