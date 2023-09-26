import { useState } from "react"
import { AutocompleteSearch } from "../../ui/AutocompleteSearch"
import { Link } from "react-router-dom"
import { toOneKind } from "../../../utils/titles"
import { IconProfileCircle } from "../../svg/IconProfile"

export type QualityType = "Interests" | "Skills" | "Profession" | "Nationality"

const top100Films = [
    { title: "The Shawshank Redemption", _id: 1994 },
    { title: "The Godfather", _id: 1972 },
    { title: "The Godfather: Part II", _id: 1974 },
    { title: "The Dark Knight", _id: 2008 },
    { title: "12 Angry Men", _id: 1957 },
    { title: "Schindler's List", _id: 1993 },
    { title: "Pulp Fiction", _id: 1994 },
    {
        title: "The Lord of the Rings: The Return of the King",
        _id: 2003,
    },
    { title: "The Good, the Bad and the Ugly", _id: 1966 },
    { title: "Fight Club", _id: 1999 },
]

export const ProfoleIdentity = ({
    quality,
    nextRoute,
    isMultiple = true,
}: {
    quality: QualityType
    nextRoute: QualityType | string
    isMultiple?: boolean
}) => {
    const [value, setValue] = useState<
        { _id: string | number; title: string }[]
    >([])

    return (
        <>
            <div className="profile__identity">
                <AutocompleteSearch
                    options={top100Films}
                    value={value}
                    setValue={setValue}
                    placeholder={`Search ${quality}`}
                    isMultiple={isMultiple}
                />
            </div>
            <div className="profile__identity-list">
                {top100Films.map((item, index) => (
                    <div className="profile__identity-list-item" key={index}>
                        <IconProfileCircle />
                        <div className="profile__identity-list-item-text">
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>
            <button className="profile__method-btlater profile__method-btlater--inherit">
                Setup later
            </button>
            <button className={`profile__method-btlater`}>
                <Link to={`/profile/${toOneKind(nextRoute)}`}>Continue</Link>
            </button>
        </>
    )
}
