import { Route, Routes } from "react-router-dom"
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

export const ProfileInfo = () => {
    return (
        <div className="profileinfo">
            <ProfileInfoHeader />
            <div className="profileinfo__edit">
                <Routes>
                    <Route path="logout" element={<ProfileSettings />} />
                    
                    <Route path="privacypolicy" element={<ProfileInfoPrivacyPolicy />} />
                    <Route path="termsofservice" element={<ProfileInfoTermsOfService />} />
                    <Route path="aboutneightborharbor" element={<ProfileInfoAboutNH />} />

                    <Route path="helpsupport" element={<ProfileInfoHelpCenter />} />
                    <Route path="privacy" element={<ProfileSettings />} />
                    <Route path="notifications" element={<ProfileSettings />} />
                    <Route path="interestsskills" element={<ProfileInfoSkillsInterests />} />
                    <Route path="bookmark" element={<ProfileSettings />} />
                    <Route path="security" element={<ProfileInfoSecurity />} />
                    <Route path="edit" element={<ProfileInfoEdit />} />
                    <Route path="settings" element={<ProfileSettings />} />
                    <Route path="*" element={<ProfileInfoView />} />
                </Routes>
            </div>

        </div>
    )
}
