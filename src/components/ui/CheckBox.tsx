import { Checkbox } from "@mui/material";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const CheckBox = ({ 
    click, 
    defaultChecked=false
}: { 
        click: () => void, 
        defaultChecked?: boolean 
    }) => {
    return (
        <Checkbox
            {...label}
            defaultChecked={defaultChecked}
            onClick={click}
            sx={{
                '&.Mui-checked': {
                    color: "#15104D",
                }, padding: 0
            }}
        />
    )
}
