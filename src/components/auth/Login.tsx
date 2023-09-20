import { useState } from "react"
import { InputPassword } from "../ui/InputPassword"
import { useNavigate } from "react-router-dom"
import { CheckBox } from "../ui/CheckBox"
import { InputMain } from "../ui/InputMain"
import { isEmailOrPhonePattern, isPasswordPattern } from "../../utils/patterns"

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
    const [checked, setChecked] = useState(true)
    const navigate = useNavigate()

    const forgetPass = () => {
        navigate("forget-pass")
    }

    const [validation, setValidation] = useState({
        login: false,
        password: false,
    })

    console.log(validation);
    

    return (
        <>
            <div className="login">
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
                <div className="login__password">
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
                </div>
                <div className="login__forgot">
                    <CheckBox click={() => setChecked((s) => !s)} />
                    <button className="login__forgot-but">Remember me</button>
                    <button onClick={forgetPass}>Forget password?</button>
                </div>
            </div>
            <button
                className={`login__button
                ${ 
                    (validation.login && validation.password) || "login__button--disabled"
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
