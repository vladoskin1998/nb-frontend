import { useEffect, useRef, useState } from "react"
import { DateInput } from "../../ui/CodeInput"
import { IconLocationPoint } from "../../svg/IconsLocation"
import { useNavigate } from "react-router-dom"
import { profileTextInfo } from "../../../services/profile"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { setLoader, setValueProfileReducer } from "../../../reducer/profile"
import moment from "moment"
import { ProfileButtonSetupLater } from "./ProfileButtonSetupLater"
import { ProfileCityBirthInput } from "./ProfileBirthCityInput"

export const ProfileBirth = () => {
    const { _id } = useAppSelector((s) => s.userReducer)
    const { dateBirth, cityBirth } = useAppSelector((s) => s.profileReducer)
    const dispatch = useAppDispatch()
    const [value, setValue] = useState(
        dateBirth ? moment(dateBirth).format("DDMMYYYY") : ""
    )
    const containerInputRef = useRef<HTMLInputElement | null>(null)
    const [city, setCity] = useState(cityBirth)
    const navigate = useNavigate()

    const handlerChangeBirth = async () => {
        try {
            if (value.length === 8 && city) {
                dispatch(setLoader(true))
                const res = await profileTextInfo({
                    dateBirth: moment(value, "DDMMYYYY").toDate(),
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

    console.log(value, city)

    return (
        <>
            <div className="profile__method-body">
                <DateInput change={setValue} value={value} />
                <h6 className="profile__birth-title"></h6>
                <div className="location__fields">
                    <ProfileCityBirthInput city={city} setCity={setCity} />
                </div>
            </div>
            <ProfileButtonSetupLater />
            <button
                disabled={!(value.length === 8 && city)}
                className={`profile__method-btlater
            ${
                !(value.length === 8 && city) &&
                "profile__method-btlater--disabled"
            }`}
                onClick={handlerChangeBirth}
            >
                Continue
            </button>
        </>
    )
}
