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

    const [login, setLogin] = useState("test@test.test")
    const [password, setPassword] = useState("test")
    const [fullName, setFullName] = useState("")

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { isAuth, payloadUser, isLoad } = useAppSelector((s) => s.authReducer)

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
        // if (
        //     (payloadUser.coordinars.lat === null ||
        //         payloadUser.coordinars.lng === null) &&
        //     isAuth
        // ) {
        //     navigate(`/location`)
        // } else if (isAuth) {
        //     navigate(`/admin`)
        // } else {
        //     navigate(`/auth`)
        // }

        if (isAuth) {
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
                        />
                    ) : (
                        <Registration
                            login={login}
                            setLogin={setLogin}
                            password={password}
                            setPassword={setPassword}
                            fullName={fullName}
                            setFullName={setFullName}
                        />
                    )}
                    <button className="login__button" onClick={handlerAuth}>
                        {isLogin ? "Log In" : "Sign Up"}
                    </button>
                </div>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default Auth
