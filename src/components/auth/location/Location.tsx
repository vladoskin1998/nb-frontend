
import { Route, Routes, useNavigate } from "react-router-dom";
import { ButtonBackRoute } from "../../ui/ButtonBackRoute";
import { IconLocationKey, IconLocationAim, IconLocationPoint } from "../../svg/IconsLocation";
import { InputDiffPlaceholder } from "../../ui/InputDiffPlaceholder";


const LocationUser = () => {
    const navigate = useNavigate()

    const back = () => {
        navigate(-1)
    }

    return (
        <div className="forget">
            <div className="forget__back">
                <ButtonBackRoute click={back} />
            </div>
            <Routes >
                {/* <Route path='success-registration' element={<ChangePassword />} />
                <Route path='current-location' element={<RecoveryEmail />} /> */}
                <Route path='*' element={<LocationBody />} />
            </Routes>

        </div >
    )
}

export default LocationUser

const LocationBody = () => {
    return <>
        <h4 className="forget__title">Enter your adress</h4>
        <h5 className="forget__subtitle location__subtitle">
            <IconLocationKey />
            <div>
                <p>Your adress won’t be seen by others. </p>
                <p> You can change this setting anytime</p>
            </div>
        </h5>
        <button className="location__but location__but--white">
            <IconLocationAim /> Use current location
        </button>
        <div className="location__fields">
            <div className="location__field">
                <div className="location__field-icon">
                    <IconLocationPoint />
                </div>
                <input type="text" className="login__email" placeholder="Search city, street, index"/>
            </div>
            <input type="text" className="login__email" placeholder="Apt"/>
        </div>
        <p className="location__par">
            You will see all the news and updates within a radius of 5 km
            You can personalize your feed later in your profile settings.
        </p>
    </>
}