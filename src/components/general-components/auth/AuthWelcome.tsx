import React, { useEffect, useState } from "react"
import { IconGoogle } from "../../svg/IconGoogle"
import { IconFacebook } from "../../svg/IconFacebook"
import { METHOD_AUTH } from "../../../types/enum"
import { useNavigate } from "react-router-dom"
import { WelcomeLogo } from "../welcome/WelcomeItems"
import { useAppSelector } from "../../../utils/hooks"

export const AuthWelcome = () => {
    const hendlerAuthMessenger = (
        method: METHOD_AUTH.FACEBOOK | METHOD_AUTH.GOOGLE
    ) => {
        window.location.href = `https://environs.life/api/auth/${method}`
        localStorage.setItem("authLoaderMethod", "true")
    }

    const navigate = useNavigate()

    const toLogin = (isLogin: boolean) => {
        navigate("/auth/login", {
            state: {
                isLogin,
            },
        })
    }

    const { isLoad } = useAppSelector((s) => s.authReducer)
    const [isMessengerLoad, setIsMessengerLoad] = useState(false)

    useEffect(() => {
        const authLoaderMethod = localStorage.getItem("authLoaderMethod")
        if (authLoaderMethod && authLoaderMethod === "true") {
            setIsMessengerLoad(true)
        }

        setTimeout(() => {
            const authLoaderMethod = localStorage.getItem("authLoaderMethod")
            if (authLoaderMethod) {
                setIsMessengerLoad(false)
                localStorage.removeItem("authLoaderMethod")
                alert("auth method google or facebook not found")
            }
        }, 12000)

        return () => {
            localStorage.removeItem("authLoaderMethod")
        }
    }, [])

    return (
        <>
            {isLoad || isMessengerLoad ? (
                <WelcomeLogo />
            ) : (
                <div className="auth">
                    <div className="auth__welcome">
                        <div className="auth__welcome-logo">
                            <img src="/Images/logo.png" alt="" />
                        </div>
                        <h6 className="auth__welcome-subtitle">
                            Your All-in-One <br />
                            Social Network
                        </h6>
                        <div className="auth__welcome-body">
                            <img
                                src="/Images/authwelcome.png"
                                alt=""
                                className="auth__welcome-body-img"
                            />
                            <div className="auth__welcome-body-bg">
                                <img
                                    src="/Images/welcomebg.png"
                                    alt=""
                                    className="auth__welcome-body-bg--img"
                                />
                            </div>
                        </div>
                        <div className="auth__welcome-buttons">
                            <button
                                className="auth__welcome-buttons-button"
                                onClick={() => toLogin(true)}
                            >
                                Log In
                            </button>
                            <button
                                className="auth__welcome-buttons-button auth__welcome-buttons-button--inheritbody"
                                onClick={() => toLogin(false)}
                            >
                                Sign Up
                            </button>
                        </div>

                        <div className="auth__devider">
                            <div className="auth__devider-line" />
                            <h5 className="auth__devider-text">Enter via</h5>
                            <div className="auth__devider-line" />
                        </div>
                        <div className="auth__messenger">
                            <button
                                onClick={() =>
                                    hendlerAuthMessenger(METHOD_AUTH.GOOGLE)
                                }
                            >
                                <IconGoogle />
                            </button>
                            <button
                                onClick={() =>
                                    hendlerAuthMessenger(METHOD_AUTH.FACEBOOK)
                                }
                            >
                                <IconFacebook />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
