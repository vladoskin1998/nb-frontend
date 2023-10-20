import React, { useEffect, useRef, useState } from "react"
import { INIT_COORDINATES } from "../../../utils/constant"

const initMapContainerStyle = {
    width: "100%",
    height: "300px",
}

export const UserCurrentLocation = ({
    startLat = INIT_COORDINATES.lat,
    startLng = INIT_COORDINATES.lng,
    interestZone = 5,
    zoom,
    mapStyle,
    isDownloadMap = false,
    className,
}: {
    startLat?: number
    startLng?: number
    interestZone?: number
    zoom?: number
    mapStyle?: {width: string, height: string},
    isDownloadMap?: boolean,
    className?:string 
}) => {
    const mapRef = useRef<google.maps.Map | null>(null)
    const containerMap = useRef<HTMLDivElement | null>(null)
    const [downloadMap, setDownloadMap] = useState(isDownloadMap)
    const mapContainerStyle = mapStyle ? mapStyle : initMapContainerStyle

    useEffect(() => {
        if (window.google && containerMap.current) {
            const mapOptions: google.maps.MapOptions = {
                zoom,
                minZoom: 1,
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                zoomControl: false,
                scrollwheel: false,
                gestureHandling: "none",
                center: new google.maps.LatLng(startLat, startLng),
            }

            if (!zoom) {
                mapOptions.zoom = getZoomForRadius(startLat, interestZone)
            }

            mapRef.current = new google.maps.Map(
                containerMap.current as HTMLElement,
                mapOptions
            )
        }
    }, [downloadMap])

    useEffect(() => {
        const coord = new google.maps.LatLng(startLat, startLng)
        mapRef.current?.panTo(coord)
    }, [startLat, startLng])

    const getZoomForRadius = (
        centerLat = INIT_COORDINATES.lat,
        zoneRadiusKm = 5
    ) => {
        const zoneRadiusM = zoneRadiusKm * 1000
        // Константа, представляющая ширину мира в пикселях при уровне масштабирования 0
        return Math.log2(
            (156543.03392 * Math.cos((centerLat * Math.PI) / 180)) /
                (zoneRadiusM / 256)
        )
    }

    return (
        <>
            {downloadMap ? (
                <div style={mapContainerStyle} ref={containerMap} className={className}/>
            ) : (
                <div
                    style={mapContainerStyle}
                    className="user__item-tapmap"
                    onClick={() => setDownloadMap(true)}
                >
                    <img
                        src="/Images/MapBackground.png"
                        alt=""
                        className="user__item-tapmapbody"
                    />
                    Tap to see location
                </div>
            )}
        </>
    )
}
