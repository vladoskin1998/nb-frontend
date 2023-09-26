import { useState } from "react"
import { EDUCATION } from "../../../types/enum"
import { Link } from "react-router-dom"
import { AutocompleteSearch } from "../../ui/AutocompleteSearch"

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

const list = Object.values(EDUCATION)

export const ProfileEducation = () => {
    const [education, setEducation] = useState<EDUCATION | null>(null)
    const [value, setValue] = useState<
        { _id: string | number; title: string }[]
    >([])
    
    return (
        <>
            <div className="profile__method-body">
                <div
                    className="profile__sex-orintation-list"
                    style={{ flexGrow: 0 }}
                >
                    {list.map((item, index) => (
                        <div
                            key={index}
                            className={`profile__sex-orintation-list-item ${
                                item === education
                                    ? "profile__sex-orintation-list-item--active"
                                    : ""
                            }`}
                            onClick={() => setEducation(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
                <div className="profile__sex-orintation">
                    <h5 className="profile__sex-orintation-title">
                        Where did you study?
                    </h5>
                    <div className="profile__sex-orintation-list">
                        <AutocompleteSearch
                            options={top100Films}
                            value={value}
                            setValue={setValue}
                            placeholder={`Add school or univercity`}
                            isMultiple={false}
                        />
                    </div>
                </div>
            </div>
            <button className="profile__method-btlater profile__method-btlater--inherit">
                Setup later
            </button>
            <button className={`profile__method-btlater`}>
                <Link to={"/profile/family-status"}>Continue</Link>
            </button>
        </>
    )
}
