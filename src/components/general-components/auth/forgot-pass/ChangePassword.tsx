import { useState } from "react"
import { InputPassword } from "../../../ui/InputPassword"
import { isPasswordPattern } from "../../../../utils/patterns"

const ChangePassword = () => {
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")

    const [validation, setValidation] = useState({
        passwordRepeat: false,
        password: false,
    })

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
            <button className="forget__button">Action Button</button>
        </>
    )
}

export default ChangePassword
