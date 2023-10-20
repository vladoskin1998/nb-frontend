import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Auth from "../general-components/auth/Auth"
import ForgetPass from "../general-components/auth/forgot-pass/ForgetPass"
import LocationUser from "../general-components/location/Location"
import AdminRouter from "../route/AdminRouter"

import { Profile } from "../general-components/profile/Profile"
import { AppContextProvider } from "../../context/AppContext"
import { ProfileInfo } from "../general-components/profile-info/ProfileInfo"
import ProtectedRoute from "../route/ProtectedRoute"
import { SocketContextProvider } from "../../context/SocketContext"
import UserRouter from "../route/UserRouter"
import { Publish } from "../general-components/publication/Publish"

export default function App() {
    return (
        <AppContextProvider>
            <SocketContextProvider>
                <Routes>
                    <Route path="/admin/*" element={<AdminRouter />} />

                    <Route path="/user/*" element={<UserRouter />} />

                    <Route
                        path="/publish/*"
                        element={<ProtectedRoute element={<Publish />} />}
                    />

                    <Route
                        path="/profileinfo/*"
                        element={<ProtectedRoute element={<ProfileInfo />} />}
                    />

                    <Route
                        path="/profile/*"
                        element={<ProtectedRoute element={<Profile />} />}
                    />

                    <Route
                        path="/location/*"
                        element={<ProtectedRoute element={<LocationUser />} />}
                    />

                    <Route path="/auth">
                        <Route path="forget-pass/*" element={<ForgetPass />} />
                        <Route path="" element={<Auth />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/auth" />} />
                </Routes>
            </SocketContextProvider>
        </AppContextProvider>
    )
}
