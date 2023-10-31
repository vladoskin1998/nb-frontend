import React, { ReactNode, useState } from "react"
import { UserCurrentLocation } from "../../admin-components/users/UserCurrentLocation"
import { IconLocationAim, IconLocationPoint } from "../../svg/IconsLocation"
import {
    LocationEditType,
    UserEditMap,
} from "../../admin-components/users/UserEditMap"
import { useAppSelector } from "../../../utils/hooks"
import { CoordinatsInterface } from "../../../types/types"

export const PublishAddLocation = ({
    children,
    coordinates,
    setCoordinates,
    addressLocation, 
    setAddressLocation,
    isOpenInit=false,
}: {
    coordinates:CoordinatsInterface, 
    setCoordinates: (c:CoordinatsInterface) => void,
    children?: ReactNode
    addressLocation: string 
    setAddressLocation: (s:string) => void
    isOpenInit?:boolean
}) => {
    const [isOpen, serIsOpen] = useState(isOpenInit)
   
    const changeLocation = (l: LocationEditType) => {
        setCoordinates(l.coordinates)
        setAddressLocation(
            `${l.country}, ${l.city}, ${l.street}, ${l.houseNumber}`
        )
    }

    return (
        <div className="publish__location">
            {isOpen ? (
                <div>
                    <div className="publish__location-map">
                        <UserEditMap
                            startLat={coordinates.lat}
                            startLng={coordinates.lng}
                            changeLocation={changeLocation}
                            mapStyle={{ width: "100%", height: "171px" }}
                        />
                        <div className="publish__location-circle">
                            <div className="publish__location-circle-child">
                                {children}
                            </div>
                            <img src="/Images/MapCircle.png" />
                        </div>
                    </div>
                    <p className="publish__location-map-address">
                        {addressLocation}
                    </p>
                </div>
            ) : (
                <button
                    className="publish__location-button"
                    onClick={() => serIsOpen(true)}
                >
                    <IconLocationPoint />
                    Add Location
                </button>
            )}
        </div>
    )
}
