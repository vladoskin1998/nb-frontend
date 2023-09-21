import { useEffect, useRef } from "react"
import { StandartTitleSubtitle } from "../../ui/StandartTitleSubtitle"
import { useAppSelector } from "../../../utils/hooks"
import { Link } from "react-router-dom"

const mapContainerStyle = {
    width: "100%",
    height: "334px",
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
            <StandartTitleSubtitle
                title={"Interest Zone"}
                subTitle={
                    "Express and explore the things that truly captivate you"
                }
            />
            <div className="pofile__method-body">
                <div style={mapContainerStyle} ref={containerMap} />
                <button className="pofile__zone-button">
                    <Link to="/profile/setup-interest-zone">
                        Setup Interest Zone
                    </Link>
                </button>
            </div>
            <button className="pofile__method-btlater pofile__method-btlater--inherit">
                {/* <Link to={"/admin"}> */}
                    Setup later
                {/* </Link> */}
            </button>
            <button className={`pofile__method-btlater`}>
                <Link to={"/profile/interest-zone"}>Continue</Link>
            </button>
        </>
    )
}
