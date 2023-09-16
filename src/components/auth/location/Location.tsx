import { Route, Routes, useNavigate } from "react-router-dom"
import { ButtonBackRoute } from "../../ui/ButtonBackRoute"
import {
    IconLocationKey,
    IconLocationAim,
    IconLocationPoint,
} from "../../svg/IconsLocation"
import { useState } from "react"
import GetLocation from "./GetLocation"

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
                {/*<Route path='current-location' element={<RecoveryEmail />} /> */}
                <Route path="*" element={<GetLocation />} />
            </Routes>
        </div>
    )
}

export default LocationUser

