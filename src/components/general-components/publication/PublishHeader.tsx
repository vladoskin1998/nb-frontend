import React, { useState } from "react"
import { UserHeader } from "../../user-components/header/UserHeader"
import { IconLeftChevrons } from "../../svg/IconChevrons"
import { IconServicesAllPoint } from "../../svg/IconServicesAll"
import { getPublishTitle } from "../../../utils/titles"
import { useLocation, useNavigate } from "react-router-dom"
import { PublishPrivacyModal } from "./PublishPrivacyModal"
import { PRIVACY } from "../../../types/enum"

export const PublicationHeader = ({
    currentPrivacy,
    setCurrentPrivacy,
}: {
    currentPrivacy: PRIVACY
    setCurrentPrivacy: (p: PRIVACY) => void
}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    console.log(isOpen)

    return (
        <UserHeader>
            <div className="profileinfo__header">
                <button
                    className="profileinfo__header-chevron"
                    onClick={() => navigate(-1)}
                >
                    <IconLeftChevrons />
                </button>
                <h5 className="profileinfo__header-text">
                    {getPublishTitle(location.pathname)}
                </h5>
                {location.pathname === "/publish" ? (
                    <button className="profileinfo__header-points">
                        <IconServicesAllPoint />
                    </button>
                ) : (
                    <PublishPrivacyModal
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        currentPrivacy={currentPrivacy}
                        setCurrentPrivacy={setCurrentPrivacy}
                    />
                )}
            </div>
        </UserHeader>
    )
}
