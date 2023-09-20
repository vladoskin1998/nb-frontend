import { useState } from 'react';
import { IconOpenEye, IconClosedEye } from '../svg/IconPassEye';

export const InputPassword = ({ 
    password, 
    setPassword,
    errorMessage,
    pattern,
    isValidated,
    setIsValidated
}: { 
    password: string, 
    setPassword: (s: string) => void,
    errorMessage: string;
    pattern: string | RegExp;
    isValidated: boolean, 
    setIsValidated: (s:boolean) => void
}) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(s => !s);
    };

    const [isValid, setIsValid] = useState(true);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setIsValidated(new RegExp(pattern).test(newValue))
    setPassword(newValue);
  };

  const handleBlur = () => {
    setIsValid(new RegExp(pattern).test(password)); 
  };

    return (
        <div className="ui-password">
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={handleChange}
                className="ui-password__input"
                onBlur={handleBlur} 
            />
            <button onClick={togglePasswordVisibility} className='ui-password__button'>
                {showPassword ? <IconOpenEye /> : <IconClosedEye />}
            </button>
            {!isValid && <span className='ui-input__main--invalid'>{errorMessage}</span>}
        </div>
    )
}



