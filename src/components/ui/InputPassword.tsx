import { useState } from 'react';
import { IconOpenEye, IconClosedEye } from '../svg/IconPassEye';

export const InputPassword = ({ password, setPassword }: { password: string, setPassword: (s: string) => void }) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(s => !s);
    };
    return (
        <div className="ui-password">
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ui-password__input"
            />
            <button onClick={togglePasswordVisibility} className='ui-password__button'>
                {showPassword ? <IconOpenEye /> : <IconClosedEye />}
            </button>
        </div>
    )
}
