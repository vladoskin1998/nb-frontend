import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { ButtonBackRoute } from "../../ui/ButtonBackRoute"
import GeoLocationModule from "./GeoLocationModule"
import CurrentLocationModule from "./CurrentLocationModule"
import LocationSuccess from "./LocationSuccess"

const LocationUser = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const exit = () => {
        navigate(-1)
    }

    return (
        <div className="forget">
            {
                location.pathname !== '/location/location-success' && 
                <div className="forget__back">
                <ButtonBackRoute click={exit} />
            </div>
            }
          
            <Routes>
                <Route path='location-success' element={<LocationSuccess />} />
                <Route path='confirm-location' element={<GeoLocationModule />} />
                <Route path='current-location' element={<CurrentLocationModule />} />
                <Route path="" element={<GeoLocationModule />} />
            </Routes>
        </div>
    )
}

export default LocationUser

