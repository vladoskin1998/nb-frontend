import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { METHOD_FORGET_PASSWORD } from "../../../types/enum"

const Recovery = () => {
    const navigate = useNavigate()
    const [method, setMethod] = useState(METHOD_FORGET_PASSWORD.EMAIL)
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const methodForgot =
            searchParams.get("method") || METHOD_FORGET_PASSWORD.EMAIL
        setMethod(methodForgot as METHOD_FORGET_PASSWORD)
    }, [])

    const toCheckCode = () => {
        navigate(`/forget-pass/code?method=${method}`)
    }

    return (
        <>
            <h4 className="forget__title">Forgot Password</h4>
            <h5 className="forget__subtitle">
                Select which contact details should we use to reset your
                password
            </h5>
            <div className="forget__body-img">
                <img src="/Images/Megapone.png" alt="" />
            </div>
            <div className="forget__buttons">
                <button
                    className="forget__email-but1 forget__email-but1--white"
                    onClick={toCheckCode}
                >
                    Change Password
                </button>
                <button
                    className="forget__email-but2"
                    onClick={() => navigate("/auth")}
                >
                    Back to Login In
                </button>
            </div>
        </>
    )
}

export default Recovery
