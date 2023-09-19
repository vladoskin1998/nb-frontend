import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"

const LocationSuccess = () => {
    const { fullName, coordinates, city, country, houseNumber, street, _id } =
        useAppSelector((s) => s.userReducer)

    return (
        <div className="authsuccess auth">
            <div className="authsuccess__body">
                <img
                    src="/Images/ImageSuccess.png"
                    alt="not-image"
                    className="authsuccess__body-img-1"
                />
                <h4 className="authsuccess__body-title">Neighbor Harbor</h4>
                <img
                    src="/Images/GirlsSuccess.png"
                    alt=""
                    className="authsuccess__body-img-2"
                />
                <h4 className="authsuccess__body-title authsuccess__body-subtitle">
                    Welcome,
                    <b>{fullName || "Name"} !</b>
                </h4>
                <button className="authsuccess__body-setup">
                    Let’s setup your account
                </button>
            </div>

            <button className="authsuccess__body-setup">
                <Link to="/admin">Setup later</Link>
            </button>
            <button className="login__button">
                <Link to="/admin">Setup Account</Link>
            </button>
        </div>
    )
}

export default LocationSuccess
