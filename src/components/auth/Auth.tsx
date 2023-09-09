import { useEffect, useState } from 'react'
import Login from './Login'
import Registration from './Registration'
import AuthHeader from './AuthHeader'
import { authorization } from '../../services/auth-service'
import { METHOD_AUTH } from '../../types/enum'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { useNavigate } from 'react-router-dom'

const Auth = () => {

    const [isLogin, setIsLogin] = useState(true)
    const [login, setLogin] = useState("test@test.test")
    const [password, setPassword] = useState("test")
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { isAuth, payloadUser } = useAppSelector((s: any) => s.authReducer)

    const handlerAuth = (method: METHOD_AUTH) => {
        dispatch(
            authorization(
                {
                    method,
                    email: login,
                    password
                }
            )
        )
    }

    useEffect(() => {
        if (isAuth) {
            console.log("isAuth", isAuth);

            //     navigate(`/${payloadUser.role}`)
            navigate(`/admin`)
        }
        else {
            navigate(`/auth`)
        }
    }, [isAuth])

    // useEffect(() => {
    //     setLogin('')
    //     setPassword('')
    // }, [isLogin])

    return (
        <div className='auth'>
            <AuthHeader 
                isLogin={isLogin} 
                setIsLogin={setIsLogin} 
            />
            {
                isLogin
                    ? <Login login={login} setLogin={setLogin} password={password} setPassword={setPassword} />
                    : <Registration login={login} setLogin={setLogin} password={password} setPassword={setPassword} />
            }
            <button className='login__button' onClick={() => handlerAuth(isLogin ? METHOD_AUTH.LOGIN : METHOD_AUTH.REGISTRATION,)}>
                {isLogin ? "Log In" : "Sign Up"}
            </button>
        </div>
    )
}

export default Auth

function dispatch(arg0: any) {
    throw new Error('Function not implemented.')
}

