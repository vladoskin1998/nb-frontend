import { useState } from "react"
import { AutocompleteSearch } from "../../ui/AutocompleteSearch"
import { Link } from "react-router-dom"
import { toOneKind } from "../../../utils/titles"
import { IconProfileCircle } from "../../svg/IconProfile"
import { OptionsItemType, OptionsType } from "../../../types/types"
import { QUALITYENUM } from "../../../types/enum"

export const ProfoleIdentityView = ({
    quality,
    isLimit = -10,
    value,
    setValue,
    handlerContinue,
    optionst,
    inputValue,
    setInputValue,
    popularOptions,
    clickPopularList,
}: {
    quality: QUALITYENUM
    isLimit?: number
    value: OptionsType
    setValue: (s: OptionsType) => void
    handlerContinue: () => void
    optionst: OptionsType
    inputValue: string
    setInputValue: (s: string) => void
    popularOptions: OptionsType
    clickPopularList: (s: OptionsItemType) => void
}) => {
    return (
        <>
            <div className="profile__identity">
                <AutocompleteSearch
                    options={optionst}
                    value={value}
                    setValue={setValue}
                    placeholder={`Search ${quality}`}
                    isLimit={isLimit}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
            </div>
            <div className="profile__identity-list">
                <div className="profile__identity-list-body">
                    {popularOptions.map((item, index) => (
                        <div
                            className="profile__identity-list-item"
                            key={index}
                            onClick={() => clickPopularList(item)}
                        >
                            <IconProfileCircle />
                            <div className="profile__identity-list-item-text">
                                {item.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="profile__method-btlater profile__method-btlater--inherit">
                Setup later
            </button>
            <button
                disabled={!value?.length}
                className={`profile__method-btlater
                   ${!(value?.length && value?.length < 11) && "profile__method-btlater--disabled"}`}
                onClick={handlerContinue}
            >
                {
                    value?.length < 11 ? "Continue" : "Max 10 items"
                }
                
            </button>
        </>
    )
}