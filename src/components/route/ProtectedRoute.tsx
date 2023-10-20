import { ReactElement, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../utils/hooks"

const ProtectedRoute = ({ element }: { element: ReactElement }) => {
    const navigate = useNavigate()
    const { isAuth } = useAppSelector((s) => s.authReducer)
    const accessToken = localStorage.getItem("accessToken")

    if (!isAuth && !accessToken) {
        navigate(`/auth`)
    }

    return isAuth ? element : null
}

export default ProtectedRoute
