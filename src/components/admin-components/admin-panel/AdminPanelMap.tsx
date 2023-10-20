import React from "react"
import { useAppSelector } from "../../../utils/hooks"
import { UserCurrentLocation } from "../users/UserCurrentLocation"
import { ROLES } from "../../../types/enum"

export const AdminPanelMap = () => {
    const { fullName, role } = useAppSelector((s) => s.userReducer)
    const { coordinates, step } = useAppSelector((s) => s.profileReducer)

    let props:any = {
        startLat:coordinates.lat,
        startLng:coordinates.lng,
        interestZone:step,
        className: "admin__panel-map"
    }

    if(role === ROLES.ADMIN){
        props.zoom = 1
    }

    if(role === ROLES.REGIONAL_ADMIN){
        props.interestZone = 20
    }
    
    return (
        <div>
            <div className="admin__panel-name">Hello, {fullName}</div>
            <div className="admin__panel-title"> My working area </div>
            <UserCurrentLocation
               {...props}
            />
        </div>
    )
}
