import React, { useEffect, useRef, useState } from "react"
import { IconServicesAllPoint } from "../../svg/IconServicesAll"
import { IconStars } from "../../svg/IconFavor"
import {
    IconUserClock,
    IconUserHashTag,
    IconUserHome,
    IconUserRole,
    IconsUserBlock,
} from "../../svg/IconsUserItem"
import { ROLES } from "../../../types/enum"
import { IconRightChevrons } from "../../svg/IconChevrons"
import moment from "moment"
import { UserInitialStateInterface } from "../../../reducer/users"
import { UserIdentityInterface } from "../../../services/profile"

interface UserItemViewProps extends UserInitialStateInterface {
    setIsOpen: () => void
    userIdentity: UserIdentityInterface | null
}
const mapContainerStyle = {
    width: "100%",
    height: "171px",
    borderRadius: "12px",
}

const initCoordinates = {
    lat: 50.440569860389814,
    lng: 30.540884262459286
}

export const UserItemView = (props: UserItemViewProps) => {
    const mapRef = useRef<google.maps.Map | null>(null)
    const containerMap = useRef<HTMLDivElement | null>(null)
    const [downloadMap, setDownloadMap] = useState(false)

    const {
        setIsOpen,
        fullName,
        email,
        role,
        userIdentity
    } = props

    useEffect(() => {
        if (window.google && containerMap.current) {
            const mapOptions: google.maps.MapOptions = {
                zoom: 14,
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                zoomControl: false,
                scrollwheel: false,
                gestureHandling: "none",
                center: new google.maps.LatLng(
                    userIdentity?.coordinates?.lat || initCoordinates.lat,
                    userIdentity?.coordinates?.lng ||  initCoordinates.lng,
                ),
            }
            mapRef.current = new google.maps.Map(
                containerMap.current as HTMLElement,
                mapOptions
            )
        }
    }, [downloadMap])

    return (
        <div className="user__item">
            <div className="user__item-row1">
                <img
                    src="/Images/avatar-user.png"
                    alt=""
                    className="user__item-row1-img"
                />
                <div className="user__item-row1-info">
                    <p className="user__item-row1-user">
                        <b>{fullName}</b>
                        <IconStars />
                        <b>4.5</b>
                        <span>(808)</span>
                    </p>
                    <p className="user__item-row1-email">{email}</p>
                    <p className="user__item-row1-phone">+380 95 406 43 21</p>
                </div>
                <button className="user__item-row1-button" onClick={setIsOpen}>
                    <IconServicesAllPoint />
                </button>
            </div>
            {role === ROLES.BLOCKED ? (
                <>
                    <div className="user__item-blocked">
                        <div>
                            <div className="user__item-blocked-title">
                                START DATE
                            </div>
                            <div className="user__item-blocked-date">
                                {moment(userIdentity?.createdUserDate || '').format(
                                    "MMM D, h:mm a"
                                )}
                            </div>
                        </div>
                        <div>
                            <IconRightChevrons />
                        </div>
                        <div>
                            <div className="user__item-blocked-title">
                                DUE DATE
                            </div>
                            <div className="user__item-blocked-date">
                                {moment(userIdentity?.blockedUserDate || '').format(
                                    "MMM D, h:mm a"
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="user__item-blocked-line">
                        <div className="user__item-blocked-row1">
                            <img src="/Images/avatar-user.png" alt="" />
                            <div>Coordinator Name</div>
                        </div>
                        <div className="user__item-blocked-row1">
                            <IconsUserBlock />
                            <div>Block type</div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="user__item-row2">
                        <div className="services__favor-item-row2">
                            <IconUserHashTag />
                            <span>1271</span>
                            <div className="services__favor-item-row2-svg">
                                <IconUserClock />
                            </div>
                            <span>{new Date().toLocaleString()}</span>
                        </div>
                        <div className="services__favor-item-row2 services__favor-item-row2-2">
                            <IconUserRole />
                            <span>{role}</span>
                            <IconUserHome />
                            <span>{`${userIdentity?.street || ''} ${userIdentity?.houseNumber || ''}`}</span>
                        </div>
                    </div>
                    {downloadMap ? (
                        <div style={mapContainerStyle} ref={containerMap} />
                    ) : (
                        
                            <div style={mapContainerStyle} className="user__item-tapmap" onClick={() => setDownloadMap(true)}>
                                <div className="user__item-tapmapbody" />
                                Tap to see location 
                            </div>
                    )}
                </>
            )}
        </div>
    )
}
