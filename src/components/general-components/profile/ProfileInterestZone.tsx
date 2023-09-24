import { useEffect, useRef } from "react"
import { StandartTitleSubtitle } from "../../ui/StandartTitleSubtitle"
import { useAppSelector } from "../../../utils/hooks"
import { Link } from "react-router-dom"

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
                    <button className="profile__zone-button">
                        <Link to="/profile/setup-interest-zone">
                            Setup Interest Zone
                        </Link>
                    </button>
                </div>
            </div>
            <button className="profile__method-btlater profile__method-btlater--inherit">
                {/* <Link to={"/admin"}> */}
                Setup later
                {/* </Link> */}
            </button>
            <button className={`profile__method-btlater`}>
                <Link to={"/profile/privacy"}>Continue</Link>
            </button>
        </>
    )
}
