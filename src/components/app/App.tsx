import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Auth from "../general-components/auth/Auth"
import ForgetPass from "../general-components/forgot-pass/ForgetPass"
import LocationUser from "../general-components/location/Location"
import AdminRouter from "../route/AdminRouter"

import { Profile } from "../general-components/profile/Profile"
import { AppContextProvider } from "../../context/AppContext"
import { ProfileInfo } from "../general-components/profile-info/ProfileInfo"
import ProtectedRoute from "../route/ProtectedRoute"
import { SocketContextProvider } from "../../context/SocketContext"
import UserRouter from "../route/UserRouter"
import { Publish } from "../general-components/publication/Publish"
import { AuthRegistrationConfirm } from "../general-components/auth/AuthRegistrationConfirm"
import { AuthRegistrationConfirmCode } from "../general-components/auth/AuthRegistrationConfirmCode"
import { Welcome } from "../general-components/welcome/Welcome"

export default function App() {
    const isWelcome = localStorage.getItem("isWelcome")
    return (
        <AppContextProvider>
            <SocketContextProvider>
                <Routes>
                    {!isWelcome && isWelcome !== "true" ? (
                        <>
                            <Route path="/welcome/*" element={<Welcome />} />
                            <Route
                                path="*"
                                element={<Navigate to="/welcome" />}
                            />
                        </>
                    ) : (
                        <>
                            <Route path="/admin/*" element={<AdminRouter />} />

                            <Route path="/user/*" element={<UserRouter />} />

                            <Route
                                path="/publish/*"
                                element={
                                    <ProtectedRoute element={<Publish />} />
                                }
                            />

                            <Route
                                path="/profileinfo/*"
                                element={
                                    <ProtectedRoute element={<ProfileInfo />} />
                                }
                            />

                            <Route
                                path="/profile/*"
                                element={
                                    <ProtectedRoute element={<Profile />} />
                                }
                            />

                            <Route
                                path="/location/*"
                                element={
                                    <ProtectedRoute
                                        element={<LocationUser />}
                                    />
                                }
                            />

                            <Route
                                path="/forget-pass/*"
                                element={<ForgetPass />}
                            />

                            <Route path="/auth">
                                <Route
                                    path="confirm-code"
                                    element={<AuthRegistrationConfirmCode />}
                                />
                                <Route
                                    path="confirm"
                                    element={<AuthRegistrationConfirm />}
                                />
                                <Route path="" element={<Auth />} />
                            </Route>

                            <Route path="*" element={<Navigate to="/auth" />} />
                        </>
                    )}
                </Routes>
            </SocketContextProvider>
        </AppContextProvider>
    )
}
