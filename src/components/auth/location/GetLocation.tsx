import React, { useState, useEffect } from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import Autocomplete from "react-google-autocomplete"
import {
    IconLocationAim,
    IconLocationKey,
    IconLocationPoint,
} from "../../svg/IconsLocation"

type Library =
    | "core"
    | "maps"
    | "places"
    | "geocoding"
    | "routes"
    | "marker"
    | "geometry"
    | "elevation"
    | "streetView"
    | "journeySharing"
    | "drawing"
    | "visualization"

const libraries: Library[] = ["places"]
const mapContainerStyle = {
    width: "450px",
    height: "600px",
}

const center = {
    lat: 50.44270169661527,
    lng: 30.54569078101398,
}

const options = {
    disableDefaultUI: true,
    zoomControl: true,
}

const GetLocation = () => {
    const [selectedLocation, setSelectedLocation] = useState(center)
    const [map, _] = useState<any>(null)

    const geoLocation = async () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    console.log(map)

                    setSelectedLocation({ lat: latitude, lng: longitude })
                    map?.panTo({ lat: latitude, lng: longitude })
                },
                (error) => {
                    alert("Ошибка при получении местоположения:" + error)
                }
            )
        } else {
            alert("Геолокация не поддерживается в вашем браузере.")
        }
    }

    const onPlaceSelected = (place: any) => {
        const { lat, lng } = place?.geometry.location || center
        setSelectedLocation({ lat, lng })
    }

    return (
        <>
            <h4 className="forget__title">Enter your adress</h4>
            <h5 className="forget__subtitle location__subtitle">
                <IconLocationKey />
                <div>
                    <p>Your adress won’t be seen by others. </p>
                    <p> You can change this setting anytime</p>
                </div>
            </h5>
            <button
                className="location__but location__but--white"
                onClick={geoLocation}
            >
                <IconLocationAim /> Use current location
            </button>
            <div className="location__fields">
                <div className="location__field">
                    <div className="location__field-icon">
                        <IconLocationPoint />
                    </div>
                    <Autocomplete
                        apiKey={process.env.REACT_APP_GOOGLE_APi_KEY as string}
                        language="UA"
                        onPlaceSelected={onPlaceSelected}
                        style={{ width: "100%" }} // Укажите стили поля ввода
                        options={{
                            types: ["establishment",], // Указать типы предложений, включая адреса
                            componentRestrictions: { country: "UA" }, // Ограничить результаты для конкретной страны (Украина)
                        }}
                        className="login__email"
                        placeholder="вулиця Академіка Янгеля, 6а, Akademika Yanhelya Street, Вінниця, Вінницька область, Україна"
                       
                    />
                </div>
            </div>
            {/* <LoadScript
                googleMapsApiKey={
                    process.env.REACT_APP_GOOGLE_APi_KEY as string
                }
                libraries={libraries}
            >
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={selectedLocation}
                    zoom={15}
                    onLoad={(map: google.maps.Map) => setMap(map)}
                    //    options={options}
                >
                     <Marker position={selectedLocation} /> 
                </GoogleMap>
            </LoadScript>
         */}
        </>
    )
}

export default GetLocation

const LocationBody = () => {
    const [linkLocation, setLinkLocation] = useState("")
    return (
        <>
            <h4 className="forget__title">Enter your adress</h4>
            <h5 className="forget__subtitle location__subtitle">
                <IconLocationKey />
                <div>
                    <p>Your adress won’t be seen by others. </p>
                    <p> You can change this setting anytime</p>
                </div>
            </h5>
            <button className="location__but location__but--white">
                <IconLocationAim /> Use current location
            </button>
            {/* <div className="location__fields">
            <div className="location__field">
                <div className="location__field-icon">
                    <IconLocationPoint />
                </div>
                <input type="text" className="login__email" placeholder="https://maps.app.goo.gl/oxbjvSkLT452VNeB6"/>
            </div>
            <input type="text" className="login__email" placeholder="Apt"/>
        </div> */}
            <div className="location__field" style={{ marginTop: "20px" }}>
                <div className="location__field-icon">
                    <IconLocationPoint />
                </div>
                <input
                    type="text"
                    className="login__email"
                    placeholder="https://maps.app.goo.gl/oxbjvSkLT452VNeB6"
                    value={linkLocation}
                    onChange={(e) => setLinkLocation(e.target.value)}
                />
            </div>
            <button
                className="location__but location__but--white"
                style={{ marginTop: "20px" }}
            >
                <IconLocationAim /> Insern link location
            </button>
            <p className="location__par">
                You will see all the news and updates within a radius of 5 km
                You can personalize your feed later in your profile settings.
            </p>
        </>
    )
}
