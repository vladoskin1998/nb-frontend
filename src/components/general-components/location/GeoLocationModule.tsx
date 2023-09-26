import { useEffect } from "react"
import { setValueProfileReducer } from "../../../reducer/profile"
import { useAppDispatch } from "../../../utils/hooks"
import { createAddressString } from "../../../utils/createAddressString"
import GeoLocationView from "./GeoLocationView"
import { useNavigate } from "react-router-dom"

const GeoLocationModule = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigate()

    const geoLocation = async () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords

                    const geocoder = new google.maps.Geocoder()

                    const latLng = new google.maps.LatLng(latitude, longitude)

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
                    navigateToCurrentRoute()
                },
                (error) => {
                    alert("Ошибка при получении местоположения:" + error)
                }
            )
        } else {
            alert("Геолокация не поддерживается в вашем браузере.")
        }
    }

    useEffect(() => {
        const input = document.getElementById(
            "autocomplete--google"
        ) as HTMLInputElement

        const options = {
            types: ["geocode"],
            componentRestrictions: { country: "UA" },
        }

        const autocomplete = new google.maps.places.Autocomplete(input, options)

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace()
            if (
                place.geometry &&
                place.geometry.location &&
                place.address_components
            ) {
                const { lat, lng } = place.geometry.location
                const address = createAddressString(place?.address_components)

                dispatch(
                    setValueProfileReducer({
                        coordinates: { lat: lat(), lng: lng() },
                        ...address,
                    })
                )
            }
        })
    }, [])

    const navigateToCurrentRoute = () => navigation("current-location")

    return (
        <GeoLocationView
            geoLocation={geoLocation}
            navigateToCurrentRoute={navigateToCurrentRoute}
        />
    )
}

export default GeoLocationModule
