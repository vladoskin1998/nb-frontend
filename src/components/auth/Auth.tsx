import { useState } from 'react'
import Login from './Login'
import Registration from './Registration'
import AuthHeader from './AuthHeader'

const Auth = () => {

    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className='auth'>
            <AuthHeader isLogin={isLogin} setIsLogin={setIsLogin} />
            {
                isLogin
                    ? <Login />
                    : <Registration />
            }
            <button className='login__button'>
                {isLogin ? "Log In" : "Sign Up"}
            </button>
        </div>
    )
}

export default Auth

