import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { Link, useNavigate } from "react-router-dom"
import Slider from "@mui/material/Slider"
import { useDispatch } from "react-redux"
import { profileTextInfo } from "../../../services/profile"
import { setValueProfileReducer } from "../../../reducer/profile"

const mapContainerStyle = {
    width: "100%",
    height: "500px",
}

export const ProfileSetupInterestZone = () => {

    const initStep = useAppSelector(s => s.profileReducer.step)
    const mapRef = useRef<google.maps.Map | null>(null)
    const containerMap = useRef<HTMLDivElement | null>(null)

    const { coordinates } = useAppSelector((s) => s.profileReducer)
    const [step, setStep] = useState<number>(initStep)

    const dispatch = useAppDispatch()
    const { _id } = useAppSelector((s) => s.profileReducer)

    const navigate = useNavigate()
    useEffect(() => {
        if (window.google && containerMap.current) {
            const mapOptions: google.maps.MapOptions = {
                zoom: 13.0,
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                zoomControl: false,
                scrollwheel: false,
                gestureHandling: "none",
                center: new google.maps.LatLng(
                    coordinates.lat,
                    coordinates.lng
                ),
            }
            mapRef.current = new google.maps.Map(
                containerMap.current as HTMLElement,
                mapOptions
            )
        }
    }, [])

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setStep(newValue as number)
    }

    const handlerChangeStep = async () => {
        const res = await profileTextInfo({
            step,
            _id,
        })
        dispatch(setValueProfileReducer(res))
        navigate("/profile/about")
    }
    return (
        <>
            <div className="profile__method-body">
                <div className="profile__zone-map">
                    <div
                        style={mapContainerStyle}
                        ref={containerMap}
                        className="profile__zone-map-google"
                    />
                    <img
                        style={{
                            width: `${12.5 * step}px`,
                            height: `${12.5 * step}px`,
                        }}
                        src="/Images/MapCircle.png"
                        className="profile__zone-circle"
                    />
                </div>
            </div>
            <p className="profile__zone-parag">Set local radius</p>
            <p className="profile__zone-subparag">
                Show data only within the specified radius
            </p>
            <div className="profile__zone-slider">
                <Slider
                    max={20}
                    min={1}
                    step={1}
                    defaultValue={initStep}
                    aria-label="Default"
                    onChange={handleSliderChange}
                    valueLabelDisplay="off"
                />
                <div className="profile__zone-slider-tooltip">{step} km</div>
            </div>
            <button
                className={`profile__method-btlater`}
                onClick={handlerChangeStep}
            >
                Apply
            </button>
        </>
    )
}
