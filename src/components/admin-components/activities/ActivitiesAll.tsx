import React from "react"
import { ActivitiesItemModule } from "./ActivitiesItemModule"
import { useAppSelector } from "../../../utils/hooks"
interface Activities {
    _id: string
    name: string
    numberView: number
    isVisiable: boolean
}

const ActivitiesAll = () => {

    const { activities } = useAppSelector(s => s.activitiesReducer)

    return (
        <div className="services__all">
            {
                activities.map((item: Activities) =>
                    <ActivitiesItemModule
                        _id={item?._id}
                        name={item.name}
                        numberView={item.numberView}
                        isVisiable={item.isVisiable}
                    />
                )
            }
        </div>
    )
}

export default ActivitiesAll
