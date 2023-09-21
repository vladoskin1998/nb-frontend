import { ReactElement, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../utils/hooks"

const ProtectedRoute = ({ element }: { element: ReactElement }) => {
    const navigate = useNavigate()
    const { isAuth } = useAppSelector((s) => s.authReducer)
    const { isLocationVerify } = useAppSelector((s) => s.profileReducer)

    useEffect(() => {
        if (!isLocationVerify && isAuth) {
            navigate(`/location`)
        } else if (!isAuth) {
            navigate(`/auth`)
        } 
    }, [isAuth])

    return isAuth ? element : null
}

export default ProtectedRoute
