import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Auth from "../general-components/auth/Auth"
import ForgetPass from "../general-components/auth/forgot-pass/ForgetPass"
import LocationUser from "../general-components/location/Location"
import AdminRouter from "../route/AdminRouter"
import { useAppDispatch, useAppSelector } from "../../utils/hooks"
import { useEffect } from "react"
import { refresh } from "../../services/auth"
import {Profile} from "../general-components/profile/Profile"
import { AppContextProvider } from "../../context/AppContext"

export default function App() {
    // const dispatch = useAppDispatch()
    // const { isAuth } = useAppSelector((s) => s.authReducer)
    // const navigate = useNavigate()

    // useEffect(() => {
    //     const accessToken = localStorage.getItem("accessToken")
    //     if (accessToken) {
    //         dispatch(refresh())
    //     }
    // }, [])

    // useEffect(() => {
    //     if (isAuth) {
    //         navigate(`/admin`)
    //     }
    // }, [isAuth])

    return (
        <AppContextProvider>
            <Routes>
                <Route path="/admin/*" element={<AdminRouter />} />

                {/* <Route path='/user/*' /> */}

                <Route path="/profile/*" element={<Profile />} />

                <Route path="/location/*" element={<LocationUser />} />

                <Route path="/auth">
                    <Route path="forget-pass/*" element={<ForgetPass />} />
                    <Route path="" element={<Auth />} />
                </Route>

                <Route path="*" element={<Navigate to="/auth" />} />
            </Routes>
        </AppContextProvider>
    )
}
