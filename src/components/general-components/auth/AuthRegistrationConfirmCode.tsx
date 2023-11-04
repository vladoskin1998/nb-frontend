import React, { useEffect, useState } from "react"
import { CodeInput } from "../../ui/CodeInput"
import { useDispatch } from "react-redux"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { confirmEmail } from "../../../services/auth"
import { AuthHttp } from "../../../http/auth"
import { METHOD_FORGET_PASSWORD } from "../../../types/enum"

export const AuthRegistrationConfirmCode = () => {
    const { email } = useAppSelector((s) => s.userReducer)
    const [code, setCode] = useState("")
    const [seconds, setSeconds] = useState(30)
    const [showResendButton, setShowResendButton] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds((prevSeconds) => prevSeconds - 1)
            } else {
                setSeconds(30)
                setShowResendButton(true)
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [seconds])

    const handleResendClick = async () => {
        await AuthHttp.regenereteCodeByEmail({
            email,
            sendMethod:METHOD_FORGET_PASSWORD.EMAIL
        })
        setShowResendButton(false)
    }

    const handlerCheckedCode = () => {
        dispatch(
            confirmEmail({
                email,
                code: Number(code),
            })
        )
    }

    return (
        <div className="forget">
            <div className="forget__phone">
                <h4 className="forget__title">Verification code</h4>
                <h5 className="forget__subtitle">
                    Please enter the confirmation code from the received message
                </h5>
                <CodeInput change={setCode} />
                <button className="forget__phone-but" onClick={handlerCheckedCode}>Submit</button>
                {showResendButton ? (
                    <button
                        className="forget__phone-but"
                        style={{ marginTop: "25px" }}
                        onClick={handleResendClick}
                    >
                        Create New Code
                    </button>
                ) : (
                    <h6 className="forget__phone-resend">
                        Re-send code in <span>0:{seconds}</span>
                    </h6>
                )}
            </div>
        </div>
    )
}
