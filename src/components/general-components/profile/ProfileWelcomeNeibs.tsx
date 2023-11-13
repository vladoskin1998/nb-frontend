import { useNavigate } from "react-router-dom"
import { profileTextInfo } from "../../../services/profile"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { setLoader, setValueProfileReducer } from "../../../reducer/profile"
import { roleUrl } from "../../../utils/config"

export const ProfileWelcomeNeibs = () => {
    const { _id,role } = useAppSelector((s) => s.userReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    
    const handlerChangeWellcome = async () => {
        try {
            dispatch(setLoader(true))
            
            const res = await profileTextInfo({
                isGotAllProfileInfo: true,
                _id,
            })

            dispatch(setValueProfileReducer(res))
            dispatch(setLoader(false))
            navigate(
                roleUrl(role)
            )
        } catch (error) {
            dispatch(setLoader(false))
            alert(error + "isGotAllProfileInfo text error")
        }
    }

    return (
        <>
            <div className="profile__method-body">
                <div className="profile__family">
                    <div className="profile__welcome-item">
                        <h6>Be Yourself</h6>
                        <p>
                            Your photo, information, age, education, services
                            must be real
                        </p>
                    </div>
                    <div className="profile__welcome-item">
                        <h6>Respect Others</h6>
                        <p>
                            Be polite and considerate when interacting with
                            fellow users
                        </p>
                    </div>
                    <div className="profile__welcome-item">
                        <h6>Protect Privacy</h6>
                        <p>
                            Don’t share users personal or confidential
                            information without their explicit consent
                        </p>
                    </div>
                    <div className="profile__welcome-item">
                        <h6>No Offensive Content</h6>
                        <p>
                            Avoid posting unlawful, insulting, discriminatory,
                            or violent content
                        </p>
                    </div>
                </div>
            </div>
            <button className={`profile__method-btlater`}
                onClick={handlerChangeWellcome}
            >
                Accept
            </button>
        </>
    )
}
