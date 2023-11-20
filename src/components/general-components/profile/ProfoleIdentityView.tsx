import { AutocompleteSearch } from "../../ui/AutocompleteSearch"
import { IconProfileCircle } from "../../svg/IconProfile"
import { OptionsItemType, OptionsType } from "../../../types/types"
import { QUALITYENUM } from "../../../types/enum"
import { ProfileButtonSetupLater } from "./ProfileButtonSetupLater"

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
                    placeholder={<>Search <b>{quality}</b></>}
                    isLimit={isLimit}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
            </div>
            <div className="profile__identity-list">
                <div className="profile__identity-list-body">
                    {popularOptions.map((item, index) => (
                        <div
                            className={`profile__identity-list-item 
                              ${
                                    value.find(
                                      (it) => it.title === item.title
                                  ) 
                                      ? "profile__identity-list-item-active"
                                      : ""
                              }  
                            `}
                            key={index}
                            onClick={() => clickPopularList(item)}
                        >
                            <div className="profile__identity-list-item-text">
                                {item.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ProfileButtonSetupLater />
            <button
                disabled={!value?.length}
                className={`profile__method-btlater
                   ${
                       !(value?.length && value?.length < 11) &&
                       "profile__method-btlater--disabled"
                   }`}
                onClick={handlerContinue}
            >
                {value?.length < 11 ? "Continue" : "Max 10 items"}
            </button>
        </>
    )
}
