import React from "react"
import { IconArrachFile } from "../../svg/IconArrachFile"

export const PublishAttachButton = ({
    onClick
}:{
    onClick?: () => void
}) => {
    return (
        <label className="ui-file-button" onClick={onClick}>
            <IconArrachFile />
        </label>
    )
}
