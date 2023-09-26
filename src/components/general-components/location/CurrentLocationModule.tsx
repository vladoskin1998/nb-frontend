import React, { useEffect, useRef } from "react"
import { CoordinatsInterface } from "../../../types/types"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { createAddressString } from "../../../utils/createAddressString"
import { setValueProfileReducer } from "../../../reducer/profile"
import { IconLocationAim } from "../../svg/IconsLocation"
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
            console.log("initMap------>",coordinates);
            
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
                    const newCenter = mapRef.current?.getCenter() // Получение новых координат центра карты

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

    const navigateToSuccess = () => {
        if (validateGeoData) {
            navigate("location-success")
            return
        }
        alert("city, country, street, houseNumber must have")
    }

    return (
        <CurrentLocationView
            validateGeoData={validateGeoData}
            navigateToSuccess={navigateToSuccess}
            containerMapRef={containerMapRef}
        />
    )
}

export default CurrentLocationModule
