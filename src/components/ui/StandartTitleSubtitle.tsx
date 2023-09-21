import React, { ReactElement } from "react"

export const StandartTitleSubtitle = ({
    title,
    subTitle,
}: {
    title: string | ReactElement
    subTitle: string | ReactElement
}) => {
    return (
        <div className="ui-standart__header">
            <h5 className="ui-standart__header-title">{title}</h5>
            <h5 className="ui-standart__header-subtitle">{subTitle}</h5>
        </div>
    )
}
