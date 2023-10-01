import { Route, Routes } from "react-router-dom"
import { ProfileInfoHeader } from "./ProfileInfoHeader"
import { ProfileInfoView } from "./ProfileInfoView"
import { ProfileSettings } from "./ProfileSettings"
import { ProfileInfoEdit } from "./ProfileInfoEdit"
import { ProfileInfoSecurity } from "./ProfileInfoSecurity"
import { ProfileInfoSkillsInterests } from "./ProfileInfoSkillsInterests"

export const ProfileInfo = () => {
    return (
        <div className="profileinfo">
            <ProfileInfoHeader />
            <div className="profileinfo__edit">
                <Routes>
                    <Route path="logout" element={<ProfileSettings />} />
                    <Route path="aboutneightborharbor" element={<ProfileSettings />} />
                    <Route path="helpsupport" element={<ProfileSettings />} />
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
