import React, { useEffect, useRef } from "react"
import { CoordinatsInterface } from "../../../types/types"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { createAddressString } from "../../../utils/createAddressString"
import { setCoordinatesAndAddress } from "../../../reducer/auth"
import { IconLocationAim } from "../../svg/IconsLocation"
import { useNavigate } from "react-router-dom"

const defaultCenter = {
    lat: 50.44270169661527,
    lng: 30.54569078101398,
}

const mapContainerStyle = {
    width: "100%",
    height: "500px",
}

const CurrentLocation = () => {
    const { city, country, houseNumber, street } = useAppSelector(
        (s) => s.authReducer.payloadUser
    )
    const mapRef = useRef<google.maps.Map | null>(null)
    const geocoderRef = useRef<google.maps.Geocoder | null>(null)
    const dispatch = useAppDispatch()
    const { coordinars } = useAppSelector((s) => s.authReducer.payloadUser)
    const navigate = useNavigate()

    useEffect(() => {
        const initializeMap = () => {
            if (window.google) {
                const mapOptions: google.maps.MapOptions = {
                    zoom: 14,
                    fullscreenControl: false,
                    mapTypeControl: false,
                    streetViewControl: false,
                    zoomControl: false,
                    scrollwheel: false,
                    center:
                        coordinars && coordinars.lat
                            ? new google.maps.LatLng(
                                  coordinars.lat,
                                  coordinars.lng
                              )
                            : new google.maps.LatLng(
                                  defaultCenter.lat,
                                  defaultCenter.lng
                              ),
                }
                mapRef.current = new google.maps.Map(
                    document.getElementById(
                        "map--google--current"
                    ) as HTMLElement,
                    mapOptions
                )

                geocoderRef.current = new google.maps.Geocoder()

                mapRef.current.addListener("dragend", () => {
                    const newCenter = mapRef.current?.getCenter() // Получение новых координат центра карты
                    console.log(
                        " mapRef.current?.getCenter()",
                        mapRef.current?.getCenter()
                    )

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
                                    setCoordinatesAndAddress({
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

        initializeMap()
    }, [])

    const navigateToSuccess = () => navigate("location-success")

    return (
        <>
            <div className="location__current">
                <div className="location__current-map">
                    <div
                        id="map--google--current"
                        style={mapContainerStyle}
                    ></div>
                    <img
                        src="/Images/MapCircle.png"
                        className="location__current-map--target"
                    />
                </div>
            </div>
            <h5 className="location__current-title">
                <IconLocationAim />{" "}
                {`${city || "city"}, ${country || "country"}`}
            </h5>
            <p className="location__current-subtitle">
                {`${street || "street"} ${houseNumber || "houseNumber"}`}
            </p>
            <div className="location__current-button">
                <button
                    className="location__bt-continue"
                    onClick={navigateToSuccess}
                >
                    Confirm Location
                </button>
            </div>
        </>
    )
}

export default CurrentLocation
