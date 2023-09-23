import React from "react"
import { ButtonBackRoute } from "../../ui/ButtonBackRoute"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { ProfileInfo } from "../profile-info/ProfileInfo"
import { ProfilePicture } from "./ProfilePicture"
import { ProfileInterestZone } from "./ProfileInterestZone"
import { ProfileSetupInterestZone } from "./ProfileSetupInterestZone"
import { ProfilePrivacy } from "./ProfilePrivacy"
import { ProfileAbout } from "./ProfileAbout"
import { ProfoleIdentity } from "./ProfoleIdentity"
import { ProfileTitle } from "./ProfileTitle"
import { ProfileCertificates } from "./ProfileCertificates"
import { ProfileBirth } from "./ProfileBirth"


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
            <ProfileTitle />
            <Routes>
                <Route path="nationality" element={<ProfoleIdentity quality={"Nationality"} nextRoute={"Nationality"} isMultiple={false}/>}/>
                <Route path="birth" element={<ProfileBirth/>}/>
                <Route path="certificates" element={<ProfileCertificates/>}/>
                <Route path="interests" element={<ProfoleIdentity quality={"Interests"} nextRoute={"certificates"}/>}/>
                <Route path="skills" element={<ProfoleIdentity quality={"Skills"} nextRoute={"Interests"}/>}/>
                <Route path="profession" element={<ProfoleIdentity quality={"Profession"} nextRoute={"Skills"}/>}/>
                <Route path="about" element={<ProfileAbout/>}/>
                <Route path="privacy" element={<ProfilePrivacy/>}/>
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
