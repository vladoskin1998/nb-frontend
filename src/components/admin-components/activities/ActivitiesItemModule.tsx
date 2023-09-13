import { useState } from "react"
import ServicesItem from "../services/ServicesItem"
import { useLocation } from "react-router-dom"
import { useAppDispatch } from "../../../utils/hooks"
import {
    deleteCategories,
    deleteSubCategories,
    visiableCategories,
    visiableSubCategories,
} from "../../../services/categories"
import ServicesItemModal from "../services/ServicesItemModal"

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
    const location = useLocation()
    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [isTougle, setIsTougle] = useState(isVisiable)

    const onChangeTougle = () => {
        setIsTougle((s) => !s)
    }

    const handlerVisiable = () => {
        dispatch(
            location.pathname.includes("servicessub")
                ? visiableSubCategories({ id: _id, isVisiable: isTougle })
                : visiableCategories({ id: _id, isVisiable: isTougle })
        )
    }

    const handlerDeleteItem = () => {
        dispatch(
            location.pathname.includes("servicessub")
                ? deleteSubCategories({ id: _id })
                : deleteCategories({ id: _id })
        )
        setIsOpen(false)
    }

    const addServices = () => {

    }
    return (
        <>
            <ServicesItem
                numberView={numberView}
                name={name}
                link={`/admin/services/eventactivities?id=${_id}`}
                setIsOpen={(b: boolean) => setIsOpen(b)}
            />
            {/* {
                isOpen &&
                <ServicesItemModal
                    isTougle={isTougle}
                    name={name}
                    addServices={addServices}
                    handlerDeleteItem={handlerDeleteItem}
                    onChangeTougle={onChangeTougle}
                    setIsOpen={(b: boolean) => setIsOpen(b)}
                    handlerVisiable={handlerVisiable}
                />
            } */}
        </>
    )
}
