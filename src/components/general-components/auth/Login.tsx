import { useState } from "react"
import { InputPassword } from "../../ui/InputPassword"
import { useNavigate } from "react-router-dom"
import { CheckBox } from "../../ui/CheckBox"
import { InputMain } from "../../ui/InputMain"
import { emailPattern, isPasswordPattern } from "../../../utils/patterns"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../../utils/hooks"
import { changeAuthError } from "../../../reducer/auth"
const Login = ({
    login,
    setLogin,
    password,
    setPassword,
    handlerAuth,
}: {
    login: string
    setLogin: (s: string) => void
    password: string
    setPassword: (s: string) => void
    handlerAuth: () => void
}) => {
    const { authError } = useAppSelector((s) => s.authReducer)
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(true)
    const navigate = useNavigate()

    const forgetPass = () => {
        navigate(`forget-pass?emailAddress=${login}`)
    }

    const [validation, setValidation] = useState({
        login: new RegExp(emailPattern).test(login),
        password: new RegExp(isPasswordPattern).test(password),
    })

    return (
        <>
            <div className="login">
                <InputMain
                    value={login}
                    setValue={(s) => {
                        setLogin(s)
                        if(authError && authError !== "Bad password" ){
                            dispatch(changeAuthError(""))
                        }
                    }}
                    placeholder={"Email"}
                    errorMessage={
                        authError && authError !== "Bad password"
                            ? authError
                            : "Invalid login example@example.example"
                    }
                    pattern={emailPattern}
                    isValidated={authError !== "Bad password" ? !Boolean(authError) : true}
                    setIsValidated={(s: boolean) =>
                        setValidation({ ...validation, login: s })
                    }
                />
                <div className="login__password">
                    <InputPassword
                        password={password}
                        setPassword={(s) => {
                            setPassword(s)
                            if(authError && authError === "Bad password" ){
                                dispatch(changeAuthError(""))
                            }
                        }}
                        errorMessage={
                            authError && authError === "Bad password"
                                ? authError
                                : "Invalid password, min 8, numbers and letters"
                        }
                        pattern={isPasswordPattern}
                        isValidated={authError === "Bad password" ? !Boolean(authError) : true}
                        setIsValidated={(s: boolean) =>
                            setValidation({ ...validation, password: s })
                        }
                    />
                </div>
                <div className="login__forgot">
                    <CheckBox click={() => setChecked((s) => !s)} />
                    <button className="login__forgot">
                        Remember me
                    </button>
                    <button disabled={!(validation.login)} onClick={forgetPass}
                        className={`${!validation.login && "login__forgot-but--active"}`}
                    >
                        Forget password?
                    </button>
                </div>
            </div>
            <button
                className={`login__button
                ${
                    validation.login && validation.password
                        ? ""
                        : "login__button--disabled"
                }
            `}
                onClick={handlerAuth}
                disabled={!(validation.login && validation.password)}
            >
                Log In
            </button>
        </>
    )
}

export default Login
