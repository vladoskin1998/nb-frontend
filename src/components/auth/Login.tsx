import { useState } from 'react';
import { InputPassword } from '../ui/InputPassword';
import { useNavigate } from 'react-router-dom';
import { CheckBox } from '../ui/CheckBox';

const Login = () => {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [checked, setChecked] = useState(true)
    const navigate = useNavigate()

    const forgetPass = () => {
        navigate('forget-pass')
    }

    return (
        <>
            <div className='login'>
                <input type="text" className="login__email" placeholder='Email' value={login} onChange={e => setLogin(e.target.value)} />
                <div className='login__password'>
                    <InputPassword password={password} setPassword={setPassword} />
                </div>
                <div className='login__forgot'>
                    <CheckBox click={() => setChecked(s => !s)} />
                    <button className='login__forgot-but'>Remember me</button>
                    <button onClick={forgetPass}>Forget password?</button>
                </div>
            </div>
        </>

    )
}

export default Login