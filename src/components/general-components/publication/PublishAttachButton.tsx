import React from "react"
import { IconArrachFile } from "../../svg/IconArrachFile"

export const PublishAttachButton = ({
    onClick,
    counterFile=0
}:{
    onClick?: () => void
    counterFile?:number
}) => {
    return (
        <label className="ui-file-button" onClick={onClick}>
            <IconArrachFile />
            {
                Boolean(counterFile) && <div className="ui-file-button-counter">Add up to {counterFile} photos</div>
            }
            
        </label>
    )
}
