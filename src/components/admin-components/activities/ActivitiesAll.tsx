import React from "react"
import { ActivitiesItemModule } from "./ActivitiesItemModule"
import { useAppSelector } from "../../../utils/hooks"
import { AdminSubHeader } from "../../ui/AdminSubHeader"
import { useNavigate } from "react-router-dom"
import { IconBottomChevrons } from "../../svg/IconChevrons"
interface Activities {
    _id: string
    name: string
    numberView: number
    isVisiable: boolean
}

const ActivitiesAll = () => {
    
    const { activities } = useAppSelector((s) => s.activitiesReducer)
    const navigate = useNavigate()
    const changeAdd = () => {
        navigate("/admin/activities/addactivities")
    }

    return (
        <>
            <AdminSubHeader onClickButton={changeAdd}>
                <div className="services__exit">
                    <h5>All Activities</h5>
                </div>
                <button>
                    <IconBottomChevrons/>
                </button>
            </AdminSubHeader>
            <div className="services__all">
                {activities.map((item: Activities) => (
                    <ActivitiesItemModule
                        _id={item._id}
                        name={item.name}
                        numberView={item.numberView}
                        isVisiable={item.isVisiable}
                        key={item._id}
                    />
                ))}
            </div>
        </>
    )
}

export default ActivitiesAll
