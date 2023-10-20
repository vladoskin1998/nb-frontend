import { useAppSelector } from "../../../utils/hooks"
import { UserCurrentLocation } from "../../admin-components/users/UserCurrentLocation"
import {
    IconLocationAim,
    IconLocationKey,
    IconLocationPoint,
} from "../../svg/IconsLocation"

const mapContainerStyle = {
    width: "100%",
    height: "100%",
}

const GeoLocationView = ({
    geoLocation,
    navigateToCurrentRoute,
    pathname,
    inputRef
    
}: {
    geoLocation: () => void
    navigateToCurrentRoute: () => void
    pathname: string
    inputRef: React.MutableRefObject<HTMLDivElement | null>
}) => {
    const { coordinates, city, country, houseNumber, street } = useAppSelector(
        (s) => s.profileReducer
    )


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
                {pathname !== "/location" && (
                    <div className="location__viewmap">
                        <UserCurrentLocation
                            mapStyle={{
                                width: "100%",
                                height: "100%",
                            }}
                            isDownloadMap={true}
                            startLat={coordinates.lat}
                            startLng={coordinates.lng}
                        />
                        <img
                            src="/Images/MapCircle.png"
                            className="location__viewmap-img"
                        />
                    </div>
                )}

                <p className="location__mess">
                    You will see all the news and updates within a radius of 5
                    km You can personalize your feed later in your profile
                    settings.
                </p>
            </div>
            <button
                className="location__bt-continue login__button"
                onClick={navigateToCurrentRoute}
            >
                Continue
            </button>
        </>
    )
}

export default GeoLocationView
