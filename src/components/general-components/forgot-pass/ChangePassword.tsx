import { useState } from "react"
import { InputPassword } from "../../ui/InputPassword"
import { isPasswordPattern } from "../../../utils/patterns"
import { AuthHttp } from "../../../http/auth"
import { useNavigate, useSearchParams } from "react-router-dom"
import { success } from "../../ui/LoadSuccess"

const ChangePassword = ({ email }: { email: string }) => {
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [validation, setValidation] = useState({
        password: true,
        passwordRepeat: true,
    })
    const disablde = !new RegExp(isPasswordPattern).test(password) ||
    !new RegExp(isPasswordPattern).test(passwordRepeat)
    || password !== passwordRepeat

    const changePassword = async () => {
        const hashPassword = searchParams.get("hash") || ""
        if (
            disablde
        ) {
            alert("Invalid password, min 8, numbers and letters")
            return
        }
        await AuthHttp.changePassword({
            hashPassword,
            newPassword: password,
            email,
        })
        success()
        navigate("/auth")
    }

    return (
        <>
            <h4 className="forget__title">Reset Password</h4>
            <h5 className="forget__subtitle">
                Create a new secured password for your account
            </h5>
            <div className="forget__password-input">
                <InputPassword
                    password={password}
                    setPassword={setPassword}
                    errorMessage={
                        "Invalid password, min 8, numbers and letters"
                    }
                    pattern={isPasswordPattern}
                    isValidated={validation.password}
                    setIsValidated={(s: boolean) =>
                        setValidation({ ...validation, password: s })
                    }
                />
                <InputPassword
                    password={passwordRepeat}
                    setPassword={setPasswordRepeat}
                    errorMessage={
                        "Invalid password, min 8, numbers and letters"
                    }
                    pattern={isPasswordPattern}
                    isValidated={validation.passwordRepeat}
                    setIsValidated={(s: boolean) =>
                        setValidation({ ...validation, passwordRepeat: s })
                    }
                />
            </div>
            <button
                className={`login__button
                ${
                    disablde && "login__button--disabled"
                }
            `}
                onClick={changePassword}
                disabled={disablde}
            >
    
                Action Button
            </button>
        </>
    )
}

export default ChangePassword
