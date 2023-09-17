import { useState } from "react"
import ServicesItemView from "./ServicesItemView"
import { useLocation } from "react-router-dom"
import { useAppDispatch } from "../../../utils/hooks"
import {
    deleteCategories,
    deleteSubCategories,
    visiableCategories,
    visiableSubCategories,
} from "../../../services/categories"
import ServicesItemViewModal from "./ServicesItemViewModal"

export const ServicesItemModule = ({
    _id,
    name,
    numberView,
    link,
    isVisiable,
    addServices
}: {
    _id: string
    name: string
    numberView: number
    link: string
    isVisiable: boolean
    addServices: () => void
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

    return (
        <>
            <ServicesItemView
                numberView={numberView}
                name={name}
                link={link}
                setIsOpen={(b: boolean) => setIsOpen(b)}
            />
            {
                isOpen &&
                <ServicesItemViewModal
                    isTougle={isTougle}
                    name={name}
                    addItems={addServices}
                    handlerDeleteItem={handlerDeleteItem}
                    onChangeTougle={onChangeTougle}
                    setIsOpen={(b: boolean) => setIsOpen(b)}
                    handlerVisiable={handlerVisiable}
                />
            }
        </>
    )
}
