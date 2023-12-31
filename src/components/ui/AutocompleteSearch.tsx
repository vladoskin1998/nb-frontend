import * as React from "react"
import Chip from "@mui/material/Chip"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { IconInputSearch } from "../svg/IconInputSearch"
import { IconProfileCircle } from "../svg/IconProfile"
import { ReactElement, useEffect, useState } from "react"
import { OptionsItemType, OptionsType } from "../../types/types"
import { ThemeProvider, createTheme } from "@mui/material/styles"
export const AutocompleteSearch = ({
    options,
    value,
    setValue,
    placeholder,
    itemPaperIcon,
    isLimit = -10,
    inputValue = "",
    setInputValue = () => {},
}: {
    options: OptionsType
    value: OptionsType
    setValue: (s: OptionsType) => void
    placeholder?: string | ReactElement
    itemPaperIcon?: string | ReactElement
    isLimit?: number
    inputValue?: string
    setInputValue?: (s: string) => void
}) => {
    console.log("value--->", value)

    const theme = createTheme({
        components: {
            MuiAutocomplete: {
                styleOverrides: {
                    paper: {
                        zIndex: 9999,
                        background: "white",
                    },
                },
            },
        },
    })

    const [isShowPlaceholder, setIsShowPlaceholder] = useState(true)

    useEffect(() => {
        if (inputValue || value.length) {
            setIsShowPlaceholder(false)
        } else {
            setIsShowPlaceholder(true)
        }
    }, [inputValue, value])

    return (
        <ThemeProvider theme={theme}>
            <Autocomplete
                inputValue={inputValue}
                onInputChange={(e, v) => setInputValue(v)}
                className="ui-autocomplete"
                openOnFocus={false}
                popupIcon={null}
                multiple={true}
                isOptionEqualToValue={(option, value) =>
                    option.title === value.title
                }
                id="fixed-tags-demo"
                limitTags={100}
                disableClearable={false}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue.slice(isLimit))
                    event.preventDefault()
                }}
                options={options}
                getOptionLabel={(option) => option?.title}
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
                style={styleComponent.style}
                renderInput={(params) => (
                    <>
                        <div style={styleComponent.renderInput}>
                            <IconInputSearch />
                        </div>
                        <TextField
                            {...params}
                            placeholder={""}
                            style={{ zIndex: 998, position: "relative" }}
                        />
                        {isShowPlaceholder && (
                            <span className="profile__birth-input-placeholder" style={styleComponent.placeholder}>
                                {
                                    placeholder
                                }
                            </span>
                        )}
                    </>
                )}
                renderOption={(props, option, state) => (
                    <li {...props}>
                        <div style={styleComponent.renderOption}>
                            {itemPaperIcon || <IconProfileCircle />}
                            {option.title}
                        </div>
                    </li>
                )}
                componentsProps={{
                    paper: {
                        sx: styleComponent.paper,
                        style: {
                            zIndex: 9999,
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
        </ThemeProvider>
    )
}

const styleComponent = {
    placeholder:{
        left: '55px',
    },
    paper: {
        marginTop: "14px",
        marginBottom: "8px",
        borderRadius: "8px",
        width: "calc(100% + 40px) !important",
        transform: "translateX(-40px)",
        outline: "none",
        border: "none",
        boxShadow: "none",
        background: "white",
        zIndex: 9999,
        fontWeight: 600,
    },
    renderOption: {
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #C3CAD9",
        padding: "8px 0 8px 0",
        fontSize: "14px",
        gap: "12px",
        width: "100%",
        zIndex: 998,
    },
    renderInput: {
        position: "absolute" as "absolute",
        left: "10px",
        top: "15px",
        zIndex: 998,
    },
    style: {
        maxHeight: "120px",
        width: "100%",
        outline: "none",
        border: "none",
        paddingLeft: "40px",
        position: "relative" as "relative",
        overflow: "scroll",
        zIndex: "998 !important",
    },
}
