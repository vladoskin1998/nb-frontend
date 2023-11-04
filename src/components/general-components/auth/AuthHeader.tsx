import { METHOD_AUTH } from "../../../types/enum"
import { baseURL } from "../../../utils/config"
import { IconFacebook } from "../../svg/IconFacebook"
import { IconGoogle } from "../../svg/IconGoogle"

const AuthHeader = ({
    isLogin,
    setIsLogin,
}: {
    isLogin: boolean
    setIsLogin: (b: boolean) => void
}) => {

    const hendlerAuthMessenger = (
        method: METHOD_AUTH.FACEBOOK | METHOD_AUTH.GOOGLE
    ) => {
        window.location.href = `https://environs.life/api/auth/${method}`
    }

    return (
        <>
            <h4 className="auth__title">Neighbor Harbor</h4>
            <h5 className="auth__subtitle">
                {isLogin
                    ? "Log in to your Neighbor Harbor account"
                    : "Set up your Neighbor Harbor account"}
            </h5>
            <div className="auth__tab">
                <button
                    className={`auth__tab-but ${
                        !isLogin ? "auth__tab--pas" : ""
                    }`}
                    onClick={() => setIsLogin(true)}
                >
                    Login
                </button>
                <button
                    className={`auth__tab-but ${
                        isLogin ? "auth__tab--pas" : ""
                    }`}
                    onClick={() => setIsLogin(false)}
                >
                    Create Account
                </button>
                <div
                    className={`auth__tab-border ${
                        isLogin ? "auth__tab-border--l" : "auth__tab-border--r"
                    }`}
                />
            </div>
            <div className="auth__messenger">
                <button
                    onClick={() => hendlerAuthMessenger(METHOD_AUTH.GOOGLE)}
                >
                    <IconGoogle />
                </button>
                <button
                    onClick={() => hendlerAuthMessenger(METHOD_AUTH.FACEBOOK)}
                >
                    <IconFacebook />
                </button>
            </div>
            <div className="auth__devider">
                <div className="auth__devider-line" />
                <h5 className="auth__devider-text">
                    {isLogin ? "Login" : "Registration"}
                </h5>
                <div className="auth__devider-line" />
            </div>
        </>
    )
}

export default AuthHeader
