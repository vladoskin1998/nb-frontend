import { useNavigate } from "react-router-dom"

const RecoveryEmail = () => {

    const navigate = useNavigate()

    return (
        <>
            <h4 className="forget__title">Forgot Password</h4>
            <h5 className="forget__subtitle">Select which contact details should we use to reset your password</h5>
            <div className="forget__body-img">
                <img src="/Images/Megapone.png" alt=""/>
            </div>
            <button className="forget__email-but1 forget__email-but1--white">
                Contact Support
            </button>
            <button className="forget__email-but2" onClick={() => navigate('/auth')}>
                Back to Login In
            </button>
        </>
    )
}

export default RecoveryEmail

