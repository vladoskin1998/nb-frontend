import React, { useEffect, useRef } from "react"
import { CoordinatsInterface } from "../../../types/types"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { createAddressString } from "../../../utils/createAddressString"
import { setValueProfileReducer } from "../../../reducer/profile"
import { useNavigate } from "react-router-dom"
import CurrentLocationView from "./CurrentLocationView"

const CurrentLocationModule = () => {
    const { city, country, houseNumber, street, coordinates } = useAppSelector(
        (s) => s.profileReducer
    )
    const mapRef = useRef<google.maps.Map | null>(null)
    const geocoderRef = useRef<google.maps.Geocoder | null>(null)
    const containerMapRef = useRef<HTMLDivElement | null>(null)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const validateGeoData: boolean = Boolean(
        city && country && houseNumber && street
    )

    useEffect(() => {
        const initMap = () => {
            if (window.google && containerMapRef.current && coordinates) {
                const mapOptions: google.maps.MapOptions = {
                    zoom: 14,
                    fullscreenControl: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    zoomControl: false,
                    scrollwheel: false,
                    center: new google.maps.LatLng(
                        coordinates.lat,
                        coordinates.lng
                    ),
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

                    let latLng = new google.maps.LatLng(
                        coordinates.lat,
                        coordinates.lng
                    )
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

                                dispatch(
                                    setValueProfileReducer({
                                        coordinates: {
                                            lat: newLat,
                                            lng: newLng,
                                        },
                                        ...address,
                                    })
                                )
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

    const navigateToConfirm = () => {
        if (validateGeoData) {
            navigate("/location/confirm-location")
            return
        }
        alert("city, country, street, houseNumber must have")
    }

    
    const geoLocation = async () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords

                    console.log(position.coords)
        
                    const geocoder = new google.maps.Geocoder()

                    const latLng = new google.maps.LatLng(latitude, longitude)
                    
                    mapRef.current?.panTo(latLng)

                    geocoder.geocode(
                        { location: latLng },
                        async (results, status) => {
                            console.log(results)

                            if (status === "OK" && results && results[0]) {
                                const address = createAddressString(
                                    results[0].address_components
                                )

                                dispatch(
                                    setValueProfileReducer({
                                        coordinates: {
                                            lat: latitude,
                                            lng: longitude,
                                        },
                                        ...address,
                                    })
                                )
                            } else {
                                alert("Ошибка при геокодировании.")
                            }
                        }
                    )
                },
                (error) => {
                    alert("Ошибка при получении местоположения:" + error)
                }
            )
        } else {
            alert("Геолокация не поддерживается в вашем браузере.")
        }
    }

    return (
        <CurrentLocationView
            validateGeoData={validateGeoData}
            navigateToConfirm={navigateToConfirm}
            containerMapRef={containerMapRef}
            geoLocation={geoLocation}
        />
    )
}

export default CurrentLocationModule
