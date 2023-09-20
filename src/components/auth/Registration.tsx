import { useState } from "react"
import { InputPassword } from "../ui/InputPassword"
import { CheckBox } from "../ui/CheckBox"
import { InputMain } from "../ui/InputMain"
import {
    inNotEmpty,
    isEmailOrPhonePattern,
    isPasswordPattern,
} from "../../utils/patterns"

const Registration = ({
    login,
    setLogin,
    password,
    setPassword,
    fullName,
    setFullName,
    handlerAuth,
}: {
    login: string
    setLogin: (s: string) => void
    password: string
    setPassword: (s: string) => void
    fullName: string
    setFullName: (s: string) => void
    handlerAuth: () => void
}) => {
    const [checked, setChecked] = useState(true)
    const [validation, setValidation] = useState({
        // login: false,
        // password: false,
        // fullName: false,
        login:new RegExp(isEmailOrPhonePattern).test(login),
        password: new RegExp(isPasswordPattern).test(password),
        fullName: new RegExp(inNotEmpty).test(fullName)
    })

    console.log(validation);
    

    return (
        <>
            <div className="registration">
                <InputMain
                    value={login}
                    setValue={setLogin}
                    placeholder={"Email or Phone"}
                    errorMessage={
                        "Invalid login, +380000000000, example@example.example"
                    }
                    pattern={isEmailOrPhonePattern}
                    isValidated={validation.login}
                    setIsValidated={(s: boolean) =>
                        setValidation({ ...validation, login: s })
                    }
                />
                <InputMain
                    value={fullName}
                    setValue={setFullName}
                    placeholder={"Full Name"}
                    errorMessage={"Еhe name must be"}
                    pattern={inNotEmpty}
                    isValidated={validation.fullName}
                    setIsValidated={(s: boolean) =>
                        setValidation({ ...validation, fullName: s })
                    }
                />
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
                <div className="registration__policy">
                    <CheckBox click={() => setChecked((s) => !s)} />
                    <div>
                        <p>By Signing up, you agree to the</p>
                        <p>
                            <b> Terms of Service</b> and <b>Privacy Policy</b>
                        </p>
                    </div>
                </div>
            </div>
            <button
                className={`login__button
                ${ 
                    (validation.login && validation.password && validation.fullName) || "login__button--disabled"
                }
            `}
                onClick={handlerAuth}
                disabled={!(validation.login && validation.password  && validation.fullName)}
            >
                Log In
            </button>
        </>
    )
}

export default Registration
