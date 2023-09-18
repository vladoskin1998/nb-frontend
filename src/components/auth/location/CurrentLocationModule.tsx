import React, { useEffect, useRef } from "react"
import { CoordinatsInterface } from "../../../types/types"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { createAddressString } from "../../../utils/createAddressString"
import { setCoordAndAddr } from "../../../reducer/user"
import { IconLocationAim } from "../../svg/IconsLocation"
import { useNavigate } from "react-router-dom"
import CurrentLocationView from "./CurrentLocationView"

const defaultCenter = {
    lat: 50.44270169661527,
    lng: 30.54569078101398,
}

const mapContainerStyle = {
    width: "100%",
    height: "500px",
}

const CurrentLocationModule = () => {
    const { city, country, houseNumber, street, coordinates } = useAppSelector(
        (s) => s.userReducer
    )
    const mapRef = useRef<google.maps.Map | null>(null)
    const geocoderRef = useRef<google.maps.Geocoder | null>(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const validateGeoData: boolean = Boolean(
        city && country && houseNumber && street
    )

    useEffect(() => {
        if (window.google) {
            const mapOptions: google.maps.MapOptions = {
                zoom: 14,
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                zoomControl: false,
                scrollwheel: false,
                center:
                coordinates && coordinates.lat
                        ? new google.maps.LatLng(coordinates.lat, coordinates.lng)
                        : new google.maps.LatLng(
                              defaultCenter.lat,
                              defaultCenter.lng
                          ),
            }
            mapRef.current = new google.maps.Map(
                document.getElementById("map--google--current") as HTMLElement,
                mapOptions
            )

            geocoderRef.current = new google.maps.Geocoder()

            mapRef.current.addListener("dragend", () => {
                const newCenter = mapRef.current?.getCenter() // Получение новых координат центра карты

                const newLat = newCenter?.lat()
                const newLng = newCenter?.lng()

                let latLng = new google.maps.LatLng(defaultCenter)
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
                                setCoordAndAddr({
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
        />
    )
}

export default CurrentLocationModule
