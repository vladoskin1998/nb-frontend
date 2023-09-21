import React from "react"
import { IconServicesAllPoint } from "../../svg/IconServicesAll"

const groups = [
    {
        name: "Central Office",
    },
    {
        name: "Regional Admin",
    },
    {
        name: "Local Coordinator",
    },
    {
        name: "User",
    },
    {
        name: "Blocked",
    },
    {
        name: "Tech Support",
    },
]

export const UserGroups = () => {
    return (
        <div className="user__groups">
            {groups.map((item) => {
                return (
                    <div  className="user__groups-item">
                        <div className="user__groups-item-name">
                            <h5>{item.name}</h5>
                            <button>
                                <IconServicesAllPoint />
                            </button>
                        </div>
                        <button className="user__groups-item-button">Access</button>
                    </div>
                )
            })}
        </div>
    )
}
