import React, { useEffect, useRef } from "react"
import { createAddressString } from "../../../utils/createAddressString"
import { INIT_COORDINATES } from "../../../utils/constant"

export type LocationEditType = {
    coordinates: {
        lat: number
        lng: number
    }
    city: string | null
    country: string | null
    street: string | null
    houseNumber: string | null
}

const initMapContainerStyle = {
    width: "100%",
    height: "500px",
}


export const UserEditMap = ({
    startLat = INIT_COORDINATES.lat,
    startLng = INIT_COORDINATES.lng,
    changeLocation,
    mapStyle

}: {
    startLat?: number
    startLng?: number
    changeLocation: (l: LocationEditType) => void
    mapStyle?: {width: string, height: string}
}) => {
    const mapRef = useRef<google.maps.Map | null>(null)
    const geocoderRef = useRef<google.maps.Geocoder | null>(null)
    const containerMapRef = useRef<HTMLDivElement | null>(null)
    const mapContainerStyle = mapStyle ? mapStyle : initMapContainerStyle

    useEffect(() => {
        const initMap = () => {
            if (
                window.google &&
                containerMapRef.current &&
                startLat &&
                startLng
            ) {
                const mapOptions: google.maps.MapOptions = {
                    zoom: 14,
                    fullscreenControl: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    zoomControl: false,
                    scrollwheel: false,
                    center: new google.maps.LatLng(startLat, startLng),
                }
                mapRef.current = new google.maps.Map(
                    containerMapRef.current as HTMLElement,
                    mapOptions
                )

                geocoderRef.current = new google.maps.Geocoder()

                mapRef.current.addListener("dragend", () => {
                    const newCenter = mapRef.current?.getCenter()

                    const newLat = newCenter?.lat()
                    const newLng = newCenter?.lng()

                    let latLng = new google.maps.LatLng(startLat, startLng)
                    if (newLat && newLng) {
                        latLng = new google.maps.LatLng(newLat, newLng)
                    }

                    geocoderRef.current?.geocode(
                        { location: latLng },
                        async (results, status) => {
                            if (
                                status === "OK" &&
                                results &&
                                results[0] &&
                                newLat &&
                                newLng
                            ) {
                                const address = createAddressString(
                                    results[0].address_components
                                )
                                changeLocation({
                                    coordinates: {
                                        lat: newLat,
                                        lng: newLng,
                                    },
                                    ...address,
                                })
                            } else {
                                alert("Ошибка при геокодировании.")
                            }
                        }
                    )
                })
            }
        }

        initMap()
    }, [])

    return <div ref={containerMapRef} style={mapContainerStyle} className="user--location--map"></div>
}
