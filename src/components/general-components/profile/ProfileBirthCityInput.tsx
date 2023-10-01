import React, { useEffect, useRef } from "react"
import { IconLocationPoint } from "../../svg/IconsLocation"

export const ProfileCityBirthInput = ({
    city,
    setCity,
}: {
    city: string | null
    setCity: (s: string | null) => void
}) => {
    const containerInputRef = useRef<HTMLInputElement | null>(null)
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
                defaultValue={city || ""}
            />
        </div>
    )
}
