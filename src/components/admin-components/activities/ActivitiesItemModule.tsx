import { useState } from "react"
import ServicesItemView from "../services/ServicesItemView"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../utils/hooks"
import { ServicesListItemViewModal } from "../services/ServicesListItemViewModal"
import {
    deleteActivities,
    visiableActivities,
} from "../../../services/activities"

export const ActivitiesItemModule = ({
    _id,
    name,
    numberView,
    isVisiable,
}: {
    _id: string
    name: string
    numberView: number
    isVisiable: boolean
}) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [isTougle, setIsTougle] = useState(isVisiable)

    const onChangeTougle = () => {
        setIsTougle((s) => !s)
    }

    const handlerVisiable = () => {
        dispatch(visiableActivities({ id: _id, isVisiable: isTougle }))
    }

    const handlerDeleteItem = () => {
        dispatch(deleteActivities({ id: _id }))
        setIsOpen(false)
    }

    const addActivities = () => {
        navigate("/admin/activities/addactivities") 
    }

    return (
        <>
            <ServicesItemView
                numberView={numberView}
                name={name}
                nextListLink={`/admin/activities/eventactivities?activitiesId=${_id}`}
                setIsOpen={(b: boolean) => setIsOpen(b)}
            />
            {/* {
                isOpen &&
                <ServicesListItemViewModal
                    isTougle={isTougle}
                    name={name}
                    handlerAddServices={addActivities}
                    handlerDeleteItem={handlerDeleteItem}
                    onChangeTougle={onChangeTougle}
                    setIsOpen={(b: boolean) => setIsOpen(b)}
                    handlerVisiable={handlerVisiable}
                />
            } */}
        </>
    )
}
