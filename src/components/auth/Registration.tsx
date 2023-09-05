import { useState } from "react"
import { InputPassword } from "../ui/InputPassword"
import { CheckBox } from "../ui/CheckBox"

const Registration = () => {

    const [login, setLogin] = useState("")
    const [fullName, setFullName] = useState("")
    const [password, setPassword] = useState("")
    const [checked, setChecked] = useState(true)
    return (
        <>
            <div className="registration">
                <input type="text" className="login__email" placeholder='Email' value={login} onChange={e => setLogin(e.target.value)} />
                <input type="text" className="login__email" placeholder='Full Name' value={fullName} onChange={e => setFullName(e.target.value)} />
                <InputPassword password={password} setPassword={setPassword} />
                <div className="registration__policy">
                    <CheckBox click={() => setChecked(s => !s)} />
                    <div>
                        <p>
                            By Signing up, you agree to the
                        </p>
                        <p>
                            <b> Terms of Service</b> and <b>Privacy Policy</b>
                        </p>
                    </div>
                </div>
            </div>
     
        </>
    )
}

export default Registration