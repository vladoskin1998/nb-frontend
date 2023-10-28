import React from "react"
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import {
    WelcomeYourArea,
    WelcomeYourCompas,
    WelcomeYourPassion,
    WelcomeYourWorld,
} from "./WelcomeItems"

export const Welcome = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const next = ():string => {
        const key = location.pathname
        switch (key) {
            case "/welcome/passion":
                return "/welcome/world"
            case "/welcome/world":
                return "/welcome/area"
            case "/welcome/area":{
                localStorage.setItem('isWelcome', 'true')
                window.location.reload();
                return "/auth"
            }
            default:
                return "/welcome/passion"
        }
    }
    return (
        <div className="welcome">
            <div className="welcome-img">
                <img
                    src="/Images/ImageSuccess.png"
                    alt="not-image"
                    className="welcome-img-1"
                />
                <h4 className="welcome-title">Neighbor Harbor</h4>
                <h5 className="welcome-subtitle">One stop social network</h5>
            </div>
            {
                <Routes>
                    <Route path="area" element={<WelcomeYourArea />} />
                    <Route path="world" element={<WelcomeYourWorld />} />
                    <Route path="passion" element={<WelcomeYourPassion />} />
                    <Route path="*" element={<WelcomeYourCompas />} />
                </Routes>
            }

            <div className="welcome-buttons">
                <button
                    className="authsuccess__body-buttons-button authsuccess__body-buttons-button--inherit"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
                <Link to={next()}>
                    <button className="authsuccess__body-buttons-button">
                        Next
                    </button>
                </Link>
            </div>
        </div>
    )
}
