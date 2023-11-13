import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom"
import { ButtonBackRoute } from "../../ui/ButtonBackRoute"
import { IconsChat, IconsMessage } from "../../svg/IconsResetPass"
import CheckCode from "./CheckCode"
import Recovery from "./Recovery"
import { useEffect, useState } from "react"
import ChangePassword from "./ChangePassword"
import { AuthHttp } from "../../../http/auth"
import { METHOD_FORGET_PASSWORD } from "../../../types/enum"

const ForgetPass = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [searchParams] = useSearchParams()

    const back = () => {
        navigate(-1)
    }

    useEffect(() => {
        const effectBody = async () => {
            const email = searchParams.get("emailAddress") || ""
            const res = await AuthHttp.getPhone({ email })
            setEmail(res.email)
            setPhone(res.phone)
        }

        effectBody()
    }, [])

    return (
        <div className="forget">
            <div className="forget__back">
                <ButtonBackRoute click={back} />
            </div>
            <Routes>
                <Route
                    path="change-password"
                    element={<ChangePassword email={email} />}
                />
                <Route
                    path="code"
                    element={<CheckCode email={email} phone={phone} />}
                />
                <Route path="recovery" element={<Recovery />} />
                <Route
                    path="*"
                    element={<ForgetPassBody email={email} phone={phone} />}
                />
            </Routes>
        </div>
    )
}

export default ForgetPass

const ForgetPassBody = ({ email, phone }: { email: string; phone: string }) => {
    const navigate = useNavigate()
    const [method, setMethod] = useState<METHOD_FORGET_PASSWORD>(
        METHOD_FORGET_PASSWORD.PHONE
    )

    const toNav = () => {
        navigate(`/forget-pass/recovery/?method=${method}`)
    }

    return (
        <>
            <h4 className="forget__title">Forgot Password</h4>
            <h5 className="forget__subtitle">
                Select which contact details should we use to reset your
                password
            </h5>
            <div className="forget__body-img">
                <img src="/Images/YellowKey.png" alt="" />
            </div>
            { phone && <div
                className={`forget__body-method ${
                    method === METHOD_FORGET_PASSWORD.PHONE
                        ? "forget__body-method--active"
                        : ""
                }`}
                onClick={() => {
                    setMethod(METHOD_FORGET_PASSWORD.PHONE)
                }}
            >
                <div className="forget__body-method-icon">
                    <IconsChat />
                </div>
                <div>
                    <p className="forget__body-method-title">via SMS:</p>
                    <p className="forget__body-method-subtitle">{phone}</p>
                </div>
            </div>}
            <div
                className={`forget__body-method-2 forget__body-method ${
                    method === "email" ? "forget__body-method--active" : ""
                }`}
                onClick={() => {
                    setMethod(METHOD_FORGET_PASSWORD.EMAIL)
                }}
            >
                <div className="forget__body-method-icon">
                    <IconsMessage />
                </div>
                <div>
                    <p className="forget__body-method-title">via Email:</p>
                    <p className="forget__body-method-subtitle">{email}</p>
                </div>
            </div>
            <button className="login__button" onClick={toNav}>
                Reset Password
            </button>
        </>
    )
}
