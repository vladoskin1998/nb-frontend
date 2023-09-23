import { useEffect, useRef, useState } from "react"
import { DateInput } from "../../ui/CodeInput"
import { IconLocationPoint } from "../../svg/IconsLocation"
import { Link } from "react-router-dom"

export const ProfileBirth = () => {
    const [value, setValue] = useState("")
    const containerInputRef = useRef<HTMLInputElement | null>(null)
    const [city, setCity] = useState("")
    
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
                <DateInput change={setValue} />
                <h6 className="profile__birth-title"></h6>
                <div className="location__fields">
                    <div className="location__field">
                        <div className="location__field-icon">
                            <IconLocationPoint />
                        </div>
                        <input
                            ref={containerInputRef}
                            type="text"
                            id="autocomplete--google"
                            className="login__email"
                            placeholder="Вінниця"
                        />
                    </div>
                </div>
            </div>
            <button className="profile__method-btlater profile__method-btlater--inherit">
                {/* <Link to={"/admin"}> */}
                    Setup later
                {/* </Link> */}
            </button>
            <button className={`profile__method-btlater`}>
                <Link to={"/profile/nationality"}>Continue</Link>
            </button>
        </>
    )
}
