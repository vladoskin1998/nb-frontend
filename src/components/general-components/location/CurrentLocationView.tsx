import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { IconLocationAim } from "../../svg/IconsLocation"
import { profileChangeLocation } from "../../../services/profile"
import { useEffect } from "react"

const mapContainerStyle = {
    width: "100%",
    height: "100%",
}

const CurrentLocationView = ({
    validateGeoData,
    navigateToConfirm,
    containerMapRef,
    geoLocation
}: {
    validateGeoData: boolean
    navigateToConfirm: () => void
    geoLocation: () => void
    containerMapRef: React.MutableRefObject<HTMLDivElement | null>
}) => {
    const dispatch = useAppDispatch()
    const {_id} = useAppSelector(s => s.userReducer)
    const {
        city,
        country,
        houseNumber,
        street,
        coordinates,
    } = useAppSelector((s) => s.profileReducer)

    const userLocation = async () => {
    
        if (coordinates && typeof coordinates.lat === 'number' && typeof coordinates.lng === 'number')  {
            dispatch(
                profileChangeLocation({
                    coordinates,
                    city,
                    country,
                    houseNumber,
                    street,
                    _id,
                })
            )
            navigateToConfirm()
        }
    }



    return (
        <>
            <div className="location__current">
                <div className="location__current-map">
                    <button className="location__current-map-button ui-button-back-route" onClick={geoLocation}>
                    <IconLocationAim />
                    </button>
                    <div
                        ref={containerMapRef}
                        style={mapContainerStyle}
                    ></div>
                    <img
                        src="/Images/MapCircle.png"
                        className="location__current-map--target"
                    />
                </div>
            </div>
            <h5 className="location__current-title">
                <IconLocationAim />{" "}
                {`${city || ""} ${country || "Your location"}`}
            </h5>
            <p className="location__current-subtitle">
                {`${street || ""} ${houseNumber || ""}`}
            </p>
            <div className="location__current-button">
                <button
                    className={`location__bt-continue login__button
                    ${
                        !validateGeoData
                            ? "location__bt-continue--disabled"
                            : ""
                    }`}
                    disabled={!validateGeoData}
                    onClick={userLocation}
                >
                    Confirm Location
                </button>
            </div>
        </>
    )
}

export default CurrentLocationView
