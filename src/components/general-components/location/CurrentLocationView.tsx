import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { IconLocationAim } from "../../svg/IconsLocation"
import { profileChangeLocation } from "../../../services/profile"
import { useEffect } from "react"

const mapContainerStyle = {
    width: "100%",
    height: "500px",
}

const CurrentLocationView = ({
    validateGeoData,
    navigateToSuccess,
    containerMapRef
}: {
    validateGeoData: boolean
    navigateToSuccess: () => void
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
        isLocationVerify,
    } = useAppSelector((s) => s.profileReducer)

    console.log(coordinates)

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
        }
    }

    useEffect(() => {
        if (isLocationVerify) {
            navigateToSuccess()
        }
    }, [isLocationVerify])

    return (
        <>
            <div className="location__current">
                <div className="location__current-map">
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
                    className={`location__bt-continue ${
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
