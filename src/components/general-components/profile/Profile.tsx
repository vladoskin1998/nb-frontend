import { Navigate, Route, Routes } from "react-router-dom"
import { ProfilePicture } from "./ProfilePicture"
import { ProfileInterestZone } from "./ProfileInterestZone"
import { ProfileSetupInterestZone } from "./ProfileSetupInterestZone"
import { ProfilePrivacy } from "./ProfilePrivacy"
import { ProfileAbout } from "./ProfileAbout"
import { ProfoleIdentity } from "./ProfoleIdentity"
import { ProfileTitle } from "./ProfileTitle"
import { ProfileCertificates } from "./ProfileCertificates"
import { ProfileBirth } from "./ProfileBirth"
import { ProfileSex } from "./ProfileSex"
import { ProfileEducation } from "./ProfileEducation"
import { ProfileFamilyStatus } from "./ProfileFamilyStatus"
import { ProfileStayTouch } from "./ProfileStayTouch"
import { ProfileButtonBack } from "./ProfileButtonBack"
import { ProfileWelcomeNeibs } from "./ProfileWelcomeNeibs"


export const Profile = () => {

    return (
        <div className="forget">
            <ProfileButtonBack/>
            <ProfileTitle />
            <Routes>
                <Route path="welcome-neibs" element={<ProfileWelcomeNeibs/>}/>
                <Route path="stay-touch" element={<ProfileStayTouch/>}/>
                <Route path="family-status" element={<ProfileFamilyStatus/>}/>
                <Route path="education" element={<ProfileEducation/>}/>
                <Route path="sex" element={<ProfileSex/>}/>
                <Route path="nationality" element={<ProfoleIdentity quality={"Nationality"} nextRoute={"sex"} isMultiple={false}/>}/>
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
