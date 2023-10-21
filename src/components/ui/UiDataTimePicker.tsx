import * as React from "react"
import dayjs from "dayjs"
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker"
import { styled } from "@mui/material/styles"
import InputAdornment from "@mui/material/InputAdornment"
import { IconPicker } from "../svg/IconFavor"

const StyledMobileDateTimePicker = styled(MobileDateTimePicker)(
    ({ theme }) => ({
        "& input": {
            backgroundColor: "white",
            border: "none",
            outline: "none",
            color: "#15104D",
            padding: "10px"
        },
        "& fieldset": {
            border: "none",
            outline: "none",
            boxShadow: "0px 2px 5px 0px rgba(38, 51, 77, 0.03)",
            color: "#15104D",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "140%",
        },
    })
)

export default function UiDateTimePicker({
    startDate, setStartDate
}:{
    startDate:dayjs.Dayjs, setStartDate:(d:dayjs.Dayjs) => void
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        paddingLeft: "10px",
                        height: "50px",
                    }}
                >
                    <IconPicker />
                    <StyledMobileDateTimePicker
                        defaultValue={startDate}
                        value={startDate}
                        onChange={(d) => setStartDate(d as dayjs.Dayjs)}
                    />
                </div>
            </DemoItem>
        </LocalizationProvider>
    )
}
