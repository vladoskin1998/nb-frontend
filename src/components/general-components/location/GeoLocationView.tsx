import { useEffect, useState } from "react"
import { useAppSelector } from "../../../utils/hooks"
import { UserCurrentLocation } from "../../admin-components/users/UserCurrentLocation"
import {
    IconLocationAim,
    IconLocationKey,
    IconLocationPoint,
} from "../../svg/IconsLocation"

const GeoLocationView = ({
    geoLocation,
    navigateToCurrentRoute,
    pathname,
    inputRef,
}: {
    geoLocation: () => void
    navigateToCurrentRoute: () => void
    pathname: string
    inputRef: React.MutableRefObject<HTMLDivElement | null>
}) => {
    const [isShowPlaceholder, setIsShowPlaceholder] = useState(true)
    const { coordinates, city, country, houseNumber, street } = useAppSelector(
        (s) => s.profileReducer
    )
    const [cityInput, setCityInput] = useState("")
    const address = city && country && houseNumber && street
    useEffect(() => {
        if (cityInput || address) {
            setIsShowPlaceholder(false)
        } else {
            setIsShowPlaceholder(true)
        }
    }, [cityInput, address])

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
                    className="location__but location__but--inheritbody"
                    onClick={geoLocation}
                >
                    <IconLocationAim /> Use current location
                </button>
                <div className="location__fields">
                    <div className="login__email location__field">
                        <div className="location__field-icon">
                            <IconLocationPoint />
                        </div>
                        <input
                            type="text"
                            id="autocomplete--google"
                            className=" location__field-input"
                            placeholder=""
                            onChange={(e) => setCityInput(e.target.value)}
                        />
                        {isShowPlaceholder && (
                            <span className="profile__birth-input-placeholder">
                                {
                                    <>
                                        Search <b> city</b>, <b> street</b>,{" "}
                                        <b>index</b>
                                    </>
                                }
                            </span>
                        )}
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
