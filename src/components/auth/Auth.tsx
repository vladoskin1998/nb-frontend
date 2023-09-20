import { useEffect, useState } from "react"
import Login from "./Login"
import Registration from "./Registration"
import AuthHeader from "./AuthHeader"
import { authorization } from "../../services/auth"
import { METHOD_AUTH } from "../../types/enum"
import { useAppDispatch, useAppSelector } from "../../utils/hooks"
import { useNavigate } from "react-router-dom"
import { Loader } from "../ui/Loader"

interface PayloadInterface {
    method: METHOD_AUTH
    email: string
    password: string
    fullName?: string
}

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)

    const [login, setLogin] = useState("test2000@test.test")
    const [password, setPassword] = useState("test2000")
    const [fullName, setFullName] = useState("test2000")

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { isAuth, isLoad } = useAppSelector((s) => s.authReducer)
    const {isLocationVerify } = useAppSelector((s) => s.userReducer)

    const handlerAuth = () => {
        const method = isLogin ? METHOD_AUTH.LOGIN : METHOD_AUTH.REGISTRATION
        const payload: PayloadInterface = {
            method,
            email: login,
            password,
        }
        if (method === METHOD_AUTH.REGISTRATION) {
            payload.fullName = fullName
        }
        dispatch(authorization(payload))
    }

    useEffect(() => {
        if (
            !isLocationVerify &&
            isAuth
        ) {
            navigate(`/location`)
        } else if (isAuth) {
            navigate(`/admin`)
        } else {
            navigate(`/auth`)
        }        
    }, [isAuth])

    return (
        <>
            {!isLoad ? (
                <div className="auth">
                    <AuthHeader isLogin={isLogin} setIsLogin={setIsLogin} />
                    {isLogin ? (
                        <Login
                            login={login}
                            setLogin={setLogin}
                            password={password}
                            setPassword={setPassword}
                            handlerAuth={handlerAuth}
                        />
                    ) : (
                        <Registration
                            login={login}
                            setLogin={setLogin}
                            password={password}
                            setPassword={setPassword}
                            fullName={fullName}
                            setFullName={setFullName}
                            handlerAuth={handlerAuth}
                        />
                    )}
                </div>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default Auth
