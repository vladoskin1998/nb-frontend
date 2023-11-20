import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { roleUrl } from "../../../utils/config"

const LocationSuccess = () => {
    const { fullName, role } = useAppSelector((s) => s.userReducer)

    return (
        <>
            <div className="authsuccess auth">
                <div className="authsuccess__body">
                    <div className="authsuccess__body-logo">
                        <img
                            src="/Images/logo.png"
                            alt="not-image"
                            className="location__success-img-1"
                        />
                    </div>
                    <div className="authsuccess__body--img">
                        <div className="authsuccess__body--bg">
                            <img
                                src="/Images/welcomebg.png"
                                alt=""
                                className="authsuccess__body--bg--bgimg"
                            />
                        </div>
                        <img
                            src="/Images/GirlsSuccess.png"
                            alt=""
                            className="authsuccess__body--img--girl"
                        />
                    </div>

                    <h4 className="authsuccess__body-title authsuccess__body-subtitle">
                        Welcome,
                        <b>{fullName || "Name"} !</b>
                    </h4>
                    <button className="authsuccess__body-setup">
                        Let’s setup your account
                    </button>
                </div>
            </div>
            <div className="authsuccess__body-buttons">
                <Link to={roleUrl(role)}>
                    <button className="authsuccess__body-buttons-button authsuccess__body-buttons-button--inherit">
                        Setup later
                    </button>
                </Link>
                <Link to={"/profile"}>
                    <button className="authsuccess__body-buttons-button">
                        Setup Account
                    </button>
                </Link>
            </div>
        </>
    )
}

export default LocationSuccess
