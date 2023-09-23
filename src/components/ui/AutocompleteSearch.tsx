import * as React from "react"
import Chip from "@mui/material/Chip"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { IconInputSearch } from "../svg/IconInputSearch"
import { IconProfileCircle } from "../svg/IconProfile"
import { ReactElement } from "react"

export interface OptionsItemType {
    _id: string | number
    title: string
}
export type OptionsType = Array<OptionsItemType>

export const AutocompleteSearch = ({
    options,
    value,
    setValue,
    placeholder,
    itemPaperIcon,
    isMultiple = true,
}: {
    options: OptionsType
    value: OptionsType
    setValue: (s: OptionsType) => void
    placeholder?: string
    itemPaperIcon?: string | ReactElement
    isMultiple?: boolean
}) => {
    return (
        <Autocomplete
            className="ui-autocomplete"
            openOnFocus={false}
            popupIcon={null}
            multiple={isMultiple}
            id="fixed-tags-demo"
            disableClearable={false}
            value={isMultiple ? value : value[0] || null}
            onChange={(event, newValue) => {
                isMultiple
                    ? setValue(newValue as OptionsItemType[])
                    : setValue([newValue] as OptionsItemType[])
            }}
            options={options}
            getOptionLabel={(option) => option.title}
            renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                    <Chip
                        sx={{
                            borderRadius: "8px",
                            background: "#F7F8FA",
                        }}
                        label={option.title}
                        {...getTagProps({ index })}
                    />
                ))
            }
            style={{
                width: "100%",
                outline: "none",
                border: "none",
                paddingLeft: "40px",
                position: "relative",
            }}
            renderInput={(params) => (
                <>
                    <div
                        style={{
                            position: "absolute",
                            left: "10px",
                            top: "15px",
                            zIndex: 100,
                        }}
                    >
                        <IconInputSearch />
                    </div>
                    <TextField
                        {...params}
                        placeholder={placeholder || "Search"}
                    />
                </>
            )}
            renderOption={(props, option, state) => (
                <li {...props}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            borderBottom: "1px solid #ccc",
                            padding: "8px 0",
                        }}
                    >
                        {itemPaperIcon || <IconProfileCircle />}
                        {option.title}
                    </div>
                </li>
            )}
            componentsProps={{
                paper: {
                    sx: {
                        marginTop: "14px",
                        borderRadius: "8px",
                        width: "calc(100% + 40px) !important",
                        transform: "translateX(-40px)",
                        outline: "none",
                        border: "none",
                        boxShadow: "none",
                    },
                },
                clearIndicator: {
                    sx: {
                        display: "none",
                    },
                },
            }}
            loading={true}
        />
    )
}
