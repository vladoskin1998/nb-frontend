import React from "react"
import { IconInputSearch, IconInputFilter } from "../svg/IconInputSearch"

export const InputSearch = ({
    placeholder,
    onClickFilter,
    value,
    changeValue,
}: {
    placeholder: string
    onClickFilter?: () => void | undefined
    value: string
    changeValue: (s: string) => void
}) => {
    return (
        <div className="ui-input-search">
            <IconInputSearch />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => changeValue(e.target.value)}
            />
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
