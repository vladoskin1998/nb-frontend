import { ReactElement, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../utils/hooks"

const ProtectedRoute = ({ element }: { element: ReactElement }) => {
    const navigate = useNavigate()
    const { isAuth } = useAppSelector((s) => s.authReducer)
    const { isLocationVerify } = useAppSelector((s) => s.userReducer)

    useEffect(() => {
        // if (!isLocationVerify ){
        //   navigate("/auth/location");
        // }
        // else if (!isAuth) {
        //   navigate("/auth");
        // }

        if (!isAuth) {
            navigate("/auth")
        }
        
    }, [isAuth, navigate])

    return isAuth ? element : null
}

export default ProtectedRoute
