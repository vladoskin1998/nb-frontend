import { useState, useEffect } from "react"
import { CodeInput } from "../../ui/CodeInput"
import { AuthHttp } from "../../../http/auth"
import { useNavigate, useSearchParams } from "react-router-dom"
import { METHOD_FORGET_PASSWORD } from "../../../types/enum"

const CheckCode = ({ email, phone }: { email: string; phone: string }) => {
    const [code, setCode] = useState("")
    const [seconds, setSeconds] = useState(30)
    const [showResendButton, setShowResendButton] = useState(false)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        handleResendClick()
    }, [])

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
        const sendMethod: string =
        searchParams.get("method")  || METHOD_FORGET_PASSWORD.EMAIL
        await AuthHttp.regenereteCodeByEmail({
            email,
            sendMethod: sendMethod as METHOD_FORGET_PASSWORD,
        })
        setShowResendButton(false)
    }

    const handlerCheckedCode = async () => {
        const res = await AuthHttp.forgetPassword({
            email,
            code: Number(code),
        })
        navigate(`/forget-pass/change-password?hash=${res.hashPassword}`)
    }

    return (
        <div className="forget__phone">
            <h4 className="forget__title">Verification code</h4>
            <h5 className="forget__subtitle">
                Please enter the confirmation code from the received message
            </h5>
            <CodeInput change={setCode} />
            <button className="forget__phone-but" onClick={handlerCheckedCode}>
                Submit
            </button>
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
    )
}

export default CheckCode
