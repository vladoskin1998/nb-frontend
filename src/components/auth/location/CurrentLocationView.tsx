import { useAppSelector } from "../../../utils/hooks"
import { IconLocationAim } from "../../svg/IconsLocation"

const mapContainerStyle = {
    width: "100%",
    height: "500px",
}

const CurrentLocationView = ({
    validateGeoData,
    navigateToSuccess
}:{
    validateGeoData: boolean,
    navigateToSuccess: () => void
}) => {



    const { city, country, houseNumber, street } = useAppSelector(
        (s) => s.userReducer
    )

    return (
        <>
            <div className="location__current">
                <div className="location__current-map">
                    <div
                        id="map--google--current"
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
                    className={`location__bt-continue ${ !validateGeoData ? "location__bt-continue--disabled" : ""}`}
                    onClick={navigateToSuccess}
                >
                    Confirm Location
                </button>
            </div>
        </>
    )
}

export default CurrentLocationView
