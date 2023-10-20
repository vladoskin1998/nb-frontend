import { toOneKind } from "../../../utils/titles"
import { ROLES } from "../../../types/enum"
import { useNavigate } from "react-router-dom"

const groups = [
    {
        name: "Central Office",
        role: ROLES.ADMIN
    },
    {
        name: "Regional Admin",
        role: ROLES.REGIONAL_ADMIN
    },
    {
        name: "Local Coordinator",
        role: ROLES.COORDINATORS
    },
    {
        name: "User",
        role: ROLES.USER
    },
    {
        name: "Blocked",
        role: ROLES.BLOCKED
    },
    {
        name: "Tech Support",
        role: ROLES.TECH_SUPPORT
    },
]

export const UserGroups = () => {

    const navigate = useNavigate()

    const navToGroup = (role: ROLES) => {
        navigate(`/admin/users/${toOneKind(role)}`, {
            state: {
                role
            },
        })
    }

    return (
        <div className="user__groups">
            {groups.map((item) => {
                return (
                    <div  className="user__groups-item" onClick={() => navToGroup(item.role)}>
                        <div className="user__groups-item-name">
                            <h5>{item.name}</h5>
                            <button>
                               
                            </button>
                        </div>
                        <button className="user__groups-item-button">Access</button>
                    </div>
                )
            })}
        </div>
    )
}
