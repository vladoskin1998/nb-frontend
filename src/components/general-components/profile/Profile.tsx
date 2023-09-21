import React from "react"
import { ButtonBackRoute } from "../../ui/ButtonBackRoute"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { ProfileInfo } from "../profile-info/ProfileInfo"
import { ProfilePicture } from "./ProfilePicture"
import { ProfileInterestZone } from "./ProfileInterestZone"
import { ProfileSetupInterestZone } from "./ProfileSetupInterestZone"

export const Profile = () => {
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
                <Route path="setup-interest-zone" element={<ProfileSetupInterestZone/>}/>
                <Route path="interest-zone" element={<ProfileInterestZone/>} />
                <Route path="picture-picture" element={<ProfilePicture />} />
                <Route
                    path="*"
                    element={
                        false ? (
                            <Navigate to="/admin/profileinfo" />
                        ) : (
                            <ProfilePicture />
                        )
                    }
                />
            </Routes>
        </div>
    )
}
