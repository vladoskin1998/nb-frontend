import { Navigate, Route, Routes } from "react-router-dom"
import { ProfilePicture } from "./ProfilePicture"
import { ProfileInterestZone } from "./ProfileInterestZone"
import { ProfileSetupInterestZone } from "./ProfileSetupInterestZone"
import { ProfilePrivacy } from "./ProfilePrivacy"
import { ProfileAbout } from "./ProfileAbout"
import { ProfileTitle } from "./ProfileTitle"
import { ProfileCertificates } from "./ProfileCertificates"
import { ProfileBirth } from "./ProfileBirth"
import { ProfileSex } from "./ProfileSex"
import { ProfileEducation } from "./ProfileEducation"
import { ProfileFamilyStatus } from "./ProfileFamilyStatus"
import { ProfileStayTouch } from "./ProfileStayTouch"
import { ProfileButtonBack } from "./ProfileButtonBack"
import { ProfileWelcomeNeibs } from "./ProfileWelcomeNeibs"
import { Loader } from "../../ui/Loader"
import { useAppSelector } from "../../../utils/hooks"
import { ProfoleIdentityModule } from "./ProfoleIdentityModule"
import { QUALITYENUM } from "../../../types/enum"
import { toOneKind } from "../../../utils/titles"


export const Profile = () => {

    const {isLoad} = useAppSelector(s => s.profileReducer)
    const { isGotAllProfileInfo } = useAppSelector((s) => s.profileReducer)
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
                <Route path="nationality" element={<ProfoleIdentityModule quality={QUALITYENUM.NATIONALITY} isLimit={-3} nextRoute={`/profile/${toOneKind("sex")}` }/> }/>
                <Route path="birth" element={<ProfileBirth/>}/>
                <Route path="certificates" element={<ProfileCertificates/>}/>
                <Route path="interests" element={<ProfoleIdentityModule quality={QUALITYENUM.INTERESTS} nextRoute={`/profile/${toOneKind("certificates")}` }/>}/>
                <Route path="skills" element={<ProfoleIdentityModule quality={QUALITYENUM.SKILLS} nextRoute={ `/profile/${toOneKind("Interests")}`}/>}/>
                <Route path="profession" element={<ProfoleIdentityModule quality={QUALITYENUM.PROFESSION} nextRoute={`/profile/${toOneKind("Skills")}`} />}/>
                <Route path="about" element={<ProfileAbout/>}/>
                <Route path="privacy" element={<ProfilePrivacy/>}/>
                <Route path="setup-interest-zone" element={<ProfileSetupInterestZone/>}/>
                <Route path="interest-zone" element={<ProfileInterestZone/>} />
                <Route path="picture-picture" element={<ProfilePicture />} />
                <Route
                    path="*"
                    element={
                        isGotAllProfileInfo  ? (
                            <Navigate to="/profileinfo" />
                        ) : (
                            <ProfilePicture />
                        )
                    }
                />
            </Routes>
            {isLoad && <Loader />}
        </div>
    )
}
