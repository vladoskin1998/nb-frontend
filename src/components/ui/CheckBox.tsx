import { Checkbox } from "@mui/material";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const CheckBox = ({ click }: { click: () => void }) => {
    return (
        <Checkbox
            {...label}
            defaultChecked
            sx={{
                '&.Mui-checked': {
                    color: "#15104D",
                }, padding: 0
            }}
        />
    )
}
