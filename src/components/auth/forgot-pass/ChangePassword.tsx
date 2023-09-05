import { useState } from 'react';
import { InputPassword } from '../../ui/InputPassword';

const ChangePassword = () => {

    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")

    return (
        <>
            <h4 className="forget__title">Reset Password</h4>
            <h5 className="forget__subtitle">Create a new secured password for your account</h5>
            <div className="forget__password-input">
                <InputPassword password={password} setPassword={setPassword} />
                <InputPassword password={passwordRepeat} setPassword={setPasswordRepeat} />
            </div>
            <button className="forget__button">
                Action Button
            </button>
        </>
    )
}

export default ChangePassword