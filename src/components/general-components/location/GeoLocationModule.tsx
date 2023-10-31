import { useEffect, useRef } from "react"
import { setValueProfileReducer } from "../../../reducer/profile"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { createAddressString } from "../../../utils/createAddressString"
import GeoLocationView from "./GeoLocationView"
import { useLocation, useNavigate } from "react-router-dom"

const GeoLocationModule = () => {

    const dispatch = useAppDispatch()
    const navigation = useNavigate()
    const location = useLocation()
    const { coordinates, city, country, houseNumber, street } = useAppSelector(
        (s) => s.profileReducer
    )
    const inputRef = useRef<HTMLInputElement | null>(null)
    const adderess = `${country}, ${city}, ${street}, ${houseNumber}`

    
    const geoLocation = async () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords

                    console.log("my location",position.coords)

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
                                if (city &&  country && houseNumber && street && inputRef.current ) {            
                                    inputRef.current.value = adderess;
                                }
                                setTimeout(() => {navigateToRouteGeo()}, 1)
                                
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

    useEffect(() => {
        inputRef.current = document.getElementById(
            "autocomplete--google"
        ) as HTMLInputElement

        const options = {
            types: ["geocode"],
            // componentRestrictions: { country: "UA" },
        }

        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options)

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
        if (city &&  country && houseNumber && street) {            
            inputRef.current.value = adderess;
        }
    }, [])

    const navigateToRouteGeo = () => {
        console.log(location.pathname);
        if(location.pathname !== "/location"){
            return
        }
        navigation("/location/current-location")
    }

    const navigateToCurrentRoute = () => {
        console.log(location.pathname);
        if(location.pathname !== "/location"){
            navigation("/location/location-success")
            return
        }
        navigation("/location/current-location")
    }

    return (
        <GeoLocationView
            inputRef={inputRef}
            geoLocation={geoLocation}
            navigateToCurrentRoute={navigateToCurrentRoute}
            pathname={location.pathname}
        />
    )
}

export default GeoLocationModule
