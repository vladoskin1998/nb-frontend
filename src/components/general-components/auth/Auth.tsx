import { useEffect, useState } from "react"
import Login from "./Login"
import Registration from "./Registration"
import AuthHeader from "./AuthHeader"
import { authorization } from "../../../services/auth"
import { METHOD_AUTH } from "../../../types/enum"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { useNavigate } from "react-router-dom"
import { Loader } from "../../ui/Loader"
import { WelcomeLogo } from "../welcome/WelcomeItems"

interface PayloadInterface {
    method: METHOD_AUTH
    email: string
    password: string
    fullName?: string
}

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")

    const dispatch = useAppDispatch()

    const { isLoad } = useAppSelector((s) => s.authReducer)
    const [isMessengerLoad, setIsMessengerLogo] = useState(false)

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
        const authLoaderMethod = localStorage.getItem('authLoaderMethod')
        if(authLoaderMethod && authLoaderMethod === 'true'){
            setIsMessengerLogo(true)
        }

        setTimeout(() => {
            setIsMessengerLogo(false)
            localStorage.removeItem('authLoaderMethod')
            alert('auth method google or facebook not found')
        }, 12000)
        
        return () => {
            localStorage.removeItem('authLoaderMethod')
        }
    }, [])

    return (
        <>
            {isLoad || isMessengerLoad ? (
                <WelcomeLogo />
            ) : (
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
            )}
                
            
        </>
    )
}

export default Auth
