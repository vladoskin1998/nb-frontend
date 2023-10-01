import React from "react"
import { useAppSelector } from "../../../utils/hooks"
import { IconLeftChevrons } from "../../svg/IconChevrons"
import { IconServicesAllPoint } from "../../svg/IconServicesAll"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getProfileInfoHederTitile } from "../../../utils/titles"
import { roleUrl } from "../../../utils/config"

export const ProfileInfoHeader = () => {
    const { fullName, role } = useAppSelector((s) => s.userReducer)
    const location = useLocation()
    const isProfileInfo = location.pathname === "/profileinfo"
    const navigate = useNavigate()

    const exit = () => {
        if (isProfileInfo) {
            return navigate(roleUrl(role))
        }
        navigate(-1)
    }
    return (
        <div className="profileinfo__header">
            <button className="profileinfo__header-chevron" onClick={exit}>
                <IconLeftChevrons />
            </button>
            <h6 className="profileinfo__header-text" onClick={exit}>
                {isProfileInfo
                    ? fullName
                    : getProfileInfoHederTitile(location.pathname)}
            </h6>
            {isProfileInfo && (
                <button className="profileinfo__header-points">
                    <Link to={"/profileinfo/settings"}>
                        <IconServicesAllPoint />
                    </Link>
                </button>
            )}
        </div>
    )
}
