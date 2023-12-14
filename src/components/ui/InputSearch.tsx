import React, { ReactElement } from "react"
import { IconInputSearch, IconInputFilter } from "../svg/IconInputSearch"

export const InputSearch = ({
    placeholder,
    onClickFilter,
    value,
    changeValue,
    onFocus = () => {},
    onBlur = () => {},
    onChange=()=>{},
}: {
    placeholder: string | ReactElement
    onClickFilter?: () => void | undefined
    value: string
    changeValue: (s: string) => void

    onFocus?: () => void
    onBlur?: () => void
    onChange?:()=>void
}) => {
    return (
        <div className="ui-input-search">
            <IconInputSearch />
            <div className="ui-input-search-container">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                        changeValue(e.target.value);
                        onChange();
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                {!value && (
                    <span className="ui-input-search-placeholder">
                        {placeholder}
                    </span>
                )}
            </div>

            {onClickFilter ? (
                <button onClick={onClickFilter}>
                    <IconInputFilter />
                </button>
            ) : (
                <></>
            )}
        </div>
    )
}
