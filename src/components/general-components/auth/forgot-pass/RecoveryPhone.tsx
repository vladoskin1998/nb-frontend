
import { useState, useEffect } from 'react'
import { CodeInput } from '../../../ui/CodeInput';

const RecoveryPhone = () => {

    const [code, setCode] = useState('')
    const [seconds, setSeconds] = useState(20);

    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds((prevSeconds) => prevSeconds - 1);
            } else {
                setSeconds(20);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [seconds]);

    return (
        <div className='forget__phone'>
            <h4 className="forget__title">Verification code</h4>
            <h5 className="forget__subtitle">Please enter the confirmation code from the received message</h5>
            <CodeInput change={setCode} />
            <button className="forget__phone-but">Submit</button>
            <h6 className='forget__phone-resend'>Re-send code in
                <span> 0:{seconds}</span>
            </h6>
        </div>
    )
}

export default RecoveryPhone