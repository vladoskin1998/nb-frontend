import { Route, Routes, useNavigate } from "react-router-dom";
import { ButtonBackRoute } from "../../ui/ButtonBackRoute";
import { IconsChat, IconsMessage } from '../../svg/IconsResetPass'
import RecoveryPhone from "./RecoveryPhone";
import RecoveryEmail from "./RecoveryEmail";
import { useState } from "react";
import ChangePassword from "./ChangePassword";

const ForgetPass = () => {

    const navigate = useNavigate()

    const back = () => {
        navigate(-1)
    }

    return (
        <div className="forget">
            <div className="forget__back">
                <ButtonBackRoute click={back} />
            </div>
            <Routes >
                <Route path='change-password' element={<ChangePassword />} />
                <Route path='phone' element={<RecoveryPhone />} />
                <Route path='email' element={<RecoveryEmail />} />
                <Route path='*' element={<ForgetPassBody />} />
            </Routes>

        </div >
    )
}

export default ForgetPass


const ForgetPassBody = () => {

    const navigate = useNavigate()
    const [method, setMethod] = useState<'phone' | 'email'>('phone')


    const toNav = () => {
        navigate(method)
    }

    return <>
        <h4 className="forget__title">Forgot Password</h4>
        <h5 className="forget__subtitle">Select which contact details should we use to reset your password</h5>
        <div className="forget__body-img">
            <img src="/Images/YellowKey.png" />
        </div>
        <div className={`forget__body-method ${method === "phone" ? "forget__body-method--active" : ""}`} onClick={() => { setMethod('phone') }}>
            <div className="forget__body-method-icon">
                <IconsChat />
            </div>
            <div>
                <p className="forget__body-method-title">via SMS:</p>
                <p className="forget__body-method-subtitle">+1 111 ******99</p>
            </div>
        </div>

        <div className={`forget__body-method ${method === "email" ? "forget__body-method--active" : ""}`} onClick={() => { setMethod('email') }}>
            <div className="forget__body-method-icon">
                <IconsMessage />
            </div>
            <div>
                <p className="forget__body-method-title">via Email:</p>
                <p className="forget__body-method-subtitle">felix...ov@gmail.com</p>
            </div>
        </div>

        <button className="forget__button" onClick={toNav}>Reset Password</button>
    </>
}