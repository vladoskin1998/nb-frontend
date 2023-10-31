import React, { useEffect, useState } from "react"
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import {
    WelcomeYourArea,
    WelcomeYourCompas,
    WelcomeYourPassion,
    WelcomeYourWorld,
    WelcomeLogo,
} from "./WelcomeItems"

export const Welcome = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isLogo, setIsLogo] = useState(true)


    useEffect(() => {
        setTimeout(() => {
            setIsLogo(false)
        }, 3000)
    }, [])

    const next = (): string => {
        const key = location.pathname
        switch (key) {
            case "/welcome/passion":
                return "/welcome/world"
            case "/welcome/world":
                return "/welcome/area"
            case "/welcome/area": {
                localStorage.setItem("isWelcome", "true")
                return "/auth"
            }
            default:
                return "/welcome/passion"
        }
    }

    const singUp = () =>{ 
        if(  location.pathname === '/welcome/area'){
            window.location.reload();
        }
    }
    return (
        <div className="welcome">
            {isLogo ? (
                <WelcomeLogo />
            ) : (
                <>
                    <div className="welcome-img">
                        <h4 className="welcome-title">Neighbor Harbor</h4>
                        <h5 className="welcome-subtitle">
                            One stop social network
                        </h5>
                    </div>
                    {
                        <Routes>
                            <Route path="area" element={<WelcomeYourArea />} />
                            <Route
                                path="world"
                                element={<WelcomeYourWorld />}
                            />
                            <Route
                                path="passion"
                                element={<WelcomeYourPassion />}
                            />
                            <Route path="*" element={<WelcomeYourCompas />} />
                        </Routes>
                    }

                    <div className={`welcome-buttons
                    ${ location.pathname === '/welcome' && "welcome-buttons-first"}
                    `}>
                        <button
                            className="authsuccess__body-buttons-button authsuccess__body-buttons-button--white"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </button>
                        <Link to={next()}>
                            <button className="authsuccess__body-buttons-button" onClick={singUp}>
                                {
                                    location.pathname === '/welcome/area' ? "Sing Up" : "Next"
                                }
                                
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}
