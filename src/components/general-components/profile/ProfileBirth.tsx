import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { profileTextInfo } from "../../../services/profile"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { setLoader, setValueProfileReducer } from "../../../reducer/profile"
import { ProfileButtonSetupLater } from "./ProfileButtonSetupLater"
import { ProfileCityBirthInput } from "./ProfileBirthCityInput"
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"

export const ProfileBirth = () => {
    const { _id } = useAppSelector((s) => s.userReducer)
    const { dateBirth, cityBirth } = useAppSelector((s) => s.profileReducer)
    const dispatch = useAppDispatch()

    const [pickerValue, setPickerValue] = useState<Dayjs | null>(
        dayjs(dateBirth)
    )

    const containerInputRef = useRef<HTMLInputElement | null>(null)
    const [city, setCity] = useState(cityBirth)
    const navigate = useNavigate()

    console.log("pickerValue------>")

    const handlerChangeBirth = async () => {
        try {
            if (pickerValue && city) {
                dispatch(setLoader(true))

                const res = await profileTextInfo({
                    dateBirth: new Date(pickerValue?.toDate() || ""),
                    cityBirth: city,
                    _id,
                })
                dispatch(setValueProfileReducer(res))
                dispatch(setLoader(false))
                navigate("/profile/nationality")
                return
            }
            alert("укажите город и дату")
        } catch (error) {
            dispatch(setLoader(false))
            alert(error + "date or city")
        }
    }

    useEffect(() => {
        const input = containerInputRef.current as HTMLInputElement

        const options = {
            types: ["(cities)"],
            componentRestrictions: { country: "UA" },
        }

        const autocomplete = new google.maps.places.Autocomplete(input, options)

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace()
            if (place.address_components) {
                const cityComponent = place.address_components.find(
                    (component) =>
                        component.types.includes("locality") ||
                        component.types.includes("administrative_area_level_2")
                )

                if (cityComponent && cityComponent.long_name) {
                    const selectedCity = cityComponent.long_name
                    setCity(selectedCity)
                }
            }
        })
    }, [])


    return (
        <>
            <div className="profile__method-body">
                <div className="profileinfo__edit-body-items">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            className="profileinfo__edit-picker"
                            value={pickerValue}
                            onChange={(newValue) => setPickerValue(newValue)}
                        />
                    </LocalizationProvider>
                </div>
                <h6 className="profile__birth-title" style={{paddingTop:'45px'}}>Place of birth</h6>
                <div className="location__fields">
                    <ProfileCityBirthInput city={city} setCity={setCity} />
                </div>
            </div>
            <ProfileButtonSetupLater />
            <button
                disabled={!(pickerValue && city)}
                className={`profile__method-btlater
            ${
                !(pickerValue && city) &&
                "profile__method-btlater--disabled"
            }`}
                onClick={handlerChangeBirth}
            >
                Continue
            </button>
        </>
    )
}
