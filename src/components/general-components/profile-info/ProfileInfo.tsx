import { Route, Routes, useLocation, useParams } from "react-router-dom"
import { ProfileInfoHeader } from "./ProfileInfoHeader"
import { ProfileInfoView } from "./ProfileInfoView"
import { ProfileSettings } from "./ProfileSettings"
import { ProfileInfoEdit } from "./ProfileInfoEdit"
import { ProfileInfoSecurity } from "./ProfileInfoSecurity"
import { ProfileInfoSkillsInterests } from "./ProfileInfoSkillsInterests"
import { ProfileInfoPrivacyPolicy } from "./ProfileInfoPrivacyPolicy"
import { ProfileInfoTermsOfService } from "./ProfileInfoTermsOfService"
import { ProfileInfoAboutNH } from "./ProfileInfoAboutNH"
import { ProfileInfoHelpCenter } from "./ProfileInfoHelpCenter"
import { UserInitialStateInterface } from "../../../reducer/users"
import { UserIdentityInterface } from "../../../services/profile"
import { ProfileInfoNotification } from "./ProfileInfoNotification"
import { ProfileInfoPrivacy } from "./ProfileInfoPrivacy"
import { ProfileInfoModalProfile } from "./ProfileInfoModalProfile"
import { useAppSelector } from "../../../utils/hooks"

export interface UserItem extends UserInitialStateInterface {
    userIdentity: UserIdentityInterface
}

export const ProfileInfo = () => {

    const location = useLocation();
    const props: UserItem = location.state;
    
    return (
        <div className="profileinfo">
            <ProfileInfoModalProfile />
            <ProfileInfoHeader fullNameUser={props?.fullName} _id={props?._id}/>
            <div className="profileinfo__edit">
                <Routes>
                    <Route path="logout" element={<ProfileSettings />} />
                    <Route path="privacypolicy" element={<ProfileInfoPrivacyPolicy />} />
                    <Route path="termsofservice" element={<ProfileInfoTermsOfService />} />
                    <Route path="aboutneightborharbor" element={<ProfileInfoAboutNH />} />
                    <Route path="helpsupport" element={<ProfileInfoHelpCenter />} />
                    <Route path="privacy" element={<ProfileInfoPrivacy />} />
                    <Route path="notifications" element={<ProfileInfoNotification />} />
                    <Route path="interestsskills" element={<ProfileInfoSkillsInterests />} />
                    <Route path="bookmark" element={<ProfileSettings />} />
                    <Route path="security" element={<ProfileInfoSecurity />} />
                    <Route path="edit" element={<ProfileInfoEdit />} />
                    <Route path="settings" element={<ProfileSettings />} />
                    <Route path="*" element={<ProfileInfoView/>} />
                </Routes>
            </div>

        </div>
    )
}
