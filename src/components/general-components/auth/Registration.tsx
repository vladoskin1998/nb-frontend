import { useState } from "react"
import { InputPassword } from "../../ui/InputPassword"
import { CheckBox } from "../../ui/CheckBox"
import { InputMain } from "../../ui/InputMain"
import {
    inNotEmpty,
    emailPattern,
    isPasswordPattern,
} from "../../../utils/patterns"
import { useAppSelector } from "../../../utils/hooks"
import { changeAuthError } from "../../../reducer/auth"
import { useDispatch } from "react-redux"
import { AuthModalAgree } from "./AuthModalAgree"
import { AUTH_AGREE_TYPES } from "../../../types/enum"

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
    const { authError } = useAppSelector((s) => s.authReducer)
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [validation, setValidation] = useState({
        login: new RegExp(emailPattern).test(login),
        password: new RegExp(isPasswordPattern).test(password),
        confirmPassword: new RegExp(`^${password}$`).test(confirmPassword),
        fullName: true,
    })

    const [isOpenTerms, setIsOpenTerms] = useState(false)
    const [isOpenPolicy, setIsOpenPolicy] = useState(false)

    
    const disabledSingUp =
        checked &&
        validation.login &&
        validation.password &&
        validation.fullName &&
        confirmPassword === password 

    return (
        <>
            <div className="registration">
                <InputMain
                    value={login}
                    setValue={(s) => {
                        setLogin(s)
                        dispatch(changeAuthError(""))
                    }}
                    placeholder={"Email"}
                    errorMessage={
                        authError
                            ? authError
                            : "Invalid login, example@example.example"
                    }
                    pattern={emailPattern}
                    isValidated={!Boolean(authError)}
                    setIsValidated={(s: boolean) =>
                        setValidation({ ...validation, login: s })
                    }
                />
                <InputMain
                    value={fullName}
                    setValue={setFullName}
                    placeholder={"Full Name"}
                    errorMessage={"The name must be"}
                    pattern={inNotEmpty}
                    isValidated={Boolean(validation.fullName)}
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
                    setIsValidated={(s: boolean) =>
                        setValidation({ ...validation, password: s })
                    }
                />

                <InputPassword
                    password={confirmPassword}
                    setPassword={setConfirmPassword}
                    errorMessage={"Password mismatch"}
                    pattern={`^${password}$`}
                    setIsValidated={(s: boolean) =>
                        setValidation({ ...validation, confirmPassword: s })
                    }
                />

                <div className="registration__policy">
                    <CheckBox click={() => setChecked(s => !s)} defaultChecked={checked}/>
                    <div>
                        <p>By Signing up, you agree to the</p>
                        <p>
                            <b onClick={() => setIsOpenTerms(true)}>
                                {" "}
                                Terms of Service{" "}
                            </b>
                            and
                            <b onClick={() => setIsOpenPolicy(true)}>
                                {" "}
                                Privacy Policy
                            </b>
                        </p>
                    </div>
                    <AuthModalAgree
                        isOpen={isOpenTerms}
                        setIsOpen={setIsOpenTerms}
                        typeAgree={AUTH_AGREE_TYPES.TERMS}
                    />
                    <AuthModalAgree
                        isOpen={isOpenPolicy}
                        setIsOpen={setIsOpenPolicy}
                        typeAgree={AUTH_AGREE_TYPES.POLICY}
                    />
                </div>
            </div>
            <button
                className={`login__button
                ${disabledSingUp || "login__button--disabled"}
            `}
                onClick={handlerAuth}
                disabled={!disabledSingUp}
            >
                Sing Up
            </button>
        </>
    )
}

export default Registration
