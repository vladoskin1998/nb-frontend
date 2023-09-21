import {
    IconLocationAim,
    IconLocationKey,
    IconLocationPoint,
} from "../../svg/IconsLocation"

const GeoLocationView = ({
    geoLocation,
    navigateToCurrentRoute,
}: {
    geoLocation: () => void
    navigateToCurrentRoute: () => void
}) => {
    return (
        <>
            <div className="location__body">
                <h4 className="forget__title">Enter your adress</h4>
                <h5 className="forget__subtitle location__subtitle">
                    <IconLocationKey />
                    <div>
                        <p>Your adress won’t be seen by others. </p>
                        <p> You can change this setting anytime</p>
                    </div>
                </h5>
                <button
                    className="location__but location__but--white"
                    onClick={geoLocation}
                >
                    <IconLocationAim /> Use current location
                </button>
                <div className="location__fields">
                    <div className="location__field">
                        <div className="location__field-icon">
                            <IconLocationPoint />
                        </div>
                        <input
                            type="text"
                            id="autocomplete--google"
                            className="login__email"
                            placeholder="вулиця Академіка Янгеля, 6а, Akademika Yanhelya Street, Вінниця, Вінницька область, Україна"
                        />
                    </div>
                </div>
            </div>
            <button className="location__bt-continue" onClick={navigateToCurrentRoute}>Continue</button>
        </>
    )
}

export default GeoLocationView
