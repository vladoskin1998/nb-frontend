import { useNavigate } from "react-router-dom"
import { ButtonBackRoute } from "../../ui/ButtonBackRoute"
import { useAppDispatch } from "../../../utils/hooks"
import { logout } from "../../../services/auth"

export const AuthRegistrationConfirm = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handlerBackLogin = () => {
        dispatch(logout())
    }

    return (
        <div className="forget">
            <div className="forget__back">
                <ButtonBackRoute click={handlerBackLogin} />
            </div>
            <h4 className="forget__title">Confirm Your Email</h4>
            <h5 className="forget__subtitle">
                Please check your email for the next step to sign up
            </h5>
            <div className="forget__body-img">
                <img src="/Images/Megapone.png" alt="" />
            </div>
            <div className="forget__buttons">
                <button
                    className="forget__email-but1 forget__email-but1--white"
                    onClick={handlerBackLogin}
                >
                    Back to Login In
                </button>
                <button
                    className="forget__email-but2"
                    onClick={() => navigate("/auth/confirm-code")}
                >
                    Confirm Your Email
                </button>
            </div>
        </div>
    )
}
