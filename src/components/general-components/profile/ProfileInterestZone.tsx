import { useEffect, useRef } from "react"
import { useAppSelector } from "../../../utils/hooks"
import { useNavigate } from "react-router-dom"
import { ProfileButtonSetupLater } from "./ProfileButtonSetupLater"

const mapContainerStyle = {
    width: "100%",
    maxHeight: "334px",
    height: "100%",
    borderRadius: "12px",
}

export const ProfileInterestZone = () => {
    const mapRef = useRef<google.maps.Map | null>(null)
    const containerMap = useRef<HTMLDivElement | null>(null)

    const { coordinates } = useAppSelector((s) => s.profileReducer)
    const navigate = useNavigate()

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
                    coordinates.lat,
                    coordinates.lng
                ),
            }
            mapRef.current = new google.maps.Map(
                containerMap.current as HTMLElement,
                mapOptions
            )
        }
    }, [])

    return (
        <>
            <div className="profile__method-body">
                <div className="profile__zone-body">
                    <div style={mapContainerStyle} ref={containerMap} />
                    <button
                        className="profile__zone-button"
                        onClick={() => navigate("/profile/setup-interest-zone")}
                    >
                        Setup Interest Zone
                    </button>
                </div>
            </div>
            <ProfileButtonSetupLater />
            <button
                className={`profile__method-btlater`}
                onClick={() => navigate("/profile/about")}
            >
                Continue
            </button>

            
        </>
    )
}
