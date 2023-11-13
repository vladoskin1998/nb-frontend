import React, { useEffect, useRef, useState } from "react"
import { IconLocationPoint } from "../../svg/IconsLocation"
import { IconRightChevrons } from "../../svg/IconChevrons"

export const ProfileCityBirthInput = ({
    city,
    setCity,
}: {
    city: string | null
    setCity: (s: string | null) => void
}) => {
    const containerInputRef = useRef<HTMLInputElement | null>(null)
    const [isShowPlaceholder, setIsShowPlaceholder] = useState(true)

    useEffect(() => {
        const input = containerInputRef.current as HTMLInputElement

        const options = {
            types: ["(cities)"],
            // componentRestrictions: { country: "UA" },
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

    useEffect(() => {
        if(city ){
            setIsShowPlaceholder(false)
        }
        else {
            setIsShowPlaceholder(true)
        }
    }, [city])

    return (
        <div className="profile__birth-input">
            <input
                ref={containerInputRef}
                type="text"
                className="login__email"
                placeholder=""
                defaultValue={city || ""}
                onChange={e => setCity(e.target.value)}
            />
            {isShowPlaceholder && (
                <span className="profile__birth-input-placeholder">
                    {
                        <>
                            Search <b> City</b>
                        </>
                    }
                </span>
            )}
            <div  className="profile__birth-input-chevron">
                 < IconRightChevrons/>
            </div>
        </div>
    )
}
