import { Route, Routes, useNavigate } from "react-router-dom"
import { ButtonBackRoute } from "../../ui/ButtonBackRoute"
import GeoLocationModule from "./GeoLocationModule"
import CurrentLocation from "./CurrentLocation"
import LocationSuccess from "./LocationSuccess"

const LocationUser = () => {
    const navigate = useNavigate()

    const exit = () => {
        navigate(-1)
    }

    return (
        <div className="forget">
            <div className="forget__back">
                <ButtonBackRoute click={exit} />
            </div>
            <Routes>


                <Route path='current-location/location-success' element={<LocationSuccess />} />
                <Route path='current-location' element={<CurrentLocation />} />
                <Route path="*" element={<GeoLocationModule />} />
            </Routes>
        </div>
    )
}

export default LocationUser

