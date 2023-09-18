import { useState } from "react"
import { InputPassword } from "../ui/InputPassword"
import { useNavigate } from "react-router-dom"
import { CheckBox } from "../ui/CheckBox"

const Login = ({
    login,
    setLogin,
    password,
    setPassword,
}: {
    login: string
    setLogin: (s: string) => void
    password: string
    setPassword: (s: string) => void
}) => {
    const [checked, setChecked] = useState(true)
    const navigate = useNavigate()

    const forgetPass = () => {
        navigate("forget-pass")
    }

    return (
        <>
            <div className="login">
                <div className="login__email">
                    <input
                        type="text"
                        placeholder="Email"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    {/* <span className="login__email--disabled">nit valid</span> */}
                </div>

                <div className="login__password">
                    <InputPassword
                        password={password}
                        setPassword={setPassword}
                    />
                    {/* <span className="login__email--disabled">not validation password</span> */}
                </div>
                <div className="login__forgot">
                    <CheckBox click={() => setChecked((s) => !s)} />
                    <button className="login__forgot-but">Remember me</button>
                    <button onClick={forgetPass}>Forget password?</button>
                </div>
            </div>
        </>
    )
}

export default Login
